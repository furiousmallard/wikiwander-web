import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

interface WikipediaArticle {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls: {
    desktop: {
      page: string;
    };
  };
}

// Get today's date in America/New_York timezone
function getTodayET(): { dateStr: string; year: string; month: string; day: string } {
  const now = new Date();
  const etDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/New_York' })
  );
  const year = String(etDate.getFullYear());
  const month = String(etDate.getMonth() + 1).padStart(2, '0');
  const day = String(etDate.getDate()).padStart(2, '0');
  return {
    dateStr: `${year}-${month}-${day}`,
    year,
    month,
    day,
  };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Verify cron secret
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    res.status(500).json({ error: 'CRON_SECRET not configured' });
    return;
  }

  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${cronSecret}`) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    res.status(500).json({ error: 'DATABASE_URL not configured' });
    return;
  }

  try {
    const sql = neon(databaseUrl);
    const { dateStr, year, month, day } = getTodayET();

    // Check if we already have today's article (idempotent)
    const existing = await sql`
      SELECT id FROM daily_wanders WHERE date = ${dateStr}::date LIMIT 1
    `;

    if (existing.length > 0) {
      res.status(200).json({
        message: 'Daily wander already exists for today',
        date: dateStr,
        skipped: true,
      });
      return;
    }

    // Fetch from Wikipedia
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/featured/${year}/${month}/${day}`,
      {
        headers: {
          'User-Agent': 'WikiWanderer/1.0 (https://wikiwanderer.app; hello@mallardfoundries.com)',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Wikipedia API returned ${response.status}`);
    }

    const data = await response.json();
    const tfa: WikipediaArticle = data.tfa;

    if (!tfa) {
      res.status(404).json({
        error: 'No featured article available for today',
        date: dateStr,
      });
      return;
    }

    // Insert into database
    const result = await sql`
      INSERT INTO daily_wanders (date, title, summary, url, thumbnail)
      VALUES (
        ${dateStr}::date,
        ${tfa.title},
        ${tfa.extract},
        ${tfa.content_urls.desktop.page},
        ${tfa.thumbnail?.source || null}
      )
      RETURNING id
    `;

    res.status(200).json({
      message: 'Daily wander fetched and stored successfully',
      date: dateStr,
      id: result[0].id,
      title: tfa.title,
    });
  } catch (error) {
    console.error('Error in fetch-daily-wander cron:', error);
    res.status(500).json({
      error: 'Failed to fetch daily wander',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

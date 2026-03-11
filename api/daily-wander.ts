import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

interface DailyWander {
  id: string;
  date: string;
  title: string;
  summary: string;
  url: string;
  thumbnail: string | null;
  created_at: string;
}

interface DailyWanderResponse {
  title: string;
  summary: string;
  thumbnail?: string;
  url: string;
  date: string;
}

// Get today's date in America/New_York timezone
function getTodayET(): string {
  const now = new Date();
  const etDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/New_York' })
  );
  const year = etDate.getFullYear();
  const month = String(etDate.getMonth() + 1).padStart(2, '0');
  const day = String(etDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    res.status(500).json({ error: 'Database not configured' });
    return;
  }

  try {
    const sql = neon(databaseUrl);
    const today = getTodayET();

    const rows = await sql<DailyWander[]>`
      SELECT id, date, title, summary, url, thumbnail, created_at
      FROM daily_wanders
      WHERE date = ${today}::date
      LIMIT 1
    `;

    if (rows.length === 0) {
      res.status(404).json({ error: 'No daily wander for today yet' });
      return;
    }

    const row = rows[0];
    const result: DailyWanderResponse = {
      title: row.title,
      summary: row.summary,
      url: row.url,
      date: row.date,
      ...(row.thumbnail && { thumbnail: row.thumbnail }),
    };

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching daily wander:', error);
    res.status(500).json({ error: 'Failed to fetch daily article' });
  }
}

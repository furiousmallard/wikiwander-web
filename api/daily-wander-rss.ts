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

// Escape XML special characters
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Format date for RSS (RFC 822)
function formatRssDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00Z');
  return date.toUTCString();
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

    const rows = await sql<DailyWander[]>`
      SELECT id, date, title, summary, url, thumbnail, created_at
      FROM daily_wanders
      ORDER BY date DESC
      LIMIT 20
    `;

    const items = rows
      .map((row) => {
        const mediaContent = row.thumbnail
          ? `<media:content url="${escapeXml(row.thumbnail)}" medium="image" />`
          : '';

        return `
    <item>
      <title>${escapeXml(row.title)}</title>
      <link>${escapeXml(row.url)}</link>
      <description><![CDATA[${row.summary}]]></description>
      <guid isPermaLink="false">${row.id}</guid>
      <pubDate>${formatRssDate(row.date)}</pubDate>
      ${mediaContent}
    </item>`;
      })
      .join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>WikiWander Daily</title>
    <link>https://wikiwander.me</link>
    <description>Daily featured Wikipedia articles from WikiWander</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>https://wikiwander.me/appicon.png</url>
      <title>WikiWander Daily</title>
      <link>https://wikiwander.me</link>
    </image>
${items}
  </channel>
</rss>`;

    // Cache for 10 minutes
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.status(200).send(rss);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).json({ error: 'Failed to generate RSS feed' });
  }
}

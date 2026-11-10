import { ARTICLES } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** /rss.xml — 네이버 서치어드바이저 'RSS 제출'용 가이드 글 피드 */
export function GET() {
  const items = ARTICLES.map(
    (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE_URL}/guide/${a.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/guide/${a.slug}/</guid>
      <description>${esc(a.description)}</description>
      <pubDate>${new Date(`${a.datePublished}T09:00:00+09:00`).toUTCString()}</pubDate>
    </item>`,
  ).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>러브앳 돌싱 만남 가이드</title>
    <link>${SITE_URL}/guide/</link>
    <description>돌싱 소개팅·재혼 만남을 준비하는 분을 위한 러브앳 가이드</description>
    <language>ko</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}

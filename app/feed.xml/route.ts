import { getAllArticleSummaries } from "@/lib/content/loader";
import { CATEGORY_CONFIG } from "@/lib/content/categories";

export const dynamic = "force-static";

const SITE_URL = "https://lab.haiinu.com";
const SITE_TITLE = "Lab Share — HAI Lab";
const SITE_DESC = "인천대 HAI 연구실 내부 지식 공유와 프로젝트 운영 허브";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string): string {
  // date: "2026-04-27" → RFC 822
  const d = new Date(`${date}T00:00:00+09:00`);
  return d.toUTCString();
}

export async function GET() {
  const articles = await getAllArticleSummaries();
  const lastBuild = articles[0]?.date ?? new Date().toISOString().slice(0, 10);

  const items = articles
    .map((a) => {
      const cat = CATEGORY_CONFIG[a.category].pageTitle;
      const url = `${SITE_URL}${a.href}`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(a.date)}</pubDate>
      <category>${escapeXml(cat)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>ko</language>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

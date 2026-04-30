import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import { fileNameToSlug, articleHref } from "./slug";
import { CATEGORY_SLUGS } from "./categories";
import type {
  Article,
  ArticleFrontmatter,
  ArticleSummary,
  AuthorRecord,
  CategorySlug,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/** 카테고리별 article markdown 파일 목록 (확장자 포함) */
async function listFiles(category: CategorySlug): Promise<string[]> {
  const dir = path.join(CONTENT_ROOT, category);
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => f.endsWith(".md"));
  } catch (err) {
    // 디렉토리 없으면 빈 배열 (카테고리 글 0개 가능)
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

/** 한 article 파일 읽고 frontmatter + body 분리 */
async function readArticle(
  category: CategorySlug,
  fileName: string,
): Promise<Article> {
  const fullPath = path.join(CONTENT_ROOT, category, fileName);
  const raw = await fs.readFile(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const slug = fileNameToSlug(fileName);
  // YAML 의 unquoted ISO date(예: 2026-04-27) → JS Date 객체로 파싱됨.
  // sort/render 단에서 string 으로 다룰 수 있게 ISO yyyy-mm-dd 로 정규화.
  const rawDate = (data as { date: unknown }).date;
  const date =
    rawDate instanceof Date
      ? rawDate.toISOString().slice(0, 10)
      : String(rawDate);
  const frontmatter = { ...data, date } as ArticleFrontmatter;
  return {
    ...frontmatter,
    category,
    slug,
    href: articleHref(category, slug),
    body: content,
  };
}

/** 카테고리 1개의 article 전체 (frontmatter + body) */
export async function getArticlesByCategory(
  category: CategorySlug,
): Promise<Article[]> {
  const files = await listFiles(category);
  const articles = await Promise.all(
    files.map((f) => readArticle(category, f)),
  );
  // 최신순 (date desc, slug desc fallback)
  articles.sort((a, b) => {
    const da = a.date.localeCompare(b.date);
    if (da !== 0) return -da;
    return b.slug.localeCompare(a.slug);
  });
  return articles;
}

/** 카테고리별 summary (body 제외) */
export async function getArticleSummariesByCategory(
  category: CategorySlug,
): Promise<ArticleSummary[]> {
  const articles = await getArticlesByCategory(category);
  return articles.map(({ body: _body, ...summary }) => summary);
}

/** OG/메타 description — body 의 첫 의미있는 한 문단을 짧게 자른다. */
export function articleDescription(body: string, maxLen = 140): string {
  const stripped = body
    .replace(/^---[\s\S]*?---/, "")
    .replace(/^#.*$/gm, "")
    .replace(/^>.*$/gm, "")
    .replace(/\!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
  const firstParagraph = stripped.split(/\n\s*\n/)[0]?.replace(/\s+/g, " ").trim() ?? "";
  if (firstParagraph.length <= maxLen) return firstParagraph;
  return firstParagraph.slice(0, maxLen - 1).trimEnd() + "…";
}

/** 모든 글에서 태그 집계 — Tags 페이지에서 쓴다 */
export interface TagBucket {
  tag: string;
  count: number;
  /** 그 태그를 가진 글 중 가장 최신 글의 href (row 클릭 시 직행) */
  href: string;
  /** 그 글의 카테고리 (dot 색 결정) */
  category: CategorySlug;
}

export async function getTagBuckets(): Promise<TagBucket[]> {
  const all = await getAllArticleSummaries();
  const buckets = new Map<string, { count: number; latest: ArticleSummary }>();
  for (const a of all) {
    for (const raw of a.tags ?? []) {
      // YAML 이 1E2/1A7 같은 값을 숫자로 파싱할 수 있음 → 문자열 강제.
      const t = String(raw);
      const cur = buckets.get(t);
      if (!cur) {
        buckets.set(t, { count: 1, latest: a });
      } else {
        cur.count += 1;
        if (a.date.localeCompare(cur.latest.date) > 0) cur.latest = a;
      }
    }
  }
  return [...buckets.entries()]
    .map(([tag, v]) => ({
      tag,
      count: v.count,
      href: v.latest.href,
      category: v.latest.category,
    }))
    .sort((a, b) => (b.count - a.count) || a.tag.localeCompare(b.tag));
}

/** 모든 카테고리의 모든 article 합본 (summary, 최신순) */
export async function getAllArticleSummaries(): Promise<ArticleSummary[]> {
  const all = await Promise.all(
    CATEGORY_SLUGS.map((c) => getArticleSummariesByCategory(c)),
  );
  const flat = all.flat();
  flat.sort((a, b) => {
    const da = a.date.localeCompare(b.date);
    if (da !== 0) return -da;
    return b.slug.localeCompare(a.slug);
  });
  return flat;
}

/** 단일 article (404 시 null) — slug 가 percent-encoded 든 raw 든 모두 매칭 */
export async function getArticle(
  category: CategorySlug,
  slug: string,
): Promise<Article | null> {
  const files = await listFiles(category);
  // Next.js static export 가 한글 슬러그를 percent-encoded 형태로 전달할 수 있음.
  // 양쪽 모두 시도해서 매칭.
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // malformed input — 그대로 사용
  }
  const fileName = files.find((f) => {
    const base = fileNameToSlug(f);
    return base === slug || base === decoded;
  });
  if (!fileName) return null;
  return readArticle(category, fileName);
}

/** 카테고리 모든 슬러그 (정적 빌드 generateStaticParams 용) */
export async function getCategorySlugs(
  category: CategorySlug,
): Promise<string[]> {
  const files = await listFiles(category);
  return files.map((f) => fileNameToSlug(f));
}

/** content/authors.yml 읽기 */
export async function getAuthors(): Promise<Record<string, AuthorRecord>> {
  const file = path.join(CONTENT_ROOT, "authors.yml");
  const raw = await fs.readFile(file, "utf-8");
  const parsed = yaml.load(raw) as { authors: Record<string, Omit<AuthorRecord, "id">> };
  const out: Record<string, AuthorRecord> = {};
  for (const [id, rec] of Object.entries(parsed.authors)) {
    out[id] = { id, ...rec };
  }
  return out;
}

export async function getAuthor(id: string): Promise<AuthorRecord | null> {
  const all = await getAuthors();
  return all[id] ?? null;
}

/** 특정 작성자의 모든 글 (최신순) */
export async function getArticlesByAuthor(
  authorId: string,
): Promise<ArticleSummary[]> {
  const all = await getAllArticleSummaries();
  return all.filter((a) => a.authors.includes(authorId));
}

import Link from "next/link";
import { CATEGORY_SLUGS } from "@/lib/content/categories";
import type { CategorySlug } from "@/lib/content/types";

/**
 * Rail 활성 키 — 실제 사이트 구조에 1:1 대응.
 *  - "home"   : 랜딩 ("/")
 *  - 5 카테고리 슬러그
 *  - "tags" / "authors"  : 메타 뷰
 *  - "search" : 검색
 */
export type RailNavKey =
  | "home"
  | CategorySlug
  | "tags"
  | "authors"
  | "search";

interface LinearRailProps {
  /** 활성 표시할 nav 키들. 보통 페이지당 1개 */
  activeKeys?: RailNavKey[];
  /** 카테고리별 글 수 — getCategoryCounts() 결과를 그대로 넘긴다 */
  categoryCounts?: Partial<Record<CategorySlug, number>>;
}

const CATEGORY_LABEL: Record<CategorySlug, string> = {
  news: "News",
  "useful-github": "Useful GitHub",
  "lab-skills": "Lab Skills",
  "external-skills": "External Skills",
  notice: "Notice",
};

const CATEGORY_GLYPH: Record<CategorySlug, string> = {
  news: "↯",
  "useful-github": "◆",
  "lab-skills": "◇",
  "external-skills": "▣",
  notice: "⌂",
};

/**
 * 좌측 사이드바 — 모든 페이지 공통.
 *
 * 정보 구조:
 *   1. Home (Recent 뷰)
 *   2. Categories (5개 — News/Useful GitHub/Lab Skills/External Skills/Notice)
 *   3. Browse (Tags, Authors)
 *
 * 디자인 토큰 SSOT: styles/globals.css (.linear-rail, .primary-nav, .nav-block, ...)
 */
export function LinearRail({
  activeKeys = [],
  categoryCounts = {},
}: LinearRailProps) {
  const set = new Set<RailNavKey>(activeKeys);
  const cls = (key: RailNavKey) => (set.has(key) ? "active" : undefined);

  return (
    <aside className="linear-rail">
      <div className="window-dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Link href="/" className="workspace-switcher" aria-label="Lab Share home">
        <div className="workspace-logo">H</div>
        <strong>HAI Lab Share</strong>
        <span>⌄</span>
      </Link>

      <nav className="primary-nav" aria-label="Workspace navigation">
        <Link href="/" className={cls("home")}>
          <span className="nav-glyph">⌂</span>Home
        </Link>
      </nav>

      <div className="nav-block">
        <p>Categories</p>
        {CATEGORY_SLUGS.map((slug) => {
          const count = categoryCounts[slug] ?? 0;
          return (
            <Link
              key={slug}
              href={`/${slug}/`}
              className={cls(slug)}
              aria-label={`${CATEGORY_LABEL[slug]} (${count}개 글)`}
            >
              <span className="nav-glyph">{CATEGORY_GLYPH[slug]}</span>
              {CATEGORY_LABEL[slug]}
              {count > 0 ? <em>{count}</em> : null}
            </Link>
          );
        })}
      </div>

      <div className="nav-block">
        <p>Browse</p>
        <Link href="/tags/" className={cls("tags")}>
          <span className="nav-glyph">▱</span>Tags
        </Link>
        <Link href="/authors/jspark-inu/" className={cls("authors")}>
          <span className="team-chip blue">A</span>Authors <b>›</b>
        </Link>
      </div>
    </aside>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ArticleRow } from "./ArticleRow";
import { ArticleTableHead, SectionRow } from "./ArticleTableHead";
import type { ArticleSummary, CategorySlug, AuthorRecord } from "@/lib/content/types";

interface Props {
  articles: ArticleSummary[];
  authors: Record<string, AuthorRecord>;
  /** 단일 카테고리 페이지면 해당 slug 전달 — 카테고리 칩과 컬럼 숨김 */
  lockedCategory?: CategorySlug;
  /** 섹션 헤더 라벨 (기본 "All articles") */
  sectionLabel?: string;
  /** 빈 상태 메시지 */
  emptyMessage?: string;
}

const ALL_CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: "news", label: "News" },
  { slug: "useful-github", label: "Useful GitHub" },
  { slug: "lab-skills", label: "Lab Skills" },
  { slug: "external-skills", label: "External Skills" },
  { slug: "notice", label: "Notice" },
];

/**
 * 실제 동작하는 글 테이블 — 카테고리 토글 + 검색.
 *
 * 클라이언트 컴포넌트이지만 입력은 빌드 타임 정적 데이터(props).
 * 사이트 자체는 여전히 next export → GitHub Pages.
 */
export function FilterableArticleTable({
  articles,
  authors,
  lockedCategory,
  sectionLabel,
  emptyMessage = "조건에 맞는 글이 없어요",
}: Props) {
  // 카테고리 필터: undefined = 전체. 단일 카테고리 페이지에선 항상 lockedCategory.
  const [activeCategory, setActiveCategory] = useState<CategorySlug | undefined>(undefined);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const cat = lockedCategory ?? activeCategory;
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (cat && a.category !== cat) return false;
      if (!q) return true;
      const hay = [
        a.title,
        ...(a.tags ?? []),
        ...(a.authors ?? []).map((id) => authors[id]?.name ?? id),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [articles, authors, activeCategory, lockedCategory, query]);

  const showCategoryColumn = !lockedCategory;
  const chips = lockedCategory ? [] : ALL_CATEGORIES;

  return (
    <>
      <section className="filter-bar" aria-label="Filter articles">
        {chips.length > 0 ? (
          <>
            <button
              type="button"
              className="filter-chip"
              aria-pressed={activeCategory === undefined}
              onClick={() => setActiveCategory(undefined)}
            >
              All
            </button>
            {chips.map((c) => (
              <button
                key={c.slug}
                type="button"
                className="filter-chip"
                aria-pressed={activeCategory === c.slug}
                onClick={() =>
                  setActiveCategory((prev) => (prev === c.slug ? undefined : c.slug))
                }
              >
                {c.label}
              </button>
            ))}
          </>
        ) : null}
        <input
          type="search"
          className="filter-search"
          placeholder="제목, 태그, 작성자로 검색…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search articles"
        />
      </section>

      <section className="projects-table" aria-label="Articles">
        <ArticleTableHead showCategory={showCategoryColumn} />
        <SectionRow label={sectionLabel ?? "All articles"} count={visible.length} />
        {visible.length === 0 ? (
          <div className="filter-empty">{emptyMessage}</div>
        ) : (
          visible.map((a) => (
            <ArticleRow
              key={`${a.category}-${a.slug}`}
              article={a}
              showCategory={showCategoryColumn}
              authorInitials={resolveInitials(a.authors, authors)}
            />
          ))
        )}
      </section>
    </>
  );
}

function resolveInitials(
  authorIds: string[] | undefined,
  authors: Record<string, AuthorRecord>,
): string {
  const id = authorIds?.[0];
  if (!id) return "?";
  return authors[id]?.initials ?? id.slice(0, 2).toUpperCase();
}

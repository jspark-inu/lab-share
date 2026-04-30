"use client";

import { useMemo, useState } from "react";
import { ArticleRow } from "./ArticleRow";
import { ArticleTableHead, SectionRow } from "./ArticleTableHead";
import type { ArticleSummary, AuthorRecord } from "@/lib/content/types";

export interface TagBucket {
  tag: string;
  count: number;
}

interface Props {
  articles: ArticleSummary[];
  tagBuckets: TagBucket[];
  authors: Record<string, AuthorRecord>;
}

/**
 * Tags 페이지의 인터랙티브 부분 — 칩 + 필터링된 테이블.
 * 외곽 (LinearShell, ProjectChrome, ProjectTabs)은 서버 컴포넌트가 감싼다.
 */
export function TagsView({ articles, tagBuckets, authors }: Props) {
  const [active, setActive] = useState<string | undefined>(undefined);

  const visible = useMemo(() => {
    if (!active) return articles;
    return articles.filter((a) => (a.tags ?? []).includes(active));
  }, [articles, active]);

  const sectionLabel = active ? `#${active}` : "All articles";

  return (
    <>
      <section className="filter-bar" aria-label="Filter by tag">
        <button
          type="button"
          className="filter-chip"
          aria-pressed={active === undefined}
          onClick={() => setActive(undefined)}
        >
          All
        </button>
        {tagBuckets.map((b) => (
          <button
            key={b.tag}
            type="button"
            className="filter-chip"
            aria-pressed={active === b.tag}
            onClick={() => setActive((prev) => (prev === b.tag ? undefined : b.tag))}
          >
            #{b.tag} <span style={{ marginLeft: 4, opacity: 0.7 }}>{b.count}</span>
          </button>
        ))}
      </section>

      <section className="projects-table" aria-label="Articles by tag">
        <ArticleTableHead showCategory={true} />
        <SectionRow label={sectionLabel} count={visible.length} />
        {visible.length === 0 ? (
          <div className="filter-empty">해당 태그의 글이 없어요</div>
        ) : (
          visible.map((a) => (
            <ArticleRow
              key={`${a.category}-${a.slug}`}
              article={a}
              showCategory={true}
              authorInitials={authors[a.authors?.[0] ?? ""]?.initials ?? "?"}
            />
          ))
        )}
      </section>
    </>
  );
}

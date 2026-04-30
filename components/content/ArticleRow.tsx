import Link from "next/link";
import type { ArticleSummary, CategorySlug, DotColor } from "@/lib/content/types";

/** 카테고리별 고정 색 — 사이드바 글리프와 한 톤. */
const CATEGORY_DOT: Record<CategorySlug, DotColor> = {
  news: "amber",
  "useful-github": "cyan",
  "lab-skills": "green",
  "external-skills": "indigo",
  notice: "orange",
};

const CATEGORY_LABEL: Record<CategorySlug, string> = {
  news: "News",
  "useful-github": "Useful GitHub",
  "lab-skills": "Lab Skills",
  "external-skills": "External Skills",
  notice: "Notice",
};

interface Props {
  article: ArticleSummary;
  /** 카테고리 컬럼 표시 여부 (단일 카테고리 페이지에선 false 가능) */
  showCategory?: boolean;
  /** 작성자 이니셜 (yml에서 lookup 한 값을 부모가 넘겨줌, 없으면 "?") */
  authorInitials?: string;
}

/**
 * 글 한 행 — 5컬럼: dot+제목 / 카테고리 / 태그 / 작성자 / 날짜.
 * 디자인 토큰은 기존 .project-row CSS 그대로 쓰되 컬럼 grid 만 새로 정의(.article-row).
 */
export function ArticleRow({ article, showCategory = true, authorInitials }: Props) {
  const dot = CATEGORY_DOT[article.category];
  const tags = (article.tags ?? []).slice(0, 2);
  const moreTags = (article.tags?.length ?? 0) - tags.length;
  const initials = authorInitials ?? "?";

  // YYYY-MM-DD → "Apr 27" 같은 짧은 표기
  const shortDate = formatShortDate(article.date);

  return (
    <Link className="article-row" href={article.href}>
      <div className="name-cell">
        <span className={`project-dot ${dot}`}>●</span>
        <strong>{article.title}</strong>
      </div>

      {showCategory ? (
        <div className="category-cell">
          <span className={`category-pill ${article.category}`}>
            {CATEGORY_LABEL[article.category]}
          </span>
        </div>
      ) : (
        <div className="category-cell" />
      )}

      <div className="tags-cell">
        {tags.length === 0 ? (
          <span className="tags-empty">—</span>
        ) : (
          <>
            {tags.map((t) => (
              <span key={t} className="tag-chip">
                #{t}
              </span>
            ))}
            {moreTags > 0 ? <span className="tag-more">+{moreTags}</span> : null}
          </>
        )}
      </div>

      <div className="author-cell">
        <span className="lead-cell" aria-hidden="true">
          {initials}
        </span>
      </div>

      <div className="date-cell">
        <span className="calendar-icon">▣</span>
        {shortDate}
      </div>
    </Link>
  );
}

function formatShortDate(iso: string): string {
  // 입력은 ISO yyyy-mm-dd 가정. 실패하면 원본 반환.
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[parseInt(m[2], 10) - 1] ?? m[2];
  return `${month} ${parseInt(m[3], 10)}, ${m[1]}`;
}

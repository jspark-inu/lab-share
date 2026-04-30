/**
 * Content 도메인 공통 타입.
 * 모든 article frontmatter는 ArticleFrontmatter 형태로 normalize 된다.
 */

import type {
  DotColor,
  HealthVariant,
  PriorityVariant,
  StatusVariant,
} from "@/components/linear/ProjectRow";

export type CategorySlug =
  | "news"
  | "useful-github"
  | "lab-skills"
  | "external-skills"
  | "notice";

/** Frontmatter 의 display 블록 — Linear ProjectRow 표시 메타. */
export interface ArticleDisplay {
  dot: DotColor;
  meta?: string;
  health: { label: string; variant?: HealthVariant };
  priority: PriorityVariant;
  lead: string;
  date: string;
  status: { value: string; variant?: StatusVariant };
  /** 작성자 페이지에서의 표시용 짧은 날짜 (예: "Apr 27") */
  authorPageDate?: string;
  /** 작성자 페이지에서의 카테고리 라벨 (예: "News") */
  authorPageMeta?: string;
}

export interface ArticleFrontmatter {
  title: string;
  date: string;
  authors: string[];
  tags: string[];
  display: ArticleDisplay;
  /** 댓글 위젯 노출 여부 (기본 true) */
  comments?: boolean;
}

export interface ArticleSummary extends ArticleFrontmatter {
  category: CategorySlug;
  slug: string;
  /** /news/2026-04-27-... 같은 절대 path */
  href: string;
}

export interface Article extends ArticleSummary {
  /** raw markdown body (frontmatter 제외) */
  body: string;
}

export interface AuthorRecord {
  id: string;
  name: string;
  description: string;
  avatar: string;
  url: string;
  initials: string;
  affiliation: string;
}

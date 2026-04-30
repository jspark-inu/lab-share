/**
 * Content 도메인 공통 타입.
 * 모든 article frontmatter는 ArticleFrontmatter 형태로 normalize 된다.
 */

export type CategorySlug =
  | "news"
  | "useful-github"
  | "lab-skills"
  | "external-skills"
  | "notice";

/** 카테고리 dot 색상 토큰 — globals.css의 --orange/green/cyan/blue/amber/red/pink 와 매핑 */
export type DotColor =
  | "orange"
  | "green"
  | "cyan"
  | "indigo"
  | "amber"
  | "red"
  | "pink";

export interface ArticleFrontmatter {
  title: string;
  date: string;
  authors: string[];
  tags: string[];
  /**
   * 레거시 display 블록 — Linear redesign 시기 dummy 메타가 들어있음.
   * 새 ArticleRow 는 더 이상 참조하지 않지만, 기존 .md 파일들은
   * frontmatter 에 이 키를 유지하므로 unknown 으로 받아만 둔다.
   */
  display?: unknown;
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

/**
 * Content 도메인 공통 타입.
 * 1E2 Lab Ops Hub — 5 섹션:
 *   projects (주제별 연구·작업 트래커, 단기/중기/장기 결과물)
 *   meetings (회의록 — GDrive→로컬 LLM→md→repo 자동 push)
 *   skills   (학생들이 발견·작성한 도구·워크플로우 공유)
 *   wiki     (연구 막힌 부분 누적 + 환경/맥락 노하우)
 *   notice   (공지·일정)
 */

export type CategorySlug = "projects" | "meetings" | "skills" | "wiki" | "notice";

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
   * Linear ProjectRow 표시 메타. projects 섹션에선 모든 필드 의미 있음
   * (Health/Priority/Lead/Date/Status%); 그 외 섹션은 옵션. unknown 으로
   * 받아 기존 .md 호환은 유지.
   */
  display?: unknown;
  /** 댓글 위젯 노출 여부 (기본 true) */
  comments?: boolean;
}

export interface ArticleSummary extends ArticleFrontmatter {
  category: CategorySlug;
  slug: string;
  /** /projects/{slug}/ 같은 절대 path */
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

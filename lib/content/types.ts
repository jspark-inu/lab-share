/**
 * Content 도메인 공통 타입.
 * 1E2 Lab Ops Hub — 6 섹션:
 *   projects  (주제별 연구·작업 트래커, 단기/중기/장기 결과물)
 *   meetings  (회의록 — GDrive→로컬 LLM→md→repo 자동 push)
 *   skills    (Claude Code 등 에이전트가 직접 돌리는 스킬 — 학생이 찾거나 만든 것)
 *   wiki      (연구 막힌 부분 누적 + 환경/맥락 노하우)
 *   notice    (공지·일정)
 *   resources (사람이 읽는 외부 학습 자료 큐레이션 — 영상/책/논문/MOOC/슬라이드 + 첨부)
 */

export type CategorySlug =
  | "projects"
  | "meetings"
  | "skills"
  | "wiki"
  | "notice"
  | "resources";

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
  /**
   * 자료실(resources) 전용 옵션 필드. 다른 카테고리에서는 무시됨.
   * source_url: 외부 자료 원본 링크 (Coursera/YouTube/논문 PDF/블로그 등)
   * attachments: public/resources/files/ 안의 파일명 배열. 빌드 시 정적으로
   *   /resources/files/{name} 으로 서빙. 단일 파일 50MB 이하 권장
   *   (GitHub repo 100MB hard limit). 큰 파일은 Drive 링크를 source_url 로.
   */
  source_url?: string;
  attachments?: string[];
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

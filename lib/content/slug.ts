/**
 * URL 슬러그 헬퍼 — 한글 URL 보존을 위해 인코딩하지 않은 raw 문자열 그대로 사용.
 * Next.js 가 build/runtime에서 자동 percent-encoding 처리.
 */

import path from "node:path";

/** 파일명 → 슬러그 (확장자 제거) */
export function fileNameToSlug(fileName: string): string {
  return path.basename(fileName, ".md");
}

/** category + slug → 절대 URL path */
export function articleHref(category: string, slug: string): string {
  return `/${category}/${slug}/`;
}

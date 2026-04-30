/**
 * Linear 디자인 토큰 — TS 상수로 export.
 * 실제 색·폰트·간격은 styles/globals.css 의 :root CSS 변수가 SSOT.
 * 여기는 오타 방지용 type-safe 참조 + 미래 React 컴포넌트에서 inline style 필요 시 사용.
 */

export const cssVar = {
  surface: "var(--surface)",
  panel: "var(--panel)",
  rail: "var(--rail)",
  railActive: "var(--rail-active)",
  line: "var(--line)",
  lineDark: "var(--line-dark)",
  text: "var(--text)",
  muted: "var(--muted)",
  faint: "var(--faint)",
  soft: "var(--soft)",
  green: "var(--green)",
  orange: "var(--orange)",
  amber: "var(--amber)",
  red: "var(--red)",
  blue: "var(--blue)",
  cyan: "var(--cyan)",
  purple: "var(--purple)",
  pink: "var(--pink)",
} as const;

export const breakpoints = {
  desktop: 1120,
  tablet: 860,
  mobile: 560,
} as const;

export const fontStack =
  '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

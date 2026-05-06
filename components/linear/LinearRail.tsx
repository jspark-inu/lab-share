import Link from "next/link";

/**
 * Lab Ops Hub 사이드바 — 정직 라벨.
 * 디자인 SSOT(.linear-rail / .primary-nav / .nav-block / .nav-glyph / .team-chip 등)는 변경 0.
 * 라벨 텍스트와 href 만 실제 사이트 구조와 1:1 매핑.
 *
 * 12개 슬롯:
 *   Primary nav (3): Home / Recent / Updates
 *   Workspace block (6): Projects / Meetings / Skills / Wiki / Notice / Resources
 *   Your teams block (3): 김도현 / 이혜진 / 박경 (학생 칩 — Phase 2 학생 페이지 예약)
 */
export type RailNavKey =
  // Primary nav
  | "home"
  | "recent"
  | "updates"
  // Workspace block
  | "projects"
  | "meetings"
  | "skills"
  | "wiki"
  | "notice"
  | "resources"
  // Your teams chips
  | "student-do"
  | "student-hye"
  | "student-gyung";

interface LinearRailProps {
  /** 활성 표시할 nav 키들 (보통 1개) */
  activeKeys?: RailNavKey[];
  /** Recent badge count (default 0 = 미표시) */
  recentBadge?: number;
  /** Updates badge count (default 0) */
  updatesBadge?: number;
}

/**
 * 좌측 사이드바 — 모든 페이지 공통.
 * 디자인 시스템 SSOT: styles/globals.css 의 .linear-rail 외 클래스 그대로.
 */
export function LinearRail({
  activeKeys = [],
  recentBadge = 0,
  updatesBadge = 0,
}: LinearRailProps) {
  const set = new Set(activeKeys);
  const cls = (key: RailNavKey) => (set.has(key) ? "active" : undefined);

  return (
    <aside className="linear-rail">
      <div className="window-dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Link href="/" className="workspace-switcher" aria-label="HAI Lab Ops Hub">
        <div className="workspace-logo">H</div>
        <strong>HAI Lab</strong>
        <span>⌄</span>
      </Link>

      <nav className="primary-nav" aria-label="Workspace navigation">
        <Link href="/" className={cls("home")}>
          <span className="nav-glyph">⌂</span>Home
        </Link>
        <Link href="/projects/" className={cls("recent")}>
          <span className="nav-glyph">◌</span>Recent
        </Link>
        <Link href="/meetings/" className={cls("updates")}>
          <span className="nav-glyph">↯</span>Updates{" "}
          {updatesBadge > 0 ? <em>{updatesBadge}</em> : null}
        </Link>
      </nav>

      <div className="nav-block">
        <p>Workspace</p>
        <Link href="/projects/" className={cls("projects")}>
          <span className="nav-glyph">⌃</span>Projects
        </Link>
        <Link href="/meetings/" className={cls("meetings")}>
          <span className="nav-glyph">◇</span>Meetings
        </Link>
        <Link href="/skills/" className={cls("skills")}>
          <span className="nav-glyph">▱</span>Skills
        </Link>
        <Link href="/wiki/" className={cls("wiki")}>
          <span className="nav-glyph">▣</span>Wiki
        </Link>
        <Link href="/notice/" className={cls("notice")}>
          <span className="nav-glyph">⋯</span>Notice
        </Link>
        <Link href="/resources/" className={cls("resources")}>
          <span className="nav-glyph">◫</span>Resources
        </Link>
      </div>

      <div className="nav-block">
        <p>Your team</p>
        <Link href="/projects/" className={cls("student-do")}>
          <span className="team-chip blue">도</span>김도현 <b>›</b>
        </Link>
        <Link href="/projects/" className={cls("student-hye")}>
          <span className="team-chip purple">혜</span>이혜진 <b>›</b>
        </Link>
        <Link href="/projects/" className={cls("student-gyung")}>
          <span className="team-chip mint">경</span>박경 <b>›</b>
        </Link>
      </div>
    </aside>
  );
}

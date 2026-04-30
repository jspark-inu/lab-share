import Link from "next/link";

export type RailNavKey =
  | "projects"
  | "views"
  | "teams"
  | "initiatives"
  | "more"
  | "inbox"
  | "myissues"
  | "pulse";

interface LinearRailProps {
  /** Which workspace nav item is highlighted */
  activeKey?: RailNavKey;
  /** Inbox badge count (default 3 to match current sites) */
  inboxBadge?: number;
  /** Pulse badge count (default 1) */
  pulseBadge?: number;
}

/**
 * 좌측 사이드바 — 모든 페이지 공통.
 * 디자인 시스템 SSOT: docs/stylesheets/extra.css 의 .linear-rail 외 클래스 1:1 포팅.
 */
export function LinearRail({
  activeKey = "projects",
  inboxBadge = 3,
  pulseBadge = 1,
}: LinearRailProps) {
  const isActive = (key: RailNavKey) =>
    activeKey === key ? "active" : undefined;

  return (
    <aside className="linear-rail">
      <div className="window-dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="workspace-switcher">
        <div className="workspace-logo">H</div>
        <strong>HAI Lab</strong>
        <span>⌄</span>
      </div>

      <nav className="primary-nav" aria-label="Workspace navigation">
        <Link href="/notice/" className={isActive("inbox")}>
          <span className="nav-glyph">⌂</span>Inbox{" "}
          {inboxBadge > 0 ? <em>{inboxBadge}</em> : null}
        </Link>
        <Link href="/lab-skills/" className={isActive("myissues")}>
          <span className="nav-glyph">◌</span>My issues
        </Link>
        <Link href="/news/" className={isActive("pulse")}>
          <span className="nav-glyph">↯</span>Pulse{" "}
          {pulseBadge > 0 ? <em>{pulseBadge}</em> : null}
        </Link>
      </nav>

      <div className="nav-block">
        <p>Workspace</p>
        <Link href="/news/" className={isActive("initiatives")}>
          <span className="nav-glyph">⌃</span>Initiatives
        </Link>
        <Link href="/" className={isActive("projects")}>
          <span className="nav-glyph">◇</span>Projects
        </Link>
        <Link href="/tags/" className={isActive("views")}>
          <span className="nav-glyph">▱</span>Views
        </Link>
        <Link href="/authors/jspark-inu/" className={isActive("teams")}>
          <span className="nav-glyph">▣</span>Teams
        </Link>
        <Link href="/notice/" className={isActive("more")}>
          <span className="nav-glyph">⋯</span>More
        </Link>
      </div>

      <div className="nav-block">
        <p>Your teams</p>
        <Link href="/lab-skills/">
          <span className="team-chip blue">R</span>Research ops <b>›</b>
        </Link>
        <Link href="/useful-github/">
          <span className="team-chip purple">T</span>Tooling <b>›</b>
        </Link>
        <Link href="/external-skills/">
          <span className="team-chip mint">W</span>Workflows <b>›</b>
        </Link>
      </div>
    </aside>
  );
}

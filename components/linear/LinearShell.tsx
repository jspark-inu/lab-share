import { LinearRail, type RailNavKey } from "./LinearRail";

interface LinearShellProps {
  /** 활성 표시할 rail nav 키 (보통 1개) */
  activeKeys?: RailNavKey[];
  recentBadge?: number;
  updatesBadge?: number;
  children: React.ReactNode;
}

/**
 * 모든 페이지의 root wrapper.
 * <section class="linear-app"> 그리드 안에 LinearRail + project-surface(children).
 * children은 ProjectChrome + ProjectTabs + FilterRow + 본문 등 페이지별 surface 구성.
 */
export function LinearShell({
  activeKeys,
  recentBadge,
  updatesBadge,
  children,
}: LinearShellProps) {
  return (
    <section className="linear-app">
      <LinearRail
        activeKeys={activeKeys}
        recentBadge={recentBadge}
        updatesBadge={updatesBadge}
      />
      <main className="project-surface">{children}</main>
    </section>
  );
}

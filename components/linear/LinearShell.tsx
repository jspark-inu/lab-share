import { LinearRail, type RailNavKey } from "./LinearRail";
import { getCategoryCounts } from "@/lib/content/loader";

interface LinearShellProps {
  /** 활성 표시할 rail nav 키들 (보통 1개) */
  activeKeys?: RailNavKey[];
  children: React.ReactNode;
}

/**
 * 모든 페이지의 root wrapper. 서버 컴포넌트 — 빌드 타임에
 * 카테고리별 글 수를 사이드바에 주입한다.
 */
export async function LinearShell({
  activeKeys,
  children,
}: LinearShellProps) {
  const categoryCounts = await getCategoryCounts();
  return (
    <section className="linear-app">
      <LinearRail activeKeys={activeKeys} categoryCounts={categoryCounts} />
      <main className="project-surface">{children}</main>
    </section>
  );
}

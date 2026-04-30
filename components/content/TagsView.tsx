import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { FilterRow } from "@/components/linear/FilterRow";
import { SortableProjectsTable } from "@/components/linear/SortableProjectsTable";
import type { ProjectRowProps } from "@/components/linear/ProjectRow";
import type { ArticleSummary } from "@/lib/content/types";

interface Props {
  articles: ArticleSummary[];
}

/**
 * Tags 페이지 — Linear "Views" UI.
 * 현 docs/tags.md 를 정확히 1:1 재현 (큐레이션 3개 view).
 * 정렬은 SortableProjectsTable 에서 처리 — 디자인 변경 0.
 */
const TAG_ROWS: ProjectRowProps[] = [
  {
    href: "/news/",
    dot: "amber",
    name: "학과 / 개편 / AI",
    meta: "department transition signals",
    health: { label: "On track · active" },
    priority: "muted",
    lead: "NS",
    date: "Q2 2026",
    status: { value: "3" },
  },
  {
    href: "/useful-github/",
    dot: "cyan",
    name: "github / agent / claude",
    meta: "agent tooling resources",
    health: { label: "On track · active" },
    priority: "bars",
    lead: "GT",
    date: "Q2 2026",
    status: { value: "3", variant: "blue" },
  },
  {
    href: "/lab-skills/",
    dot: "green",
    name: "abm / simulation / environment",
    meta: "research experiment setup",
    health: { label: "On track · active" },
    priority: "bars",
    lead: "RO",
    date: "Q2 2026",
    status: { value: "3", variant: "gold" },
  },
];

export function TagsView({ articles: _articles }: Props) {
  return (
    <LinearShell activeKeys={["views"]}>
      <ProjectChrome title="◇ Views" />
      <ProjectTabs
        tabs={[
          { label: "Tags", href: "/tags/", variant: "strong" },
          { label: "◇ All views", href: "/tags/", variant: "active" },
          { label: "Projects", href: "/" },
          { label: "Signals", href: "/news/" },
          { label: "Authors", href: "/authors/jspark-inu/", variant: "quiet" },
        ]}
        primaryActionLabel="＋ Create view"
        primaryActionHref="/notice/"
      />
      <FilterRow />
      <SortableProjectsTable
        groups={[{ label: "Views", rows: TAG_ROWS }]}
        ariaLabel="Tags table"
      />
    </LinearShell>
  );
}

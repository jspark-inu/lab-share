import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { FilterRow } from "@/components/linear/FilterRow";
import { TableHead, QuarterRow } from "@/components/linear/TableHead";
import { ProjectRow } from "@/components/linear/ProjectRow";
import type { ArticleSummary } from "@/lib/content/types";

interface Props {
  articles: ArticleSummary[];
}

/**
 * Tags 페이지 — Linear "Views" UI.
 * 현 docs/tags.md 를 정확히 1:1 재현.
 * 사용자 원본은 3개 row(학과/agent/abm)를 직접 큐레이션 — 우리도 같은 큐레이션 유지.
 * (자동으로 모든 tag 를 list 하면 너무 많아짐.)
 */
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
      <section className="projects-table" aria-label="Tags table">
        <TableHead />
        <QuarterRow label="Views" />
        <ProjectRow
          href="/news/"
          dot="amber"
          name="학과 / 개편 / AI"
          meta="department transition signals"
          health={{ label: "On track · active" }}
          priority="muted"
          lead="NS"
          date="Q2 2026"
          status={{ value: "3" }}
        />
        <ProjectRow
          href="/useful-github/"
          dot="cyan"
          name="github / agent / claude"
          meta="agent tooling resources"
          health={{ label: "On track · active" }}
          priority="bars"
          lead="GT"
          date="Q2 2026"
          status={{ value: "3", variant: "blue" }}
        />
        <ProjectRow
          href="/lab-skills/"
          dot="green"
          name="abm / simulation / environment"
          meta="research experiment setup"
          health={{ label: "On track · active" }}
          priority="bars"
          lead="RO"
          date="Q2 2026"
          status={{ value: "3", variant: "gold" }}
        />
      </section>
    </LinearShell>
  );
}

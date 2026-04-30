import type { Metadata } from "next";
import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { FilterRow } from "@/components/linear/FilterRow";
import { TableHead, QuarterRow } from "@/components/linear/TableHead";
import { ProjectRow } from "@/components/linear/ProjectRow";

export const metadata: Metadata = {
  title: "Projects",
};

/**
 * 홈 — Projects 뷰.
 * docs/index.md 의 Linear projects-table 1:1 React 포팅.
 * 디자인 회귀 테스트: extra.css 클래스명·구조 동일.
 */
export default function HomePage() {
  return (
    <LinearShell activeKeys={["projects"]}>
      <ProjectChrome title="◇ Projects" />

      <ProjectTabs
        tabs={[
          { label: "Projects", href: "/", variant: "strong" },
          { label: "◇ All projects", href: "/", variant: "active" },
          { label: "Product Roadmap", href: "/news/" },
          { label: "Roadmap Timeline", href: "/lab-skills/" },
          { label: "8 more...", href: "/tags/", variant: "quiet" },
        ]}
        primaryActionLabel="＋ Create project"
        primaryActionHref="/notice/"
      />

      <FilterRow />

      <section className="projects-table" aria-label="Lab project table">
        <TableHead />

        <QuarterRow label="Q2 2026" />

        <ProjectRow
          href="/notice/2026-04-27-lab-share-개시/"
          dot="orange"
          name="Lab Share launch"
          health={{ label: "On track · 1mo" }}
          priority="bars-high"
          lead="JS"
          date="Q2 2026"
          status={{ value: "88%" }}
        />

        <QuarterRow label="Q3 2026" />

        <ProjectRow
          href="/lab-skills/"
          dot="green"
          name="Research skill library"
          meta="Knowledge Base · 64%"
          health={{ label: "On track · 3mo" }}
          priority="bars"
          lead="RO"
          date="Q3 2026"
          status={{ value: "64%", variant: "gold" }}
        />

        <ProjectRow
          href="/useful-github/"
          dot="cyan"
          name="Tooling radar"
          meta="GitHub resources · 35%"
          health={{ label: "On track · 4mo" }}
          priority="muted"
          lead="GT"
          date="Q3 2026"
          status={{ value: "35%", variant: "blue" }}
        />

        <ProjectRow
          href="/external-skills/"
          dot="indigo"
          name="Claude Code workflow set"
          meta="Workflow Operations · 28%"
          health={{ label: "No updates", variant: "muted" }}
          priority="bars"
          lead="WK"
          date="Q3 2026"
          status={{ value: "28%" }}
        />

        <ProjectRow
          href="/news/"
          dot="amber"
          name="Department signal tracking"
          meta="News & Trends · 0%"
          health={{ label: "On track · 2mo" }}
          priority="muted"
          lead="NS"
          date="Q3 2026"
          status={{ value: "0%" }}
        />

        <QuarterRow label="Q4 2026" />

        <ProjectRow
          href="/notice/"
          dot="red"
          name="Member feedback verification"
          meta="Giscus comments · blocked"
          health={{ label: "At risk · account check", variant: "atrisk" }}
          priority="bars-high"
          lead="FB"
          date="Q4 2026"
          status={{ value: "12%", variant: "gold" }}
        />

        <ProjectRow
          href="/notice/"
          dot="pink"
          name="Internal access layer"
          meta="Cloudflare Access · planned"
          health={{ label: "No updates", variant: "muted" }}
          priority="bars"
          lead="SEC"
          date="Q4 2026"
          status={{ value: "0%" }}
        />
      </section>
    </LinearShell>
  );
}

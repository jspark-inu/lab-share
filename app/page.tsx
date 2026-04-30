import type { Metadata } from "next";
import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { FilterRow } from "@/components/linear/FilterRow";
import { SortableProjectsTable } from "@/components/linear/SortableProjectsTable";
import { getArticleSummariesByCategory } from "@/lib/content/loader";
import { getProjectRecords, projectRecordToRowProps } from "@/lib/content/projectDb";

export const metadata: Metadata = {
  title: "Home",
};

/**
 * 홈 — Lab Ops Hub 메인 보드.
 * 실제 Projects 5개를 Linear "projects-table" UI 로 노출.
 * 디자인 SSOT (.linear-app/.linear-rail/.projects-table/.project-row 6컬럼) 변경 0.
 */
export default async function HomePage() {
  const projects = await getArticleSummariesByCategory("projects");
  const projectRecords = await getProjectRecords();
  const articlesBySlug = new Map(projects.map((article) => [article.slug, article]));
  const rows = projectRecords
    .map((project) => {
      const article = articlesBySlug.get(project.slug);
      if (!article) return null;
      return projectRecordToRowProps(project, article.title, article.href);
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row));

  return (
    <LinearShell activeKeys={["home"]}>
      <ProjectChrome title="◇ Lab Ops Hub" />

      <ProjectTabs
        tabs={[
          { label: "Home", href: "/", variant: "strong" },
          { label: "◇ All projects", href: "/", variant: "active" },
          { label: "Meetings", href: "/meetings/" },
          { label: "Skills", href: "/skills/" },
          { label: "Wiki", href: "/wiki/", variant: "quiet" },
        ]}
        primaryActionLabel="＋ Track project"
        primaryActionHref="/projects/"
      />

      <FilterRow />

      <SortableProjectsTable
        groups={[{ label: "Active", rows }]}
        ariaLabel="Lab project table"
      />
    </LinearShell>
  );
}

import type { Metadata } from "next";
import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { FilterRow } from "@/components/linear/FilterRow";
import { SortableProjectsTable } from "@/components/linear/SortableProjectsTable";
import { CATEGORY_CONFIG } from "@/lib/content/categories";
import { getArticleSummariesByCategory } from "@/lib/content/loader";
import { getProjectRecords, projectRecordToRowProps } from "@/lib/content/projectDb";

const config = CATEGORY_CONFIG.projects;

export const metadata: Metadata = {
  title: config.pageTitle,
};

export default async function ProjectsIndexPage() {
  const articles = await getArticleSummariesByCategory("projects");
  const projectRecords = await getProjectRecords();
  const articlesBySlug = new Map(articles.map((article) => [article.slug, article]));
  const rows = projectRecords
    .map((project) => {
      const article = articlesBySlug.get(project.slug);
      if (!article) return null;
      return projectRecordToRowProps(project, article.title, article.href);
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row));

  return (
    <LinearShell activeKeys={config.activeKeys}>
      <ProjectChrome title={config.chromeTitle} />
      <ProjectTabs
        tabs={[
          { label: config.pageTitle, href: "/projects/", variant: "strong" },
          { label: config.activeTabLabel, href: "/projects/", variant: "active" },
          ...config.extraTabs,
        ]}
        primaryActionLabel={config.primaryActionLabel}
        primaryActionHref="/projects/"
      />
      <FilterRow />
      <SortableProjectsTable
        groups={[{ label: config.quarterLabel, rows }]}
        ariaLabel={config.ariaLabel}
      />
    </LinearShell>
  );
}

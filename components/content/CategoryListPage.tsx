import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { FilterRow } from "@/components/linear/FilterRow";
import { SortableProjectsTable } from "@/components/linear/SortableProjectsTable";
import { articleToProjectRowProps } from "./ArticleProjectRow";
import type { CategoryConfig } from "@/lib/content/categories";
import type { ArticleSummary } from "@/lib/content/types";

interface Props {
  config: CategoryConfig;
  articles: ArticleSummary[];
}

/**
 * 5개 카테고리 인덱스 페이지의 공통 shell.
 * 디자인 1:1: docs/{cat}/index.md 의 Linear projects-table 구조 그대로.
 * 정렬 추가: SortableProjectsTable 이 헤더 클릭 → row 정렬 처리.
 */
export function CategoryListPage({ config, articles }: Props) {
  const tabs = [
    { label: config.pageTitle, href: `/${config.slug}/`, variant: "strong" as const },
    { label: config.activeTabLabel, href: `/${config.slug}/`, variant: "active" as const },
    ...config.extraTabs,
  ];

  const rows = articles.map((a) => articleToProjectRowProps({ article: a }));

  return (
    <LinearShell activeKeys={config.activeKeys}>
      <ProjectChrome title={config.chromeTitle} />
      <ProjectTabs
        tabs={tabs}
        primaryActionLabel={config.primaryActionLabel}
        primaryActionHref="/notice/"
      />
      <FilterRow />
      <SortableProjectsTable
        groups={[{ label: config.quarterLabel, rows }]}
        ariaLabel={config.ariaLabel}
      />
    </LinearShell>
  );
}

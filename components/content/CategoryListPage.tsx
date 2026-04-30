import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { FilterRow } from "@/components/linear/FilterRow";
import { TableHead, QuarterRow } from "@/components/linear/TableHead";
import { ArticleProjectRow } from "./ArticleProjectRow";
import type { CategoryConfig } from "@/lib/content/categories";
import type { ArticleSummary } from "@/lib/content/types";

interface Props {
  config: CategoryConfig;
  articles: ArticleSummary[];
}

/**
 * 5개 카테고리 인덱스 페이지의 공통 shell.
 * 디자인 1:1: docs/{cat}/index.md 의 Linear projects-table 구조 그대로.
 */
export function CategoryListPage({ config, articles }: Props) {
  const tabs = [
    { label: config.pageTitle, href: `/${config.slug}/`, variant: "strong" as const },
    { label: config.activeTabLabel, href: `/${config.slug}/`, variant: "active" as const },
    ...config.extraTabs,
  ];

  return (
    <LinearShell activeKeys={config.activeKeys}>
      <ProjectChrome title={config.chromeTitle} />
      <ProjectTabs
        tabs={tabs}
        primaryActionLabel={config.primaryActionLabel}
        primaryActionHref="/notice/"
      />
      <FilterRow />
      <section className="projects-table" aria-label={config.ariaLabel}>
        <TableHead />
        <QuarterRow label={config.quarterLabel} />
        {articles.map((a) => (
          <ArticleProjectRow key={a.slug} article={a} />
        ))}
      </section>
    </LinearShell>
  );
}

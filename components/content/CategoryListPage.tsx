import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { FilterableArticleTable } from "./FilterableArticleTable";
import { categoryTabs, type CategoryConfig } from "@/lib/content/categories";
import { getAuthors } from "@/lib/content/loader";
import type { ArticleSummary } from "@/lib/content/types";

interface Props {
  config: CategoryConfig;
  articles: ArticleSummary[];
}

/**
 * 5개 카테고리 인덱스 페이지의 공통 shell.
 * 단일 카테고리이므로 카테고리 컬럼/필터 칩은 숨기고 검색만 노출.
 */
export async function CategoryListPage({ config, articles }: Props) {
  const authors = await getAuthors();
  return (
    <LinearShell activeKeys={config.activeKeys}>
      <ProjectChrome title={config.chromeTitle} />
      <ProjectTabs
        tabs={categoryTabs(config.slug)}
        showDisplay={false}
      />
      <FilterableArticleTable
        articles={articles}
        authors={authors}
        lockedCategory={config.slug}
        sectionLabel={config.sectionLabel}
        emptyMessage={config.emptyMessage}
      />
    </LinearShell>
  );
}

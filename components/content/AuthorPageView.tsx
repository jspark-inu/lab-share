import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { FilterRow } from "@/components/linear/FilterRow";
import { SortableProjectsTable } from "@/components/linear/SortableProjectsTable";
import { articleToProjectRowProps } from "./ArticleProjectRow";
import type { ArticleSummary, AuthorRecord } from "@/lib/content/types";

interface Props {
  author: AuthorRecord;
  articles: ArticleSummary[];
}

/**
 * 작성자 페이지 — author 의 published items.
 * 정렬은 SortableProjectsTable 에서 처리 — 디자인 변경 0.
 */
export function AuthorPageView({ author, articles }: Props) {
  const rows = articles.map((a) =>
    articleToProjectRowProps({
      article: a,
      override: { leadOverride: author.initials },
      useAuthorPageMode: true,
    }),
  );

  return (
    <LinearShell activeKeys={[]}>
      <ProjectChrome title={`◇ ${author.name}`} />
      <ProjectTabs
        tabs={[
          { label: author.name, href: `/authors/${author.id}/`, variant: "strong" },
          {
            label: "◇ Published items",
            href: `/authors/${author.id}/`,
            variant: "active",
          },
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects/" },
          { label: "Tags", href: "/tags/" },
          { label: "GitHub", href: `https://github.com/${author.id}`, variant: "quiet" },
        ]}
        showDisplay={false}
      />
      <FilterRow />
      <SortableProjectsTable
        groups={[{ label: `${author.name} · Published`, rows }]}
        ariaLabel="Author table"
      />
    </LinearShell>
  );
}

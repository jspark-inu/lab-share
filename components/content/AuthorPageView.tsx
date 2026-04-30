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
 * 작성자 페이지 — Linear "Teams" UI.
 * 현 docs/authors/jspark-inu.md 를 1:1 재현하되, 글 목록은 동적으로.
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
    <LinearShell activeKeys={["teams"]}>
      <ProjectChrome title="◇ Team" />
      <ProjectTabs
        tabs={[
          { label: author.name, href: `/authors/${author.id}/`, variant: "strong" },
          {
            label: "◇ Published items",
            href: `/authors/${author.id}/`,
            variant: "active",
          },
          { label: "Projects", href: "/" },
          { label: "Views", href: "/tags/" },
          { label: "GitHub", href: `https://github.com/${author.id}`, variant: "quiet" },
        ]}
        primaryActionLabel="＋ Assign item"
        primaryActionHref="/notice/"
      />
      <FilterRow />
      <SortableProjectsTable
        groups={[{ label: `${author.name} · Published`, rows }]}
        ariaLabel="Author table"
      />
    </LinearShell>
  );
}

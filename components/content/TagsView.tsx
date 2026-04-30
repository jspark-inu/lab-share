import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { FilterRow } from "@/components/linear/FilterRow";
import { SortableProjectsTable } from "@/components/linear/SortableProjectsTable";
import type { ProjectRowProps } from "@/components/linear/ProjectRow";
import type { DotColor, CategorySlug } from "@/lib/content/types";
import type { TagBucket } from "@/lib/content/loader";

interface Props {
  buckets: TagBucket[];
}

const CATEGORY_DOT: Record<CategorySlug, DotColor> = {
  projects: "orange",
  meetings: "amber",
  skills: "cyan",
  wiki: "green",
  notice: "indigo",
};

const CATEGORY_LABEL: Record<CategorySlug, string> = {
  projects: "Projects",
  meetings: "Meetings",
  skills: "Skills",
  wiki: "Wiki",
  notice: "Notice",
};

/**
 * Tags 페이지 — 실제 frontmatter 에서 태그 자동 집계.
 * 디자인 SSOT(.projects-table 6컬럼) 변경 0.
 * 각 row 클릭 시: 그 태그를 가진 가장 최신 글로 직행.
 */
export function TagsView({ buckets }: Props) {
  const rows: ProjectRowProps[] = buckets.map((b) => ({
    href: b.href,
    dot: CATEGORY_DOT[b.category],
    name: `#${b.tag}`,
    meta: `${CATEGORY_LABEL[b.category]} · ${b.count}개 글`,
    health: { label: b.count >= 2 ? "활성" : "단일" },
    priority: b.count >= 3 ? "bars-high" : b.count >= 2 ? "bars" : "muted",
    lead: "JS",
    date: "—",
    status: { value: String(b.count), variant: b.count >= 2 ? "blue" : "default" },
  }));

  return (
    <LinearShell activeKeys={[]}>
      <ProjectChrome title="◇ Tags" />
      <ProjectTabs
        tabs={[
          { label: "Tags", href: "/tags/", variant: "strong" },
          { label: "◇ All tags", href: "/tags/", variant: "active" },
          { label: "Projects", href: "/projects/" },
          { label: "Meetings", href: "/meetings/" },
          { label: "Skills", href: "/skills/" },
          { label: "Wiki", href: "/wiki/" },
          { label: "Notice", href: "/notice/", variant: "quiet" },
        ]}
        showDisplay={false}
      />
      <FilterRow />
      <SortableProjectsTable
        groups={[{ label: "Tags", rows }]}
        ariaLabel="Tags table"
      />
    </LinearShell>
  );
}

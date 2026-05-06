import type { Metadata } from "next";
import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { SortableProjectsTable } from "@/components/linear/SortableProjectsTable";
import { articleToProjectRowProps } from "@/components/content/ArticleProjectRow";
import { getArticleSummariesByCategory } from "@/lib/content/loader";
import { getProjectRecords, projectRecordToRowProps } from "@/lib/content/projectDb";

export const metadata: Metadata = {
  title: "Home",
};

/**
 * Home — Lab Ops Hub 메인 *오버뷰*.
 * 6개 카테고리 최신 글을 같은 6컬럼 row 디자인으로 mix 표시.
 *
 * Active projects 그룹만 db.json + .md 매칭으로 health/priority/statusPct
 * 풍부한 메타 표시. 나머지는 article frontmatter `display:` 블록 그대로.
 *
 * 프로젝트만 깊게 보고 싶으면 → /projects/.
 *
 * 빈 그룹은 자동 제거 — 더미만 있는 초기에는 일부 그룹만 보임.
 */
export default async function HomePage() {
  const [projects, meetings, skills, wiki, notice, resources] = await Promise.all([
    getArticleSummariesByCategory("projects"),
    getArticleSummariesByCategory("meetings"),
    getArticleSummariesByCategory("skills"),
    getArticleSummariesByCategory("wiki"),
    getArticleSummariesByCategory("notice"),
    getArticleSummariesByCategory("resources"),
  ]);

  const projectRecords = await getProjectRecords();
  const articlesBySlug = new Map(projects.map((a) => [a.slug, a]));
  const projectRows = projectRecords
    .map((project) => {
      const article = articlesBySlug.get(project.slug);
      if (!article) return null;
      return projectRecordToRowProps(project, article.title, article.href);
    })
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const toRows = (items: typeof meetings, n: number) =>
    items.slice(0, n).map((a) => articleToProjectRowProps({ article: a }));

  const groups = [
    { label: "Active projects", rows: projectRows },
    { label: "Recent meetings", rows: toRows(meetings, 3) },
    { label: "Recent skills", rows: toRows(skills, 3) },
    { label: "Recent wiki", rows: toRows(wiki, 3) },
    { label: "Recent notice", rows: toRows(notice, 3) },
    { label: "Recent resources", rows: toRows(resources, 5) },
  ].filter((g) => g.rows.length > 0);

  return (
    <LinearShell activeKeys={["home"]}>
      <ProjectChrome title="◇ Lab Ops Hub" />

      <ProjectTabs
        tabs={[
          { label: "Home", href: "/", variant: "strong" },
          { label: "◇ Overview", href: "/", variant: "active" },
          { label: "Projects", href: "/projects/" },
          { label: "Meetings", href: "/meetings/" },
          { label: "Skills", href: "/skills/" },
          { label: "Wiki", href: "/wiki/" },
          { label: "Notice", href: "/notice/", variant: "quiet" },
          { label: "Resources", href: "/resources/", variant: "quiet" },
        ]}
        showDisplay={false}
      />

      <SortableProjectsTable
        groups={groups}
        ariaLabel="Lab Ops Hub overview"
      />
    </LinearShell>
  );
}

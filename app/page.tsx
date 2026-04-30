import type { Metadata } from "next";
import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { FilterableArticleTable } from "@/components/content/FilterableArticleTable";
import { CategoryGrid } from "@/components/content/CategoryGrid";
import {
  getAllArticleSummaries,
  getCategoryCounts,
  getAuthors,
} from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Home",
};

const HOME_RECENT_LIMIT = 12;

/**
 * 홈 — 진짜 랜딩.
 *  1. Hero  (다시 만들지 말고, 공유하자)
 *  2. Filter + Recent (실제 글, 최근 12개)
 *  3. Category overview (5 카드, 글 수 표시)
 */
export default async function HomePage() {
  const [allArticles, categoryCounts, authors] = await Promise.all([
    getAllArticleSummaries(),
    getCategoryCounts(),
    getAuthors(),
  ]);
  const recent = allArticles.slice(0, HOME_RECENT_LIMIT);

  return (
    <LinearShell activeKeys={["home"]}>
      <ProjectChrome title="HAI Lab Share" />

      <ProjectTabs
        tabs={[
          { label: "Home", href: "/", variant: "strong" },
          { label: "Recent", href: "/", variant: "active" },
          { label: "Tags", href: "/tags/" },
          { label: "Author", href: "/authors/jspark-inu/", variant: "quiet" },
        ]}
        showDisplay={false}
      />

      <section className="lab-hero" aria-label="Welcome">
        <h1>다시 만들지 말고, <strong>공유하자</strong>.</h1>
        <p>
          인천대 HAI 연구실 내부 지식 공유 허브.
          AI가 큐레이션·작성한 글에 학부생이 댓글로 반응하며 배웁니다.
          모바일에서 한 곳에 모아 보세요.
        </p>
      </section>

      <FilterableArticleTable
        articles={recent}
        authors={authors}
        sectionLabel={`Recent · 최근 ${recent.length}개`}
        emptyMessage="아직 작성된 글이 없어요"
      />

      <CategoryGrid counts={categoryCounts} />
    </LinearShell>
  );
}

import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { ArticleTableHead, SectionRow } from "./ArticleTableHead";
import { ArticleRow } from "./ArticleRow";
import type { ArticleSummary, AuthorRecord } from "@/lib/content/types";

interface Props {
  author: AuthorRecord;
  articles: ArticleSummary[];
  authors: Record<string, AuthorRecord>;
}

/**
 * 작성자 페이지 — 단일 author 의 글 목록 + 프로필 카드.
 */
export function AuthorPageView({ author, articles, authors }: Props) {
  return (
    <LinearShell activeKeys={["authors"]}>
      <ProjectChrome title={`▣ ${author.name}`} />
      <ProjectTabs
        tabs={[
          { label: author.name, href: `/authors/${author.id}/`, variant: "active" },
          { label: "Home", href: "/" },
          { label: "Tags", href: "/tags/" },
          {
            label: "GitHub",
            href: `https://github.com/${author.id}`,
            variant: "quiet",
          },
        ]}
        showDisplay={false}
      />
      <section className="projects-table" aria-label={`Articles by ${author.name}`}>
        <ArticleTableHead showCategory={true} />
        <SectionRow
          label={`${author.name} · Published`}
          count={articles.length}
        />
        {articles.length === 0 ? (
          <div className="filter-empty">아직 게시한 글이 없어요</div>
        ) : (
          articles.map((a) => (
            <ArticleRow
              key={`${a.category}-${a.slug}`}
              article={a}
              showCategory={true}
              authorInitials={author.initials}
            />
          ))
        )}
      </section>
    </LinearShell>
  );
}

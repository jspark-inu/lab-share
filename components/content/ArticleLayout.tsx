import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { CATEGORY_CONFIG } from "@/lib/content/categories";
import type { Article } from "@/lib/content/types";

interface Props {
  article: Article;
  html: string;
}

/**
 * 개별 글 본문 페이지.
 * 좌측 rail = 해당 카테고리의 active 표시.
 * 가운데 = chrome + 단일 active 탭(글 카테고리) + filter row 없이 본문.
 * 본문 컨테이너는 .linear-article-page (extra.css 정의됨).
 * giscus 위젯은 GiscusEmbed 컴포넌트가 본문 하단에 client-side 마운트 (Phase 3).
 */
export function ArticleLayout({ article, html }: Props) {
  const config = CATEGORY_CONFIG[article.category];

  const tabs = [
    { label: config.pageTitle, href: `/${config.slug}/`, variant: "strong" as const },
    { label: "◇ Article", href: article.href, variant: "active" as const },
    { label: "Back to list", href: `/${config.slug}/` },
    { label: "Tags", href: "/tags/", variant: "quiet" as const },
  ];

  return (
    <LinearShell activeKeys={config.activeKeys}>
      <ProjectChrome title={config.chromeTitle} />
      <ProjectTabs
        tabs={tabs}
        primaryActionLabel="＋ Comment"
        primaryActionHref={`${article.href}#__comments`}
      />
      <article className="linear-article-page md-typeset">
        <div
          className="linear-article-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {/* Phase 3: GiscusEmbed will mount here */}
      </article>
    </LinearShell>
  );
}

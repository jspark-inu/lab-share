import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { articleDescription, getArticle, getCategorySlugs } from "@/lib/content/loader";
import { renderMarkdown } from "@/lib/content/renderer";

const CATEGORY = "wiki" as const;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs(CATEGORY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(CATEGORY, params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: articleDescription(article.body),
  };
}

export default async function WikiArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(CATEGORY, params.slug);
  if (!article) notFound();
  const html = await renderMarkdown(article.body);
  return <ArticleLayout article={article} html={html} />;
}

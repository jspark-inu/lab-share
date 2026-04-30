import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { getArticle, getCategorySlugs } from "@/lib/content/loader";
import { renderMarkdown } from "@/lib/content/renderer";

const CATEGORY = "external-skills" as const;

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
    description: article.display.meta,
  };
}

export default async function ExternalSkillsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(CATEGORY, params.slug);
  if (!article) notFound();
  const html = await renderMarkdown(article.body);
  return <ArticleLayout article={article} html={html} />;
}

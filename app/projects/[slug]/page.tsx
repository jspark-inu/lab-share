import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectLanding } from "@/components/content/ProjectLanding";
import {
  articleDescription,
  getAllArticleSummaries,
  getArticle,
  getCategorySlugs,
} from "@/lib/content/loader";
import { getProjectRecord } from "@/lib/content/projectDb";
import { renderMarkdown } from "@/lib/content/renderer";

const CATEGORY = "projects" as const;

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

export default async function ProjectArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(CATEGORY, params.slug);
  if (!article) notFound();
  const html = await renderMarkdown(article.body);
  const all = await getAllArticleSummaries();
  const tags = new Set(article.tags.map((tag) => String(tag)));
  const related = all.filter((item) => {
    if (item.category === article.category && item.slug === article.slug) return false;
    return item.tags.some((tag) => tags.has(String(tag)));
  });
  const project = await getProjectRecord(article.slug);
  return <ProjectLanding article={article} html={html} related={related} project={project} />;
}

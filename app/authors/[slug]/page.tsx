import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorPageView } from "@/components/content/AuthorPageView";
import {
  getAuthor,
  getAuthors,
  getArticlesByAuthor,
} from "@/lib/content/loader";

export async function generateStaticParams() {
  const all = await getAuthors();
  return Object.keys(all).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const author = await getAuthor(params.slug);
  if (!author) return {};
  return {
    title: author.name,
    description: author.description,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: { slug: string };
}) {
  const author = await getAuthor(params.slug);
  if (!author) notFound();
  const articles = await getArticlesByAuthor(params.slug);
  return <AuthorPageView author={author} articles={articles} />;
}

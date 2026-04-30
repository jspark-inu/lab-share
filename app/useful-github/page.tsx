import type { Metadata } from "next";
import { CategoryListPage } from "@/components/content/CategoryListPage";
import { CATEGORY_CONFIG } from "@/lib/content/categories";
import { getArticleSummariesByCategory } from "@/lib/content/loader";

const config = CATEGORY_CONFIG["useful-github"];

export const metadata: Metadata = {
  title: config.pageTitle,
};

export default async function UsefulGithubIndexPage() {
  const articles = await getArticleSummariesByCategory("useful-github");
  return <CategoryListPage config={config} articles={articles} />;
}

import type { Metadata } from "next";
import { CategoryListPage } from "@/components/content/CategoryListPage";
import { CATEGORY_CONFIG } from "@/lib/content/categories";
import { getArticleSummariesByCategory } from "@/lib/content/loader";

const config = CATEGORY_CONFIG["external-skills"];

export const metadata: Metadata = {
  title: config.pageTitle,
};

export default async function ExternalSkillsIndexPage() {
  const articles = await getArticleSummariesByCategory("external-skills");
  return <CategoryListPage config={config} articles={articles} />;
}

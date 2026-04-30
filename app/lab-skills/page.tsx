import type { Metadata } from "next";
import { CategoryListPage } from "@/components/content/CategoryListPage";
import { CATEGORY_CONFIG } from "@/lib/content/categories";
import { getArticleSummariesByCategory } from "@/lib/content/loader";

const config = CATEGORY_CONFIG["lab-skills"];

export const metadata: Metadata = {
  title: config.pageTitle,
};

export default async function LabSkillsIndexPage() {
  const articles = await getArticleSummariesByCategory("lab-skills");
  return <CategoryListPage config={config} articles={articles} />;
}

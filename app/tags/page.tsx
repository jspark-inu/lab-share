import type { Metadata } from "next";
import { TagsView } from "@/components/content/TagsView";
import { getAllArticleSummaries } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Tags",
};

export default async function TagsPage() {
  const articles = await getAllArticleSummaries();
  return <TagsView articles={articles} />;
}

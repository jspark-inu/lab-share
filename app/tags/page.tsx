import type { Metadata } from "next";
import { TagsView } from "@/components/content/TagsView";
import { getTagBuckets } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Tags",
};

export default async function TagsPage() {
  const buckets = await getTagBuckets();
  return <TagsView buckets={buckets} />;
}

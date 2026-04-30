import type { Metadata } from "next";
import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { TagsView } from "@/components/content/TagsView";
import {
  getAllArticleSummaries,
  getAuthors,
  getTagCounts,
} from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Tags",
};

export default async function TagsPage() {
  const [articles, tagBuckets, authors] = await Promise.all([
    getAllArticleSummaries(),
    getTagCounts(),
    getAuthors(),
  ]);

  return (
    <LinearShell activeKeys={["tags"]}>
      <ProjectChrome title="▱ Tags" />
      <ProjectTabs
        tabs={[
          { label: "Tags", href: "/tags/", variant: "active" },
          { label: "Home", href: "/" },
          { label: "News", href: "/news/" },
          { label: "Useful GitHub", href: "/useful-github/" },
          { label: "Lab Skills", href: "/lab-skills/" },
          { label: "External Skills", href: "/external-skills/" },
          { label: "Notice", href: "/notice/", variant: "quiet" },
        ]}
        showDisplay={false}
      />
      <TagsView articles={articles} tagBuckets={tagBuckets} authors={authors} />
    </LinearShell>
  );
}

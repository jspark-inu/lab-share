import type { CategorySlug } from "./types";
import type { TabSpec } from "@/components/linear/ProjectTabs";
import type { RailNavKey } from "@/components/linear/LinearRail";

export interface CategoryConfig {
  slug: CategorySlug;
  /** 사이드바·탭에 표시되는 짧은 이름 ("News") */
  pageTitle: string;
  /** 페이지 chrome 가운데 표시 ("◇ News") */
  chromeTitle: string;
  /** 활성 탭 라벨 ("◇ All signals") */
  activeTabLabel: string;
  /** 활성 탭 외에 보일 탭들 (Projects/Notice/Tags 등) */
  extraTabs: TabSpec[];
  /** "＋ Add signal" 같은 우측 액션 라벨 */
  primaryActionLabel: string;
  /** quarter row 라벨 ("Signals", "Tooling", "Research Ops" 등) */
  quarterLabel: string;
  /** projects-table 의 aria-label */
  ariaLabel: string;
  /** rail 에서 active 표시할 nav 키들 (여러 개) */
  activeKeys: RailNavKey[];
}

export const CATEGORY_CONFIG: Record<CategorySlug, CategoryConfig> = {
  news: {
    slug: "news",
    pageTitle: "News",
    chromeTitle: "◇ News",
    activeTabLabel: "◇ All signals",
    extraTabs: [
      { label: "Projects", href: "/" },
      { label: "Notice", href: "/notice/" },
      { label: "Tags", href: "/tags/", variant: "quiet" },
    ],
    primaryActionLabel: "＋ Add signal",
    quarterLabel: "Signals",
    ariaLabel: "News table",
    activeKeys: ["pulse", "initiatives"],
  },
  "useful-github": {
    slug: "useful-github",
    pageTitle: "Useful GitHub",
    chromeTitle: "◇ Useful GitHub",
    activeTabLabel: "◇ All tools",
    extraTabs: [
      { label: "Lab Skills", href: "/lab-skills/" },
      { label: "Workflows", href: "/external-skills/" },
      { label: "Tags", href: "/tags/", variant: "quiet" },
    ],
    primaryActionLabel: "＋ Add tool",
    quarterLabel: "Tooling",
    ariaLabel: "Useful GitHub table",
    activeKeys: ["tooling"],
  },
  "lab-skills": {
    slug: "lab-skills",
    pageTitle: "Lab Skills",
    chromeTitle: "◇ Lab Skills",
    activeTabLabel: "◇ All skills",
    extraTabs: [
      { label: "Tooling", href: "/useful-github/" },
      { label: "Workflows", href: "/external-skills/" },
      { label: "Tags", href: "/tags/", variant: "quiet" },
    ],
    primaryActionLabel: "＋ Suggest skill",
    quarterLabel: "Research Ops",
    ariaLabel: "Lab skills table",
    activeKeys: ["myissues", "research-ops"],
  },
  "external-skills": {
    slug: "external-skills",
    pageTitle: "External Skills",
    chromeTitle: "◇ External Skills",
    activeTabLabel: "◇ All workflows",
    extraTabs: [
      { label: "Lab Skills", href: "/lab-skills/" },
      { label: "Tooling", href: "/useful-github/" },
      { label: "Tags", href: "/tags/", variant: "quiet" },
    ],
    primaryActionLabel: "＋ Suggest workflow",
    quarterLabel: "Workflows",
    ariaLabel: "External skills table",
    activeKeys: ["workflows"],
  },
  notice: {
    slug: "notice",
    pageTitle: "Notice",
    chromeTitle: "◇ Notice",
    activeTabLabel: "◇ All notices",
    extraTabs: [
      { label: "Projects", href: "/" },
      { label: "Signals", href: "/news/" },
      { label: "Tags", href: "/tags/", variant: "quiet" },
    ],
    primaryActionLabel: "＋ Create notice",
    quarterLabel: "Inbox",
    ariaLabel: "Notice table",
    activeKeys: ["inbox", "more"],
  },
};

export const CATEGORY_SLUGS: CategorySlug[] = [
  "news",
  "useful-github",
  "lab-skills",
  "external-skills",
  "notice",
];

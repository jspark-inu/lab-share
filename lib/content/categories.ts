import type { CategorySlug } from "./types";
import type { TabSpec } from "@/components/linear/ProjectTabs";
import type { RailNavKey } from "@/components/linear/LinearRail";

export interface CategoryConfig {
  slug: CategorySlug;
  /** 사이드바·탭에 표시되는 짧은 이름 ("Projects") */
  pageTitle: string;
  /** 페이지 chrome 가운데 표시 ("◇ Projects") */
  chromeTitle: string;
  /** 활성 탭 라벨 ("◇ All projects") */
  activeTabLabel: string;
  /** 활성 탭 외에 보일 탭들 */
  extraTabs: TabSpec[];
  /** 우측 액션 라벨 ("＋ Create project" 등) */
  primaryActionLabel: string;
  /** quarter row 라벨 ("Q3 2026", "Skills", "Wiki" 등) */
  quarterLabel: string;
  /** projects-table 의 aria-label */
  ariaLabel: string;
  /** rail 에서 active 표시할 nav 키들 */
  activeKeys: RailNavKey[];
}

export const CATEGORY_CONFIG: Record<CategorySlug, CategoryConfig> = {
  projects: {
    slug: "projects",
    pageTitle: "Projects",
    chromeTitle: "◇ Projects",
    activeTabLabel: "◇ All projects",
    extraTabs: [
      { label: "Meetings", href: "/meetings/" },
      { label: "Skills", href: "/skills/" },
      { label: "Wiki", href: "/wiki/" },
      { label: "Notice", href: "/notice/", variant: "quiet" },
    ],
    primaryActionLabel: "＋ Track project",
    quarterLabel: "Active",
    ariaLabel: "Projects table",
    activeKeys: ["projects"],
  },
  meetings: {
    slug: "meetings",
    pageTitle: "Meetings",
    chromeTitle: "◇ Meetings",
    activeTabLabel: "◇ All meetings",
    extraTabs: [
      { label: "Projects", href: "/projects/" },
      { label: "Skills", href: "/skills/" },
      { label: "Wiki", href: "/wiki/" },
      { label: "Notice", href: "/notice/", variant: "quiet" },
    ],
    primaryActionLabel: "＋ Add meeting",
    quarterLabel: "Recent",
    ariaLabel: "Meetings table",
    activeKeys: ["meetings"],
  },
  skills: {
    slug: "skills",
    pageTitle: "Skills",
    chromeTitle: "◇ Skills",
    activeTabLabel: "◇ All skills",
    extraTabs: [
      { label: "Projects", href: "/projects/" },
      { label: "Meetings", href: "/meetings/" },
      { label: "Wiki", href: "/wiki/" },
      { label: "Notice", href: "/notice/", variant: "quiet" },
    ],
    primaryActionLabel: "＋ Share skill",
    quarterLabel: "Shared",
    ariaLabel: "Skills table",
    activeKeys: ["skills"],
  },
  wiki: {
    slug: "wiki",
    pageTitle: "Wiki",
    chromeTitle: "◇ Wiki",
    activeTabLabel: "◇ All entries",
    extraTabs: [
      { label: "Projects", href: "/projects/" },
      { label: "Meetings", href: "/meetings/" },
      { label: "Skills", href: "/skills/" },
      { label: "Notice", href: "/notice/", variant: "quiet" },
    ],
    primaryActionLabel: "＋ New entry",
    quarterLabel: "Knowledge",
    ariaLabel: "Wiki table",
    activeKeys: ["wiki"],
  },
  notice: {
    slug: "notice",
    pageTitle: "Notice",
    chromeTitle: "◇ Notice",
    activeTabLabel: "◇ All notices",
    extraTabs: [
      { label: "Projects", href: "/projects/" },
      { label: "Meetings", href: "/meetings/" },
      { label: "Skills", href: "/skills/" },
      { label: "Wiki", href: "/wiki/", variant: "quiet" },
    ],
    primaryActionLabel: "＋ Create notice",
    quarterLabel: "Active",
    ariaLabel: "Notice table",
    activeKeys: ["notice"],
  },
};

export const CATEGORY_SLUGS: CategorySlug[] = [
  "projects",
  "meetings",
  "skills",
  "wiki",
  "notice",
];

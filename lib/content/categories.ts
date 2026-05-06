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

/**
 * 한 카테고리에서 다른 카테고리로 이동할 수 있는 탭 셋.
 * 본인을 제외한 5개를 표시. notice/resources 는 quiet variant 로 약하게.
 */
const TAB_PROJECTS: TabSpec = { label: "Projects", href: "/projects/" };
const TAB_MEETINGS: TabSpec = { label: "Meetings", href: "/meetings/" };
const TAB_SKILLS: TabSpec = { label: "Skills", href: "/skills/" };
const TAB_WIKI: TabSpec = { label: "Wiki", href: "/wiki/" };
const TAB_NOTICE: TabSpec = { label: "Notice", href: "/notice/", variant: "quiet" };
const TAB_RESOURCES: TabSpec = { label: "Resources", href: "/resources/", variant: "quiet" };

export const CATEGORY_CONFIG: Record<CategorySlug, CategoryConfig> = {
  projects: {
    slug: "projects",
    pageTitle: "Projects",
    chromeTitle: "◇ Projects",
    activeTabLabel: "◇ All projects",
    extraTabs: [TAB_MEETINGS, TAB_SKILLS, TAB_WIKI, TAB_NOTICE, TAB_RESOURCES],
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
    extraTabs: [TAB_PROJECTS, TAB_SKILLS, TAB_WIKI, TAB_NOTICE, TAB_RESOURCES],
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
    extraTabs: [TAB_PROJECTS, TAB_MEETINGS, TAB_WIKI, TAB_NOTICE, TAB_RESOURCES],
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
    extraTabs: [TAB_PROJECTS, TAB_MEETINGS, TAB_SKILLS, TAB_NOTICE, TAB_RESOURCES],
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
    extraTabs: [TAB_PROJECTS, TAB_MEETINGS, TAB_SKILLS, TAB_WIKI, TAB_RESOURCES],
    primaryActionLabel: "＋ Create notice",
    quarterLabel: "Active",
    ariaLabel: "Notice table",
    activeKeys: ["notice"],
  },
  resources: {
    slug: "resources",
    pageTitle: "Resources",
    chromeTitle: "◫ Resources",
    activeTabLabel: "◫ All resources",
    extraTabs: [TAB_PROJECTS, TAB_MEETINGS, TAB_SKILLS, TAB_WIKI, TAB_NOTICE],
    primaryActionLabel: "＋ Add resource",
    quarterLabel: "Curated",
    ariaLabel: "Resources table",
    activeKeys: ["resources"],
  },
};

export const CATEGORY_SLUGS: CategorySlug[] = [
  "projects",
  "meetings",
  "skills",
  "wiki",
  "notice",
  "resources",
];

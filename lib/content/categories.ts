import type { CategorySlug } from "./types";
import type { TabSpec } from "@/components/linear/ProjectTabs";
import type { RailNavKey } from "@/components/linear/LinearRail";

export interface CategoryConfig {
  slug: CategorySlug;
  /** 사이드바·탭에 표시되는 이름 ("News") */
  pageTitle: string;
  /** 페이지 chrome 가운데 표시 (글리프 + 이름) */
  chromeTitle: string;
  /** 우측 액션 라벨 (보통 "＋ Submit idea") */
  primaryActionLabel: string;
  /** 글 그룹 헤더 라벨 (예: "All articles") */
  sectionLabel: string;
  /** rail 에서 active 표시할 nav 키 — 카테고리 슬러그 그대로 */
  activeKeys: RailNavKey[];
  /** 빈 상태 메시지 */
  emptyMessage: string;
  /** 한 줄 설명 — chrome 아래 작은 글씨 (선택) */
  description?: string;
}

export const CATEGORY_CONFIG: Record<CategorySlug, CategoryConfig> = {
  news: {
    slug: "news",
    pageTitle: "News",
    chromeTitle: "↯ News",
    primaryActionLabel: "＋ Submit idea",
    sectionLabel: "All news",
    activeKeys: ["news"],
    emptyMessage: "아직 News 글이 없어요",
    description: "학과·업계 시그널, 큰 흐름.",
  },
  "useful-github": {
    slug: "useful-github",
    pageTitle: "Useful GitHub",
    chromeTitle: "◆ Useful GitHub",
    primaryActionLabel: "＋ Submit repo",
    sectionLabel: "All tools",
    activeKeys: ["useful-github"],
    emptyMessage: "추천할 repo가 아직 없어요",
    description: "랩에서 실제로 써본 오픈소스.",
  },
  "lab-skills": {
    slug: "lab-skills",
    pageTitle: "Lab Skills",
    chromeTitle: "◇ Lab Skills",
    primaryActionLabel: "＋ Suggest skill",
    sectionLabel: "All skills",
    activeKeys: ["lab-skills"],
    emptyMessage: "Lab Skills 글이 아직 없어요",
    description: "내부 노하우 — 환경 세팅·워크플로우·디버깅.",
  },
  "external-skills": {
    slug: "external-skills",
    pageTitle: "External Skills",
    chromeTitle: "▣ External Skills",
    primaryActionLabel: "＋ Suggest tool",
    sectionLabel: "All workflows",
    activeKeys: ["external-skills"],
    emptyMessage: "External Skills 글이 아직 없어요",
    description: "외부 도구·서비스 활용 가이드.",
  },
  notice: {
    slug: "notice",
    pageTitle: "Notice",
    chromeTitle: "⌂ Notice",
    primaryActionLabel: "＋ Add notice",
    sectionLabel: "All notices",
    activeKeys: ["notice"],
    emptyMessage: "공지가 아직 없어요",
    description: "공지·안내·일정.",
  },
};

export const CATEGORY_SLUGS: CategorySlug[] = [
  "news",
  "useful-github",
  "lab-skills",
  "external-skills",
  "notice",
];

/**
 * 카테고리 페이지에서 쓰는 공통 탭 구성:
 *   현재 카테고리(strong + active) + 나머지 4 카테고리 + Tags
 */
export function categoryTabs(current: CategorySlug): TabSpec[] {
  const tabs: TabSpec[] = [
    {
      label: CATEGORY_CONFIG[current].pageTitle,
      href: `/${current}/`,
      variant: "active",
    },
  ];
  for (const slug of CATEGORY_SLUGS) {
    if (slug === current) continue;
    tabs.push({ label: CATEGORY_CONFIG[slug].pageTitle, href: `/${slug}/` });
  }
  tabs.push({ label: "Tags", href: "/tags/", variant: "quiet" });
  return tabs;
}

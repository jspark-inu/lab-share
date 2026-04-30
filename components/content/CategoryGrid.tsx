import Link from "next/link";
import { CATEGORY_SLUGS } from "@/lib/content/categories";
import type { CategorySlug } from "@/lib/content/types";

const META: Record<CategorySlug, { glyph: string; name: string; desc: string }> = {
  news: {
    glyph: "↯",
    name: "News",
    desc: "학과·업계 시그널, 큰 흐름. 빠르게 짚고 가는 카테고리.",
  },
  "useful-github": {
    glyph: "◆",
    name: "Useful GitHub",
    desc: "랩에서 실제로 써본 오픈소스/라이브러리. 깔끔한 한 줄 평 + 링크.",
  },
  "lab-skills": {
    glyph: "◇",
    name: "Lab Skills",
    desc: "내부 노하우 — 환경 세팅, 워크플로우, 디버깅 패턴.",
  },
  "external-skills": {
    glyph: "▣",
    name: "External Skills",
    desc: "외부 도구·서비스 활용 가이드. Claude Code, Cursor, n8n 등.",
  },
  notice: {
    glyph: "⌂",
    name: "Notice",
    desc: "공지·안내. 주차 계획, 일정, 이벤트.",
  },
};

interface Props {
  counts: Record<CategorySlug, number>;
}

export function CategoryGrid({ counts }: Props) {
  return (
    <section className="category-grid" aria-label="Categories overview">
      {CATEGORY_SLUGS.map((slug) => {
        const m = META[slug];
        return (
          <Link key={slug} href={`/${slug}/`} className="category-card">
            <div className="cc-head">
              <span className="cc-glyph" aria-hidden="true">
                {m.glyph}
              </span>
              <span className="cc-name">{m.name}</span>
              <span className="cc-count">{counts[slug] ?? 0}개</span>
            </div>
            <p>{m.desc}</p>
          </Link>
        );
      })}
    </section>
  );
}

import {
  ProjectRow,
  type ProjectRowProps,
  type DotColor,
  type HealthVariant,
  type PriorityVariant,
  type StatusVariant,
} from "@/components/linear/ProjectRow";
import type { ArticleSummary } from "@/lib/content/types";

/**
 * frontmatter `display:` 블록의 expected shape — types.ts 에선 unknown 으로
 * 받지만 row 매핑 시점에 narrow.
 */
interface ArticleDisplay {
  dot: DotColor;
  meta?: string;
  health: { label: string; variant?: HealthVariant };
  priority: PriorityVariant;
  lead: string;
  date: string;
  status: { value: string; variant?: StatusVariant };
  authorPageDate?: string;
  authorPageMeta?: string;
}

interface Props {
  article: ArticleSummary;
  /** 작성자 페이지에선 dot/meta 가 다름 → override 가능 */
  override?: {
    dot?: DotColor;
    meta?: string;
    date?: string;
    leadOverride?: string;
  };
  /** 작성자 페이지에선 작성자 이니셜이 lead 자리 */
  useAuthorPageMode?: boolean;
}

/**
 * ArticleSummary + override → ProjectRowProps 매핑.
 * 정렬 테이블에 array 로 넘기기 위해 컴포넌트 외부에서도 호출 가능.
 */
export function articleToProjectRowProps({
  article,
  override,
  useAuthorPageMode = false,
}: Props): ProjectRowProps {
  const d = (article.display ?? {}) as Partial<ArticleDisplay>;
  const dot: DotColor = override?.dot ?? d.dot ?? "cyan";
  const meta = useAuthorPageMode
    ? (override?.meta ?? d.authorPageMeta ?? d.meta)
    : (override?.meta ?? d.meta);
  const date = useAuthorPageMode
    ? (override?.date ?? d.authorPageDate ?? d.date ?? "")
    : (override?.date ?? d.date ?? "");

  return {
    href: article.href,
    dot,
    name: article.title,
    meta,
    health: useAuthorPageMode
      ? { label: "Published" }
      : { label: d.health?.label ?? "—", variant: d.health?.variant },
    priority: d.priority ?? "muted",
    lead: override?.leadOverride ?? d.lead ?? "?",
    date,
    status: { value: d.status?.value ?? "—", variant: d.status?.variant },
  };
}

/** ArticleSummary 의 display 메타 → Linear ProjectRow 1 행 렌더. */
export function ArticleProjectRow(props: Props) {
  return <ProjectRow {...articleToProjectRowProps(props)} />;
}

import { ProjectRow, type ProjectRowProps } from "@/components/linear/ProjectRow";
import type { ArticleSummary } from "@/lib/content/types";

interface Props {
  article: ArticleSummary;
  /** 작성자 페이지에선 dot/meta 가 다름 → override 가능 */
  override?: {
    dot?: ArticleSummary["display"]["dot"];
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
  const d = article.display;
  const dot = override?.dot ?? d.dot;
  const meta = useAuthorPageMode
    ? (override?.meta ?? d.authorPageMeta ?? d.meta)
    : (override?.meta ?? d.meta);
  const date = useAuthorPageMode
    ? (override?.date ?? d.authorPageDate ?? d.date)
    : (override?.date ?? d.date);

  return {
    href: article.href,
    dot,
    name: article.title,
    meta,
    health: useAuthorPageMode
      ? { label: "Published" }
      : { label: d.health.label, variant: d.health.variant },
    priority: d.priority,
    lead: override?.leadOverride ?? d.lead,
    date,
    status: { value: d.status.value, variant: d.status.variant },
  };
}

/**
 * ArticleSummary 의 display 메타 → Linear ProjectRow 1 행 렌더.
 * (정렬 OFF 분기 그룹 페이지가 직접 호출하는 path 가 더 있을 수 있어 유지)
 */
export function ArticleProjectRow(props: Props) {
  return <ProjectRow {...articleToProjectRowProps(props)} />;
}

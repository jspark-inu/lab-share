import { ProjectRow } from "@/components/linear/ProjectRow";
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
 * ArticleSummary 의 display 메타 → Linear ProjectRow props 매핑.
 * 카테고리 인덱스 / 작성자 페이지 / 태그 페이지에서 공통으로 쓴다.
 */
export function ArticleProjectRow({
  article,
  override,
  useAuthorPageMode = false,
}: Props) {
  const d = article.display;
  const dot = override?.dot ?? d.dot;
  const meta = useAuthorPageMode
    ? (override?.meta ?? d.authorPageMeta ?? d.meta)
    : (override?.meta ?? d.meta);
  const date = useAuthorPageMode
    ? (override?.date ?? d.authorPageDate ?? d.date)
    : (override?.date ?? d.date);

  return (
    <ProjectRow
      href={article.href}
      dot={dot}
      name={article.title}
      meta={meta}
      health={
        useAuthorPageMode
          ? { label: "Published" }
          : { label: d.health.label, variant: d.health.variant }
      }
      priority={d.priority}
      lead={override?.leadOverride ?? d.lead}
      date={date}
      status={{ value: d.status.value, variant: d.status.variant }}
    />
  );
}

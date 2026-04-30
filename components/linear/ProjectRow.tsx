import Link from "next/link";

export type DotColor =
  | "orange"
  | "green"
  | "cyan"
  | "indigo"
  | "amber"
  | "red"
  | "pink";

export type HealthVariant = "ontrack" | "muted" | "atrisk";

export type PriorityVariant = "bars" | "bars-high" | "muted";

export type StatusVariant = "default" | "gold" | "blue";

export interface ProjectRowProps {
  href: string;
  dot: DotColor;
  name: string;
  meta?: string;
  health: { label: string; variant?: HealthVariant };
  priority: PriorityVariant;
  lead: string;
  date: string;
  status: { value: string; variant?: StatusVariant };
}

/**
 * 6컬럼 프로젝트 row. extra.css .project-row 1:1.
 * - dot: 좌측 컬러 dot (orange/green/cyan/indigo/amber/red/pink)
 * - health.variant: ontrack(default) | muted(회색) | atrisk(노랑)
 * - priority: bars(3개막대) | bars-high(진하게) | muted(---)
 * - status.variant: default | gold | blue (ring 색상 동기)
 */
export function ProjectRow({
  href,
  dot,
  name,
  meta,
  health,
  priority,
  lead,
  date,
  status,
}: ProjectRowProps) {
  const healthClass = ["health-cell"];
  if (health.variant === "muted") healthClass.push("muted");
  if (health.variant === "atrisk") healthClass.push("at-risk");

  const priorityClass =
    priority === "bars"
      ? "priority-cell bars"
      : priority === "bars-high"
        ? "priority-cell bars high"
        : "priority-cell muted";

  const statusClass = ["status-cell"];
  if (status.variant === "gold") statusClass.push("gold");
  if (status.variant === "blue") statusClass.push("blue");

  return (
    <Link className="project-row" href={href}>
      <div className="name-cell">
        <span className={`project-dot ${dot}`}>●</span>
        <strong>{name}</strong>
        {meta ? <em>{meta}</em> : null}
      </div>
      <div className={healthClass.join(" ")}>
        <span className="spinner"></span>
        {health.label}
      </div>
      <div className={priorityClass}>
        {priority === "muted" ? (
          "---"
        ) : (
          <>
            <i></i>
            <i></i>
            <i></i>
          </>
        )}
      </div>
      <div className="lead-cell">{lead}</div>
      <div className="date-cell">
        <span className="calendar-icon">▣</span>
        {date}
      </div>
      <div className={statusClass.join(" ")}>
        <span className="ring"></span>
        {status.value}
      </div>
    </Link>
  );
}

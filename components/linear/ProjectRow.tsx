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

export type EditableProjectHealth = "on-track" | "at-risk" | "paused";
export type EditableProjectPriority = "high" | "medium" | "low" | "none";

export interface EditableProjectProperties {
  health: EditableProjectHealth;
  priority: EditableProjectPriority;
  lead: string;
  statusPct: number;
}

export interface ProjectRowProps {
  projectSlug?: string;
  href: string;
  dot: DotColor;
  name: string;
  meta?: string;
  health: { label: string; variant?: HealthVariant };
  priority: PriorityVariant;
  lead: string;
  date: string;
  status: { value: string; variant?: StatusVariant };
  propertyValues?: EditableProjectProperties;
  onPropertyChange?: (next: EditableProjectProperties) => void;
}

export function priorityToVariant(priority: EditableProjectPriority): PriorityVariant {
  if (priority === "high") return "bars-high";
  if (priority === "medium") return "bars";
  return "muted";
}

export function healthToDisplay(health: EditableProjectHealth): ProjectRowProps["health"] {
  if (health === "at-risk") return { label: "At risk", variant: "atrisk" };
  if (health === "paused") return { label: "Paused", variant: "muted" };
  return { label: "On track" };
}

export function statusToDisplay(statusPct: number): ProjectRowProps["status"] {
  const variant: StatusVariant =
    statusPct >= 75 ? "blue" : statusPct >= 25 ? "gold" : "default";
  return { value: `${statusPct}%`, variant };
}

export function applyProjectProperties(
  row: ProjectRowProps,
  values: EditableProjectProperties,
): ProjectRowProps {
  return {
    ...row,
    propertyValues: values,
    health: healthToDisplay(values.health),
    priority: priorityToVariant(values.priority),
    lead: values.lead,
    status: statusToDisplay(values.statusPct),
  };
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
  propertyValues,
  onPropertyChange,
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

  const nameCell = (
    <div className="name-cell">
      <span className={`project-dot ${dot}`}>●</span>
      <strong>{name}</strong>
      {meta ? <em>{meta}</em> : null}
    </div>
  );

  if (propertyValues && onPropertyChange) {
    const update = (patch: Partial<EditableProjectProperties>) => {
      onPropertyChange({ ...propertyValues, ...patch });
    };

    return (
      <div className="project-row editable-project-row">
        <Link className="name-cell project-name-link" href={href}>
          <span className={`project-dot ${dot}`}>●</span>
          <strong>{name}</strong>
          {meta ? <em>{meta}</em> : null}
        </Link>
        <select
          className={`project-property-select ${healthClass.join(" ")}`}
          aria-label={`${name} health`}
          value={propertyValues.health}
          onChange={(event) =>
            update({ health: event.target.value as EditableProjectHealth })
          }
        >
          <option value="on-track">On track</option>
          <option value="at-risk">At risk</option>
          <option value="paused">Paused</option>
        </select>
        <select
          className={`project-property-select ${priorityClass}`}
          aria-label={`${name} priority`}
          value={propertyValues.priority}
          onChange={(event) =>
            update({ priority: event.target.value as EditableProjectPriority })
          }
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="none">None</option>
        </select>
        <input
          className="project-property-input lead-cell"
          aria-label={`${name} lead`}
          value={propertyValues.lead}
          onChange={(event) => update({ lead: event.target.value })}
        />
        <div className="date-cell">
          <span className="calendar-icon">▣</span>
          {date}
        </div>
        <select
          className={`project-property-select ${statusClass.join(" ")}`}
          aria-label={`${name} status`}
          value={propertyValues.statusPct}
          onChange={(event) => update({ statusPct: Number(event.target.value) })}
        >
          <option value={0}>0%</option>
          <option value={25}>25%</option>
          <option value={50}>50%</option>
          <option value={75}>75%</option>
          <option value={100}>100%</option>
        </select>
      </div>
    );
  }

  return (
    <Link className="project-row" href={href}>
      {nameCell}
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

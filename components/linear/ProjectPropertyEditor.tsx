"use client";

import { useEffect, useMemo, useState } from "react";
import {
  healthToDisplay,
  statusToDisplay,
  type EditableProjectHealth,
  type EditableProjectPriority,
  type EditableProjectProperties,
} from "./ProjectRow";

const STORAGE_KEY = "lab-share-project-property-overrides:v1";

export type ProjectPropertyOverrides = Record<
  string,
  Partial<EditableProjectProperties>
>;

function clampStatus(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function readOverrides(): ProjectPropertyOverrides {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProjectPropertyOverrides) : {};
  } catch {
    return {};
  }
}

function writeOverrides(next: ProjectPropertyOverrides) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("project-property-overrides:update"));
}

export function mergeProjectProperties(
  initial: EditableProjectProperties,
  override?: Partial<EditableProjectProperties>,
): EditableProjectProperties {
  return {
    health: override?.health ?? initial.health,
    priority: override?.priority ?? initial.priority,
    lead: override?.lead ?? initial.lead,
    statusPct: clampStatus(override?.statusPct ?? initial.statusPct),
  };
}

export function useProjectPropertyOverrides() {
  const [overrides, setOverrides] = useState<ProjectPropertyOverrides>({});

  useEffect(() => {
    const sync = () => setOverrides(readOverrides());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("project-property-overrides:update", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("project-property-overrides:update", sync);
    };
  }, []);

  const setProjectProperties = (
    projectSlug: string,
    next: EditableProjectProperties,
  ) => {
    const current = readOverrides();
    const updated = { ...current, [projectSlug]: next };
    writeOverrides(updated);
    setOverrides(updated);
  };

  const resetProjectProperties = (projectSlug: string) => {
    const current = readOverrides();
    const { [projectSlug]: _removed, ...rest } = current;
    writeOverrides(rest);
    setOverrides(rest);
  };

  return { overrides, setProjectProperties, resetProjectProperties };
}

interface EditorProps {
  projectSlug: string;
  initial: EditableProjectProperties;
  date: string;
  openTasks: number;
  completedTasks: number;
}

const PRIORITY_LABELS: Record<EditableProjectPriority, string> = {
  high: "High priority",
  medium: "Medium priority",
  low: "Low priority",
  none: "No priority",
};

export function ProjectPropertyEditor({
  projectSlug,
  initial,
  date,
  openTasks,
  completedTasks,
}: EditorProps) {
  const [editing, setEditing] = useState(false);
  const { overrides, setProjectProperties, resetProjectProperties } =
    useProjectPropertyOverrides();
  const values = useMemo(
    () => mergeProjectProperties(initial, overrides[projectSlug]),
    [initial, overrides, projectSlug],
  );
  const health = healthToDisplay(values.health);
  const status = statusToDisplay(values.statusPct);

  const update = (patch: Partial<EditableProjectProperties>) => {
    setProjectProperties(projectSlug, { ...values, ...patch });
  };

  return (
    <div
      className={`student-project-meta project-property-inline ${editing ? "editing" : ""}`}
      aria-label="Project properties"
    >
      <span>{date}</span>
      {editing ? (
        <>
          <select
            className="project-meta-select"
            aria-label="Health"
            value={values.health}
            onChange={(event) =>
              update({ health: event.target.value as EditableProjectHealth })
            }
          >
            <option value="on-track">On track</option>
            <option value="at-risk">At risk</option>
            <option value="paused">Paused</option>
          </select>
          <select
            className="project-meta-select"
            aria-label="Priority"
            value={values.priority}
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
            className="project-meta-input"
            aria-label="Lead"
            value={values.lead}
            onChange={(event) => update({ lead: event.target.value })}
          />
          <select
            className="project-meta-select"
            aria-label="Status"
            value={values.statusPct}
            onChange={(event) => update({ statusPct: Number(event.target.value) })}
          >
            <option value={0}>0%</option>
            <option value={25}>25%</option>
            <option value={50}>50%</option>
            <option value={75}>75%</option>
            <option value={100}>100%</option>
          </select>
        </>
      ) : (
        <>
        <span className={`health-cell ${health.variant === "atrisk" ? "at-risk" : health.variant === "muted" ? "muted" : ""}`}>
          <span className="spinner"></span>
          {health.label}
        </span>
        <span>{PRIORITY_LABELS[values.priority]}</span>
        <span>{values.lead}</span>
        <span className={`status-cell ${status.variant === "gold" ? "gold" : status.variant === "blue" ? "blue" : ""}`}>
          <span className="ring"></span>
          {status.value}
        </span>
        </>
      )}
      <span>{openTasks} open tasks</span>
      <span>{completedTasks} completed</span>
      {editing ? (
        <>
        <button type="button" onClick={() => resetProjectProperties(projectSlug)}>
          Reset
        </button>
        <button type="button" onClick={() => setEditing(false)}>
          Done
        </button>
        </>
      ) : (
        <button type="button" onClick={() => setEditing(true)}>
          Edit
        </button>
      )}
    </div>
  );
}

import fs from "node:fs/promises";
import path from "node:path";
import type {
  DotColor,
  HealthVariant,
  PriorityVariant,
  ProjectRowProps,
  StatusVariant,
} from "@/components/linear/ProjectRow";

const DB_PATH = path.join(process.cwd(), "content", "project-db.json");

export type ProjectPriority = "high" | "medium" | "low" | "none";
export type ProjectHealth = "on-track" | "at-risk" | "paused";
export type TaskHorizon = "short" | "medium" | "long";
export type TaskStatus = "todo" | "active" | "done";

export interface TaskRecord {
  slug: string;
  title: string;
  horizon: TaskHorizon;
  status: TaskStatus;
  priority: ProjectPriority;
  owner: string;
  date: string;
  summary: string;
  done: string[];
  next: string[];
}

export interface ProjectRecord {
  slug: string;
  priority: ProjectPriority;
  health: ProjectHealth;
  lead: string;
  targetDate: string;
  statusPct: number;
  dot: DotColor;
  meta: string;
  tasks: TaskRecord[];
}

interface ProjectDb {
  projects: ProjectRecord[];
}

async function readProjectDb(): Promise<ProjectDb> {
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw) as ProjectDb;
}

export async function getProjectRecords(): Promise<ProjectRecord[]> {
  const db = await readProjectDb();
  return db.projects;
}

export async function getProjectRecord(slug: string): Promise<ProjectRecord | null> {
  const projects = await getProjectRecords();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getProjectTask(
  projectSlug: string,
  taskSlug: string,
): Promise<{ project: ProjectRecord; task: TaskRecord } | null> {
  const project = await getProjectRecord(projectSlug);
  if (!project) return null;
  const task = project.tasks.find((item) => item.slug === taskSlug);
  if (!task) return null;
  return { project, task };
}

export function priorityToRowVariant(priority: ProjectPriority): PriorityVariant {
  if (priority === "high") return "bars-high";
  if (priority === "medium") return "bars";
  return "muted";
}

export function healthToRow(project: ProjectRecord): ProjectRowProps["health"] {
  if (project.health === "at-risk") {
    return { label: "At risk", variant: "atrisk" as HealthVariant };
  }
  if (project.health === "paused") {
    return { label: "Paused", variant: "muted" as HealthVariant };
  }
  return { label: "On track" };
}

export function statusToRow(project: ProjectRecord): ProjectRowProps["status"] {
  const variant: StatusVariant = project.statusPct >= 75 ? "blue" : project.statusPct >= 25 ? "gold" : "default";
  return { value: `${project.statusPct}%`, variant };
}

export function projectRecordToRowProps(
  project: ProjectRecord,
  title: string,
  href: string,
): ProjectRowProps {
  return {
    projectSlug: project.slug,
    href,
    dot: project.dot,
    name: title,
    meta: project.meta,
    health: healthToRow(project),
    priority: priorityToRowVariant(project.priority),
    lead: project.lead,
    date: project.targetDate,
    status: statusToRow(project),
    propertyValues: {
      health: project.health,
      priority: project.priority,
      lead: project.lead,
      statusPct: project.statusPct,
    },
  };
}

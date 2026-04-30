import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { GiscusEmbed } from "./GiscusEmbed";
import {
  StudentTaskBoard,
  type ProjectRecord,
  type StudentTask,
} from "./StudentTaskBoard";
import type { ProjectRecord as DbProjectRecord } from "@/lib/content/projectDb";
import type { Article, ArticleSummary } from "@/lib/content/types";

interface Props {
  article: Article;
  html: string;
  related: ArticleSummary[];
  project: DbProjectRecord | null;
}

type Horizon = StudentTask["horizon"];

const HORIZON_LABELS: Record<Horizon, string> = {
  short: "Short",
  medium: "Medium",
  long: "Long",
};

function cleanInlineMarkdown(value: string): string {
  return value
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^[-*]\s+/, "")
    .replace(/^\[[ xX]\]\s+/, "")
    .trim();
}

function sectionHorizon(title: string, fallbackIndex: number): Horizon {
  const lower = title.toLowerCase();
  if (title.includes("단기") || title.includes("短") || lower.includes("short")) return "short";
  if (title.includes("중기") || title.includes("中") || lower.includes("medium")) return "medium";
  if (title.includes("장기") || title.includes("長") || lower.includes("long")) return "long";
  return (["short", "medium", "long"] as Horizon[])[Math.min(fallbackIndex, 2)];
}

function tasksFromProjectRecord(project: DbProjectRecord): StudentTask[] {
  return project.tasks.map((task) => ({
    id: task.slug,
    title: task.title,
    horizon: task.horizon,
    status: task.status,
    source: `${task.owner} · ${task.priority}`,
    href: `/projects/${project.slug}/tasks/${task.slug}/`,
  }));
}

function extractTasks(body: string): StudentTask[] {
  const lines = body.split(/\r?\n/);
  const tasks: StudentTask[] = [];
  let currentHeading = "Project";
  let headingIndex = -1;
  let currentHorizon: Horizon = "short";

  for (const line of lines) {
    const heading = line.match(/^###\s+(.+)/);
    if (heading) {
      currentHeading = cleanInlineMarkdown(heading[1]);
      headingIndex += 1;
      currentHorizon = sectionHorizon(currentHeading, headingIndex);
      continue;
    }

    const bullet = line.match(/^\s*-\s+(\[[ xX]\]\s+)?(.+)/);
    if (!bullet) continue;

    const title = cleanInlineMarkdown(`${bullet[1] ?? ""}${bullet[2]}`);
    if (!title || title.length < 3) continue;

    const checked = /\[[xX]\]/.test(bullet[1] ?? "");
    tasks.push({
      id: `task-${tasks.length}`,
      title,
      horizon: currentHorizon,
      status: checked ? "done" : tasks.length === 0 ? "active" : "todo",
      source: currentHeading || HORIZON_LABELS[currentHorizon],
    });
  }

  return tasks;
}

function buildGoals(tasks: StudentTask[]) {
  return (["short", "medium", "long"] as Horizon[]).map((horizon) => {
    const lane = tasks.filter((task) => task.horizon === horizon);
    return {
      horizon,
      label: HORIZON_LABELS[horizon],
      title: `${HORIZON_LABELS[horizon]} goal`,
      detail: lane[0]?.title ?? "Add project tasks in this horizon.",
      count: lane.length,
    };
  });
}

function recordType(category: ArticleSummary["category"]): ProjectRecord["type"] {
  if (category === "projects") return "project";
  if (category === "meetings") return "meeting";
  if (category === "skills") return "skill";
  return category;
}

function buildRecords(
  article: Article,
  related: ArticleSummary[],
  tasks: StudentTask[],
): ProjectRecord[] {
  const taskRecords = tasks
    .filter((task) => task.status === "done")
    .map((task) => ({
      id: `record-${task.id}`,
      title: task.title,
      type: "task" as const,
      date: article.date,
    }));

  const relatedRecords = related.slice(0, 12).map((item) => ({
    id: `${item.category}-${item.slug}`,
    title: item.title,
    type: recordType(item.category),
    date: item.date,
    href: item.href,
  }));

  return [
    {
      id: "project-created",
      title: article.title,
      type: "project" as const,
      date: article.date,
      href: article.href,
    },
    ...taskRecords,
    ...relatedRecords,
  ];
}

export function ProjectLanding({ article, html, related, project }: Props) {
  const tasks = project ? tasksFromProjectRecord(project) : extractTasks(article.body);
  const goals = buildGoals(tasks);
  const records = buildRecords(article, related, tasks);
  const open = tasks.filter((task) => task.status !== "done").length;
  const done = tasks.length - open;
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <LinearShell activeKeys={["projects"]}>
      <ProjectChrome title="Projects" />
      <ProjectTabs
        tabs={[
          { label: "Projects", href: "/projects/", variant: "strong" },
          { label: "Landing", href: article.href, variant: "active" },
          { label: "Task inbox", href: "#student-tasks" },
          { label: "Records", href: "#student-records", variant: "quiet" },
        ]}
        primaryActionLabel="Comment"
        primaryActionHref={`${article.href}#__comments`}
      />

      <article className="student-project-page">
        <section className="student-project-hero">
          <div>
            <p className="student-eyebrow">Project landing</p>
            <h1>{article.title}</h1>
            <p>
              Project work is organized as goals, student tasks, and records.
              The task inbox below is separate from the professor's private task system.
            </p>
            <div className="student-project-meta">
              <span>{article.date}</span>
              {project ? <span>{project.health}</span> : null}
              {project ? <span>{project.priority} priority</span> : null}
              {project ? <span>lead {project.lead}</span> : null}
              <span>{open} open tasks</span>
              <span>{done} completed</span>
            </div>
          </div>
          <aside className="student-progress-card">
            <span>Progress</span>
            <strong>{progress}%</strong>
            <div className="student-progress-track">
              <div style={{ width: `${progress}%` }} />
            </div>
            <p>{done}/{tasks.length} parsed tasks</p>
          </aside>
        </section>

        <section className="student-goal-flow">
          {goals.map((goal) => (
            <div className={`student-goal-card ${goal.horizon}`} key={goal.horizon}>
              <span>{goal.label}</span>
              <strong>{goal.title}</strong>
              <p>{goal.detail}</p>
              <em>{goal.count} tasks</em>
            </div>
          ))}
        </section>

        <StudentTaskBoard tasks={tasks} records={records} />

        <section className="student-source-section md-typeset">
          <p className="student-eyebrow">Source note</p>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>

        {article.comments !== false ? <GiscusEmbed /> : null}
      </article>
    </LinearShell>
  );
}

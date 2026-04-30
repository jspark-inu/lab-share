import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";
import { ProjectTabs } from "@/components/linear/ProjectTabs";
import { getArticle } from "@/lib/content/loader";
import { getProjectRecords, getProjectTask } from "@/lib/content/projectDb";

export async function generateStaticParams() {
  const projects = await getProjectRecords();
  return projects.flatMap((project) =>
    project.tasks.map((task) => ({
      slug: project.slug,
      task: task.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; task: string };
}): Promise<Metadata> {
  const result = await getProjectTask(params.slug, params.task);
  if (!result) return {};
  return {
    title: `${result.task.title} — ${result.project.slug}`,
    description: result.task.summary,
  };
}

export default async function ProjectTaskPage({
  params,
}: {
  params: { slug: string; task: string };
}) {
  const result = await getProjectTask(params.slug, params.task);
  if (!result) notFound();

  const article = await getArticle("projects", result.project.slug);
  const projectTitle = article?.title ?? result.project.slug;
  const { project, task } = result;

  return (
    <LinearShell activeKeys={["projects"]}>
      <ProjectChrome title="Project task" />
      <ProjectTabs
        tabs={[
          { label: "Projects", href: "/projects/", variant: "strong" },
          { label: projectTitle, href: `/projects/${project.slug}/` },
          { label: "Task", href: `/projects/${project.slug}/tasks/${task.slug}/`, variant: "active" },
        ]}
        primaryActionLabel="Back to project"
        primaryActionHref={`/projects/${project.slug}/`}
      />
      <article className="student-task-page">
        <section className="student-task-hero">
          <p className="student-eyebrow">Task record</p>
          <h1>{task.title}</h1>
          <p>{task.summary}</p>
          <div className="student-project-meta">
            <span>{task.horizon}</span>
            <span>{task.status}</span>
            <span>{task.priority} priority</span>
            <span>owner {task.owner}</span>
            <span>{task.date}</span>
          </div>
        </section>

        <section className="student-task-detail-grid">
          <div className="student-task-detail-card">
            <p className="student-eyebrow">What has been done</p>
            {task.done.length ? (
              <ul>
                {task.done.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : (
              <p className="student-empty">No completed notes yet.</p>
            )}
          </div>
          <div className="student-task-detail-card">
            <p className="student-eyebrow">Next actions</p>
            {task.next.length ? (
              <ul>
                {task.next.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : (
              <p className="student-empty">No next action captured yet.</p>
            )}
          </div>
          <div className="student-task-detail-card">
            <p className="student-eyebrow">Relations</p>
            <dl>
              <dt>Project</dt>
              <dd><a href={`/projects/${project.slug}/`}>{projectTitle}</a></dd>
              <dt>Health</dt>
              <dd>{project.health}</dd>
              <dt>Status</dt>
              <dd>{project.statusPct}%</dd>
            </dl>
          </div>
        </section>
      </article>
    </LinearShell>
  );
}

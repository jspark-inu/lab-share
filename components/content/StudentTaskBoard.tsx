"use client";

import { useMemo, useState } from "react";

export interface StudentTask {
  id: string;
  title: string;
  horizon: "short" | "medium" | "long";
  status: "todo" | "active" | "done";
  source: string;
  href?: string;
}

export interface ProjectRecord {
  id: string;
  title: string;
  type: "project" | "meeting" | "skill" | "wiki" | "notice" | "task" | "resource";
  date: string;
  href?: string;
}

interface Props {
  tasks: StudentTask[];
  records: ProjectRecord[];
}

const HORIZONS: Array<{ key: StudentTask["horizon"]; label: string }> = [
  { key: "short", label: "Short" },
  { key: "medium", label: "Medium" },
  { key: "long", label: "Long" },
];

const STATUS_LABEL: Record<StudentTask["status"], string> = {
  todo: "To do",
  active: "Active",
  done: "Done",
};

function taskFilterLabel(filter: "all" | StudentTask["status"]) {
  return filter === "all" ? "All" : STATUS_LABEL[filter];
}

export function StudentTaskBoard({ tasks, records }: Props) {
  const [taskFilter, setTaskFilter] = useState<"all" | StudentTask["status"]>("all");
  const [recordFilter, setRecordFilter] = useState<"all" | ProjectRecord["type"]>("all");

  const visibleTasks = useMemo(
    () => tasks.filter((task) => taskFilter === "all" || task.status === taskFilter),
    [taskFilter, tasks],
  );
  const visibleRecords = useMemo(
    () => records.filter((record) => recordFilter === "all" || record.type === recordFilter),
    [recordFilter, records],
  );

  const recordTypes = Array.from(new Set(records.map((record) => record.type)));

  return (
    <>
      <section className="student-board-section" id="student-tasks">
        <div className="student-section-head">
          <div>
            <p className="student-eyebrow">Student task inbox</p>
            <h2>Project tasks</h2>
          </div>
          <div className="student-filter-row" aria-label="Task filters">
            {(["all", "active", "todo", "done"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                className={taskFilter === filter ? "active" : ""}
                onClick={() => setTaskFilter(filter)}
              >
                {taskFilterLabel(filter)}
              </button>
            ))}
          </div>
        </div>
        <div className="student-task-lanes">
          {HORIZONS.map((horizon) => {
            const laneTasks = visibleTasks.filter((task) => task.horizon === horizon.key);
            return (
              <article className="student-task-lane" key={horizon.key}>
                <div className="student-lane-head">
                  <span>{horizon.label}</span>
                  <strong>{laneTasks.length}</strong>
                </div>
                <div className="student-task-list">
                  {laneTasks.length ? (
                    laneTasks.map((task) => {
                      const inner = (
                        <>
                          <div className="student-task-title">{task.title}</div>
                          <div className="student-task-meta">
                            <span>{STATUS_LABEL[task.status]}</span>
                            <span>{task.source}</span>
                          </div>
                        </>
                      );
                      return task.href ? (
                        <a className={`student-task-card ${task.status}`} href={task.href} key={task.id}>
                          {inner}
                        </a>
                      ) : (
                        <div className={`student-task-card ${task.status}`} key={task.id}>
                          {inner}
                        </div>
                      );
                    })
                  ) : (
                    <p className="student-empty">No matching tasks.</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="student-board-section" id="student-records">
        <div className="student-section-head">
          <div>
            <p className="student-eyebrow">History</p>
            <h2>Records</h2>
          </div>
          <div className="student-filter-row" aria-label="Record filters">
            <button
              type="button"
              className={recordFilter === "all" ? "active" : ""}
              onClick={() => setRecordFilter("all")}
            >
              All
            </button>
            {recordTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={recordFilter === type ? "active" : ""}
                onClick={() => setRecordFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="student-record-grid">
          {visibleRecords.length ? (
            visibleRecords.map((record) => {
              const inner = (
                <>
                  <div className="student-record-type">{record.type}</div>
                  <div className="student-record-title">{record.title}</div>
                  <div className="student-record-date">{record.date}</div>
                </>
              );
              return record.href ? (
                <a className="student-record-card" href={record.href} key={record.id}>
                  {inner}
                </a>
              ) : (
                <div className="student-record-card" key={record.id}>
                  {inner}
                </div>
              );
            })
          ) : (
            <p className="student-empty">No records for this filter.</p>
          )}
        </div>
      </section>
    </>
  );
}

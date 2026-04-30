"use client";

import { useState } from "react";
import {
  applyProjectProperties,
  ProjectRow,
  type ProjectRowProps,
} from "./ProjectRow";
import {
  mergeProjectProperties,
  useProjectPropertyOverrides,
} from "./ProjectPropertyEditor";
import { TableHead, QuarterRow } from "./TableHead";

export interface SortableGroup {
  /** 분기 라벨 (예: "Q2 2026") */
  label: string;
  rows: ProjectRowProps[];
}

interface Props {
  groups: SortableGroup[];
  /** projects-table aria-label */
  ariaLabel: string;
}

type SortKey = "name" | "health" | "priority" | "lead" | "date" | "status";
type SortDir = "asc" | "desc";

/**
 * 6컬럼 프로젝트 테이블 — 헤더 클릭 시 정렬.
 * 정렬 OFF: 분기 그룹별로 QuarterRow + rows 렌더 (디자인 그대로).
 * 정렬 ON : 모든 row 평탄화 후 단일 그룹("Sorted · {key} {↑|↓}") 으로 렌더.
 *
 * 디자인 SSOT 변경 0:
 *  - .table-head / .project-row / .quarter-row 클래스 그대로
 *  - 헤더 span 안에 ↑/↓ 작은 글자만 추가(정렬 활성 시)
 *  - cursor:pointer 는 inline style (CSS 토큰 안 건드림)
 */
export function SortableProjectsTable({ groups, ariaLabel }: Props) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const { overrides, setProjectProperties } = useProjectPropertyOverrides();
  const effectiveGroups = groups.map((group) => ({
    ...group,
    rows: group.rows.map((row) => {
      if (!row.projectSlug || !row.propertyValues) return row;
      const values = mergeProjectProperties(
        row.propertyValues,
        overrides[row.projectSlug],
      );
      return applyProjectProperties(row, values);
    }),
  }));

  const handleHeaderClick = (key: SortKey) => {
    if (sortKey === key) {
      // 토글: asc → desc → off → asc
      if (sortDir === "asc") setSortDir("desc");
      else {
        setSortKey(null);
        setSortDir("asc");
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const renderGroups = (() => {
    if (!sortKey) return effectiveGroups;
    const allRows = effectiveGroups.flatMap((g) => g.rows);
    const sorted = [...allRows].sort(comparator(sortKey, sortDir));
    return [
      {
        label: `Sorted · ${HEADER_LABEL[sortKey]} ${sortDir === "asc" ? "↑" : "↓"}`,
        rows: sorted,
      },
    ];
  })();

  return (
    <section className="projects-table" aria-label={ariaLabel}>
      <SortableHeader
        sortKey={sortKey}
        sortDir={sortDir}
        onHeaderClick={handleHeaderClick}
      />
      {renderGroups.map((g, i) => (
        <FragmentGroup
          key={`${g.label}-${i}`}
          group={g}
          onPropertyChange={(row, next) => {
            if (row.projectSlug) setProjectProperties(row.projectSlug, next);
          }}
        />
      ))}
    </section>
  );
}

function FragmentGroup({
  group,
  onPropertyChange,
}: {
  group: SortableGroup;
  onPropertyChange: (
    row: ProjectRowProps,
    next: NonNullable<ProjectRowProps["propertyValues"]>,
  ) => void;
}) {
  return (
    <>
      <QuarterRow label={group.label} />
      {group.rows.map((row) => (
        <ProjectRow
          key={`${row.name}-${row.href}`}
          {...row}
          onPropertyChange={
            row.propertyValues ? (next) => onPropertyChange(row, next) : undefined
          }
        />
      ))}
    </>
  );
}

const HEADER_LABEL: Record<SortKey, string> = {
  name: "Name",
  health: "Health",
  priority: "Priority",
  lead: "Lead",
  date: "Target Date",
  status: "Status",
};

interface SortableHeaderProps {
  sortKey: SortKey | null;
  sortDir: SortDir;
  onHeaderClick: (key: SortKey) => void;
}

/**
 * TableHead 와 같은 마크업 — .table-head + 6 span. 클릭 가능 + 정렬 표시만 추가.
 */
function SortableHeader({ sortKey, sortDir, onHeaderClick }: SortableHeaderProps) {
  const cell = (key: SortKey) => {
    const active = sortKey === key;
    const arrow = active ? (sortDir === "asc" ? " ↑" : " ↓") : "";
    return (
      <span
        role="button"
        tabIndex={0}
        aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
        onClick={() => onHeaderClick(key)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onHeaderClick(key);
          }
        }}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        {HEADER_LABEL[key]}
        {arrow}
      </span>
    );
  };

  // TableHead 와 똑같은 .table-head 마크업 — 6 span 순서 그대로
  return (
    <div className="table-head">
      {cell("name")}
      {cell("health")}
      {cell("priority")}
      {cell("lead")}
      {cell("date")}
      {cell("status")}
    </div>
  );
}

/**
 * 정렬용 비교자.
 * - name: 알파벳 (한국어 포함)
 * - health: ontrack < (default) < muted < atrisk 같은 의미 정렬은 어려우므로 label 문자열
 * - priority: bars-high(2) > bars(1) > muted(0)
 * - lead: 알파벳
 * - date: "Q2 2026" 같은 분기 라벨이 들어와도 문자열 비교로 일관됨 (Q2<Q3<Q4)
 * - status: 숫자가 들어 있으면 숫자, 아니면 문자열
 */
function comparator(key: SortKey, dir: SortDir) {
  const sign = dir === "asc" ? 1 : -1;
  return (a: ProjectRowProps, b: ProjectRowProps) => {
    const cmp = (() => {
      switch (key) {
        case "name":
          return a.name.localeCompare(b.name);
        case "health":
          return a.health.label.localeCompare(b.health.label);
        case "priority": {
          const rank = (p: ProjectRowProps["priority"]) =>
            p === "bars-high" ? 2 : p === "bars" ? 1 : 0;
          return rank(a.priority) - rank(b.priority);
        }
        case "lead":
          return a.lead.localeCompare(b.lead);
        case "date":
          return a.date.localeCompare(b.date);
        case "status": {
          const num = (s: string) => {
            const m = /([\d.]+)/.exec(s);
            return m ? parseFloat(m[1]) : Number.NaN;
          };
          const na = num(a.status.value);
          const nb = num(b.status.value);
          if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
          return a.status.value.localeCompare(b.status.value);
        }
      }
    })();
    return cmp * sign;
  };
}

// TableHead 직접 import 가 필요할 수 있어 re-export 안내
export { TableHead };

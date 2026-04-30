/**
 * Projects table 의 컬럼 헤더 (Name / Health / Priority / Lead / Target Date / Status).
 * 6컬럼 그리드는 extra.css 의 .table-head, .project-row 와 동일.
 */
export function TableHead() {
  return (
    <div className="table-head">
      <span>Name</span>
      <span>Health</span>
      <span>Priority</span>
      <span>Lead</span>
      <span>Target Date</span>
      <span>Status</span>
    </div>
  );
}

interface QuarterRowProps {
  label: string;
}

/**
 * 분기 그룹 헤더 (예: "Q2 2026"). 우측에 ＋ 아이콘.
 */
export function QuarterRow({ label }: QuarterRowProps) {
  return (
    <div className="quarter-row">
      <strong>{label}</strong>
      <span>＋</span>
    </div>
  );
}

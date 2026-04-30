/**
 * 글 테이블 컬럼 헤더 — Title / Category / Tags / Author / Date.
 * grid 레이아웃은 .article-table-head / .article-row 가 공유.
 */
export function ArticleTableHead({ showCategory = true }: { showCategory?: boolean }) {
  return (
    <div className="article-table-head">
      <span>Title</span>
      <span>{showCategory ? "Category" : ""}</span>
      <span>Tags</span>
      <span>Author</span>
      <span>Date</span>
    </div>
  );
}

interface SectionRowProps {
  label: string;
  /** 우측에 보일 카운트 (예: "5 글") */
  count?: number;
}

/**
 * 섹션 헤더 — 기존 .quarter-row 스타일 그대로지만 의미는 "글 그룹 라벨".
 * (Q2 2026 같은 분기가 아니라 "최근" / "Notice" / "tag: agent" 같은 의미.)
 */
export function SectionRow({ label, count }: SectionRowProps) {
  return (
    <div className="quarter-row">
      <strong>{label}</strong>
      {typeof count === "number" ? (
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#646864", fontWeight: 600 }}>
          {count}개
        </span>
      ) : (
        <span aria-hidden="true">＋</span>
      )}
    </div>
  );
}

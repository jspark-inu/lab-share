/**
 * Phase 5 skeleton — Coming Soon 플레이스홀더.
 * Linear 디자인 톤 유지. 활성화는 child seed 에서.
 *
 * 사용 시점: dashboard 페이지나 카테고리 인덱스 하단에 surface 한 칸으로
 * 마운트하여 "내부 AI 질문 입력" 자리 마련.
 */
export function ChatBox() {
  return (
    <section
      className="filter-row"
      style={{
        height: "auto",
        padding: "16px 32px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 6,
        borderTop: "1px solid var(--line)",
        borderBottom: "0",
        background: "var(--soft)",
      }}
    >
      <strong style={{ fontSize: 13 }}>＋ Ask the lab</strong>
      <span style={{ fontSize: 12, color: "var(--muted)" }}>
        Coming soon — RAG over Lab Share + Socrates. 활성화 일정은 추후 공지.
      </span>
    </section>
  );
}

import type { Article } from "@/lib/content/types";

interface Props {
  article: Article;
}

/**
 * 자료실(resources) 글 본문 상단에 source_url + attachments 를 박스로 표시.
 * 둘 다 없으면 null 반환 → 다른 카테고리는 그대로 영향 없음.
 *
 * 첨부 경로 규칙: public/resources/files/{name} → /resources/files/{name}
 * 빌드 시 정적 자산으로 그대로 복사됨 (Next.js output: 'export').
 */
export function ResourceMetaBox({ article }: Props) {
  const hasUrl = Boolean(article.source_url);
  const hasAttachments = Array.isArray(article.attachments) && article.attachments.length > 0;
  if (!hasUrl && !hasAttachments) return null;

  return (
    <aside
      className="resource-meta-box"
      style={{
        margin: "0 0 1.5rem 0",
        padding: "0.9rem 1.1rem",
        border: "1px solid var(--line)",
        borderRadius: 8,
        background: "var(--soft)",
        color: "var(--text)",
        fontSize: "0.92rem",
        lineHeight: 1.55,
      }}
    >
      {hasUrl ? (
        <div style={{ marginBottom: hasAttachments ? "0.6rem" : 0 }}>
          <strong style={{ marginRight: 6, color: "var(--text)" }}>↗ 외부 링크</strong>
          <a
            href={article.source_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ wordBreak: "break-all", color: "var(--blue)" }}
          >
            {article.source_url}
          </a>
        </div>
      ) : null}
      {hasAttachments ? (
        <div>
          <strong style={{ marginRight: 6, color: "var(--text)" }}>📎 첨부파일</strong>
          <ul style={{ margin: "0.3rem 0 0 0", paddingLeft: "1.4rem" }}>
            {article.attachments!.map((name) => (
              <li key={name}>
                <a
                  href={`/resources/files/${name}`}
                  download
                  style={{ color: "var(--blue)" }}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}

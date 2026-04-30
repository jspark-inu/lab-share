import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/**
 * Markdown body → HTML string.
 * GFM (tables, fenced code, autolinks) + sanitized inline HTML.
 * 결과는 ArticleLayout 의 dangerouslySetInnerHTML 로 들어간다.
 */
export async function renderMarkdown(body: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(body);
  return String(file);
}

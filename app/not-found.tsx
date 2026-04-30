import Link from "next/link";
import type { Metadata } from "next";
import { LinearShell } from "@/components/linear/LinearShell";
import { ProjectChrome } from "@/components/linear/ProjectChrome";

export const metadata: Metadata = {
  title: "404 — 페이지를 찾을 수 없음",
};

export default function NotFound() {
  return (
    <LinearShell activeKeys={["home"]}>
      <ProjectChrome title="◇ 404" />
      <article className="linear-article-page md-typeset">
        <div className="linear-article-body">
          <h1>404 — 페이지를 찾을 수 없음</h1>
          <p>
            요청한 경로가 존재하지 않거나 이동되었습니다. 좌측 사이드바에서
            카테고리를 골라보세요.
          </p>
          <ul>
            <li>
              <Link href="/">홈으로</Link>
            </li>
            <li>
              <Link href="/news/">News</Link> ·{" "}
              <Link href="/useful-github/">Useful GitHub</Link> ·{" "}
              <Link href="/lab-skills/">Lab Skills</Link> ·{" "}
              <Link href="/external-skills/">External Skills</Link> ·{" "}
              <Link href="/notice/">Notice</Link>
            </li>
            <li>
              <Link href="/tags/">Tags</Link> ·{" "}
              <Link href="/authors/jspark-inu/">박준성</Link>
            </li>
          </ul>
        </div>
      </article>
    </LinearShell>
  );
}

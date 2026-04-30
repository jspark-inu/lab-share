"use client";

import { useEffect, useRef } from "react";

const GISCUS_CONFIG = {
  repo: "jspark-inu/lab-share",
  repoId: "R_kgDOSNzBNw",
  category: "Announcements",
  categoryId: "DIC_kwDOSNzBN84C791E",
};

/**
 * giscus 댓글 위젯 — 글 본문 페이지에만 마운트.
 * 현 docs/javascripts/giscus.js 의 동작을 React 'use client' 컴포넌트로 이식.
 *
 * - 이미 임베드된 경우 중복 방지
 * - 다크모드 토글 시 giscus theme 동기화 (data-md-color-scheme observer)
 * - SSR/hydration 시점에 script 직접 삽입 (next/script 안 씀 — giscus 가
 *   data-* 속성을 처리해서 iframe 만드는 패턴이라 vanilla insertion 더 안전)
 */
export function GiscusEmbed() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // 이미 임베드된 경우 중복 방지 (StrictMode 더블 마운트 대비)
    if (container.querySelector('script[src*="giscus.app"]')) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    const attrs: Record<string, string> = {
      "data-repo": GISCUS_CONFIG.repo,
      "data-repo-id": GISCUS_CONFIG.repoId,
      "data-category": GISCUS_CONFIG.category,
      "data-category-id": GISCUS_CONFIG.categoryId,
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "bottom",
      "data-theme": "preferred_color_scheme",
      "data-lang": "ko",
      crossorigin: "anonymous",
    };
    for (const [k, v] of Object.entries(attrs)) script.setAttribute(k, v);
    script.async = true;
    container.appendChild(script);

    // 다크모드 변경 시 giscus iframe 에 postMessage
    const observer = new MutationObserver(() => {
      const dark =
        document.documentElement.getAttribute("data-color-scheme") === "dark" ||
        document.body.getAttribute("data-md-color-scheme") === "slate";
      const iframe = document.querySelector(
        "iframe.giscus-frame",
      ) as HTMLIFrameElement | null;
      if (!iframe || !iframe.contentWindow) return;
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
        "https://giscus.app",
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-color-scheme", "data-md-color-scheme"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-color-scheme", "data-md-color-scheme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="giscus-section">
      <h2 id="__comments">댓글</h2>
      <div ref={ref} />
    </section>
  );
}

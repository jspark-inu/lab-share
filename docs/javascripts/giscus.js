// AC06: giscus 댓글 위젯 — 글 페이지에만 동적 임베드
// (Jinja partial override가 Material/post template에서 작동 안 해서 JS 우회)
(function () {
  var path = window.location.pathname;

  // 글 페이지 패턴: /<카테고리>/<2026-04-XX-제목>/  (또는 trailing slash 없는 형태)
  var postPattern = /^\/(news|useful-github|lab-skills|external-skills|notice)\/[^/]+\/?$/;

  // 카테고리 인덱스(/news/, /useful-github/ 등)는 path에 두 segment 이상 필요 → 글 페이지만 매칭
  // 구체적으로 "/news/" 단독은 매칭 안 됨, "/news/2026-04-27-foo/" 만 매칭
  var segments = path.split('/').filter(function (s) { return s.length > 0; });
  var isPostPage = segments.length === 2 && postPattern.test(path);

  if (!isPostPage) return;

  var article = document.querySelector('article.md-content__inner');
  if (!article) return;

  // 이미 임베드된 경우 중복 방지
  if (article.querySelector('script[src*="giscus.app"]')) return;

  // 댓글 헤더
  var h2 = document.createElement('h2');
  h2.id = '__comments';
  h2.textContent = '댓글';
  article.appendChild(h2);

  // giscus 스크립트
  var script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  var attrs = {
    'data-repo': 'jspark-inu/lab-share',
    'data-repo-id': 'R_kgDOSNzBNw',
    'data-category': 'Announcements',
    'data-category-id': 'DIC_kwDOSNzBN84C791E',
    'data-mapping': 'pathname',
    'data-strict': '0',
    'data-reactions-enabled': '1',
    'data-emit-metadata': '0',
    'data-input-position': 'bottom',
    'data-theme': 'preferred_color_scheme',
    'data-lang': 'ko',
    'crossorigin': 'anonymous'
  };
  Object.keys(attrs).forEach(function (k) { script.setAttribute(k, attrs[k]); });
  script.async = true;
  article.appendChild(script);

  // Material 다크모드 토글 시 giscus 테마 동기화
  var observer = new MutationObserver(function () {
    var dark = document.body.getAttribute('data-md-color-scheme') === 'slate';
    var iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: dark ? 'dark' : 'light' } } },
      'https://giscus.app'
    );
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-md-color-scheme'] });
})();

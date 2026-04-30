interface ProjectChromeProps {
  /** 가운데 표시되는 페이지 타이틀 (예: "◇ Projects", "◇ Notice") */
  title: string;
}

/**
 * 페이지 상단 chrome bar (←→◷ ｜ title ｜ ＋).
 * 디자인 시스템 SSOT: extra.css 의 .project-chrome 1:1.
 */
export function ProjectChrome({ title }: ProjectChromeProps) {
  return (
    <header className="project-chrome">
      <div className="chrome-left">
        <span>←</span>
        <span>→</span>
        <span>◷</span>
      </div>
      <div className="chrome-title">{title}</div>
      <div className="chrome-right">
        <span>＋</span>
      </div>
    </header>
  );
}

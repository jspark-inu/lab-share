import Link from "next/link";

export type TabVariant = "strong" | "active" | "default" | "quiet";

export interface TabSpec {
  label: string;
  href: string;
  variant?: TabVariant;
}

interface ProjectTabsProps {
  /** 좌측 탭 목록. variant 로 스타일 구분 */
  tabs: TabSpec[];
  /** 우측 액션 영역 (＋ Create … / Display 버튼) */
  primaryActionLabel?: string;
  primaryActionHref?: string;
  showDisplay?: boolean;
}

/**
 * 페이지 탭 바. extra.css .project-tabs 1:1.
 * variant 매핑:
 *   strong  → "tab-link strong"  (페이지 이름, 굵게)
 *   active  → "tab-link active"  (현재 활성 탭, 박스)
 *   default → "tab-link"         (보통 탭, 박스)
 *   quiet   → "tab-link quiet"   (회색 텍스트만)
 */
export function ProjectTabs({
  tabs,
  primaryActionLabel,
  primaryActionHref,
  showDisplay = true,
}: ProjectTabsProps) {
  return (
    <section className="project-tabs">
      <div className="tabs-left">
        {tabs.map((t) => {
          const variant = t.variant ?? "default";
          const className =
            variant === "default" ? "tab-link" : `tab-link ${variant}`;
          return (
            <Link key={`${t.label}-${t.href}`} className={className} href={t.href}>
              {t.label}
            </Link>
          );
        })}
      </div>
      {(primaryActionLabel || showDisplay) && (
        <div className="tabs-actions">
          {primaryActionLabel && primaryActionHref ? (
            <Link href={primaryActionHref}>{primaryActionLabel}</Link>
          ) : null}
          {showDisplay ? <button type="button">Display</button> : null}
        </div>
      )}
    </section>
  );
}

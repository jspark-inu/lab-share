---
title: "Sample Project — 예시 프로젝트"
date: 2026-05-06
authors:
  - jspark-inu
tags:
  - sample
display:
  dot: orange
  meta: "예시 · 첫 시작점"
  health:
    label: On track
  priority: bars
  lead: JS
  date: May 6
  status:
    value: 0%
    variant: default
---

# Sample Project

이 카테고리는 **연구실 진행 중 프로젝트**를 트래킹하는 자리입니다. 한 프로젝트당 한 글, 본문에는 동기·완료 기준·현재 상태·다음 할 일을 적습니다.

## 새 프로젝트 추가하는 법

1. `content/projects/{slug}.md` 파일 생성 — 이 글의 frontmatter 복사해서 수정
2. `content/project-db.json` 의 `projects[]` 배열에 같은 `slug` 로 entry 추가 (priority/health/statusPct/tasks 등 상태 메타)
3. push → 자동 배포 → 홈에서 카드로 보임

## 왜 두 파일을 같이?

- `.md` = *콘텐츠 SSOT* (서사·맥락)
- `project-db.json` = *상태 SSOT* (정량 메타 + 작업 목록)

두 파일은 같은 `slug` 로 묶여서 한 카드를 만듭니다.

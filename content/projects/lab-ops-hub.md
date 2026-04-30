---
title: Lab Ops Hub — lab.haiinu.com 운영 허브
date: 2026-04-30
authors:
  - jspark-inu
tags:
  - lab-ops
  - "1E2"
  - infra
display:
  dot: orange
  meta: 운영 허브 자체 · Phase 1
  health:
    label: 진행 중
  priority: bars-high
  lead: JS
  date: 2026-Q2
  status:
    value: 35%
    variant: gold
  authorPageDate: Apr 30
  authorPageMeta: Project
---

# Lab Ops Hub — lab.haiinu.com 운영 허브

> AI가 회의록·진행 상황·스킬·wiki를 한 곳에 모으는 랩 내부 운영 DB.

## 동기

학부생 3명에게 진행 상황 일일이 안 묻고도 "어제 뭐 움직였고 누구한테 신경 쓸지" 30초 안에 보고 싶다. 회의에서 약속한 액션이 어디로 갔는지 추적하고 싶다. 막혔던 문제는 다음 학생이 검색해서 풀 수 있어야 한다.

## 결과물

### 단기 (Phase 1, ~6시간)

- 5 섹션 정체성: Projects / Meetings / Skills / Wiki / Notice
- 사이드바 라벨 정직화 (Path B)
- 홈 dummy 7 row → 실제 프로젝트 보드
- 5 카테고리 글 → 새 구조로 재배치

### 중기 (Phase 2, 자식 seed)

- 학생 입력 폼 + GitHub OAuth + PR 자동 생성 (옵션 A)
- 회의록 GDrive→로컬 LLM→md→push 파이프라인 인입
- Health 컬럼 자동화 (마지막 업데이트 7일↑ 노랑, 14일↑ 빨강)

### 장기 (12개월)

- 회의록 액션 자동 추출 → 프로젝트 row Status% 자동 갱신
- 막힌 부분 wiki 의미 검색 (벡터 DB)
- Workspace.db / 1A 논문 프로젝트 / 1C 인프라 sync

## 운영 원칙

- 디자인 시스템(Linear UI 6컬럼, .linear-rail, .projects-table, 분기 그룹) **변경 금지**.
- 콘텐츠·라벨·href만 진화.
- Phase 별로 자식 seed 분리 — Iron Laws 원칙.

---

> 막힌 부분이나 바라는 기능은 댓글로.

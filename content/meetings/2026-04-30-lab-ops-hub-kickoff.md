---
title: Lab Ops Hub kickoff — 정체성 재정의
date: 2026-04-30
authors:
  - jspark-inu
tags:
  - 회의
  - "1E2"
  - kickoff
display:
  dot: orange
  meta: kickoff · Phase 1 결정
  health:
    label: 완료
  priority: bars
  lead: JS
  date: Apr 30
  status:
    value: 100%
    variant: blue
  authorPageDate: Apr 30
  authorPageMeta: Meeting
---

# Lab Ops Hub kickoff — 정체성 재정의

> 1E2 사이트를 "5 카테고리 글 카탈로그" → "랩 운영 DB + 작업 트래커" 로 재정의한 결정 회의.

## 참석

- 박준성 (PI)
- Claude Code (구현 담당)

## 결론

### 정체성 재정의

기존 5 카테고리(News/Useful Github/Lab Skills/External Skills/Notice)는 **damilab 스타일 글 카탈로그** 였으나, 실제 사용 시나리오는 **랩 운영 DB**. Linear UI의 "Project portfolio" 메타포가 도메인과 일치 — 디자인은 그대로 두고 의미만 재정의.

새 5 섹션:

- **Projects** — 주제별 연구·작업 트래커
- **Meetings** — 회의록 (자동 인입 예정)
- **Skills** — 학생들이 발견·작성한 도구
- **Wiki** — 막힌 부분 누적 + 환경 노하우
- **Notice** — 공지

### 동적 입력은 Phase 2

학생 입력 폼 + GitHub PR 자동 생성 (옵션 A) — Phase 2 자식 seed로 분리. 처음부터 백엔드(옵션 B)는 over-engineering. 학생 사용량 적고 hai_1 운영 도메인 복잡화 위험.

### 디자인 보존 원칙

`globals.css` / `.linear-app` / `.linear-rail` / `.projects-table` / `.project-row` / 6컬럼 grid / 분기 그룹 시각 — **변경 금지**. 텍스트 라벨·href·페이지 구조·콘텐츠 데이터만 진화.

## Action Items

- [ ] Phase 1 구현 (이번 세션 안에 종료)
- [ ] 학생 GitHub 계정 확보 (#연구실 슬랙) — Phase 2 prerequisite
- [ ] 회의록 GDrive→md 파이프라인 설계 — 자식 seed
- [ ] 1E2 roadmap.md 갱신 (Phase 1 완료 후)

---

> 결정 사항에 의문 있으면 댓글로.

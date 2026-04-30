---
title: ABM Meta Analysis 논문 (1A7)
date: 2026-04-30
authors:
  - jspark-inu
tags:
  - 논문
  - "1A7"
  - abm
  - meta-analysis
display:
  dot: amber
  meta: ABM 메타 분석 · Phase 3 Engine
  health:
    label: 실험 중
  priority: bars
  lead: JS
  date: 2026-Q4
  status:
    value: 45%
    variant: blue
  authorPageDate: Apr 30
  authorPageMeta: Project
---

# ABM Meta Analysis 논문 (1A7)

> 다양한 ABM 모델의 패턴을 메타 분석. 학습형 Agent의 churn 동역학.

## 결과물

### 단기 (~1개월)

- Phase 3 Engine 8 모듈 calibration 완료 (현재 50 agents × 30 steps → 68% churn)
- Phase 2 실험 재현 검증

### 중기 (~3개월)

- Leader ablation (RQ2)
- 논문 outline + figures

### 장기 (~6개월)

- 논문 제출 준비

## D17 3원칙 (구현 결정)

- Direction = LLM (safe)
- Magnitude = Rule (Phase 2 공식)
- Narrative = LLM (Call2)

## 의존

- ABM 개발 환경 (Skills)
- LLM = Claude Max CLI 전용 (`claude --print`)
- 1C28 Seed-Loop (Genie 엔진)

---

> 실험 결과 해석에 의문 있으면 댓글로 — 같은 데이터 다른 시각이 reviewer 보다 가치 있음.

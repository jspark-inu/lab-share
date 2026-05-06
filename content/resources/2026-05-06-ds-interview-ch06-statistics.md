---
title: "Ch 6. 통계학 (Statistics)"
date: 2026-05-06
authors:
  - jspark-inu
tags:
  - ds-interview
  - statistics
  - ab-testing
attachments:
  - ch06-statistics.pdf
display:
  dot: pink
  meta: "Ch 6"
  health:
    label: 권장
  priority: muted
  lead: JS
  date: May 6
  status:
    value: "—"
---

# Ch 6. 통계학 (Statistics)

Chapter 6. 가설검정·신뢰구간·A/B 테스트·표본·편향 — 데이터 직무 면접에서 *가장 자주 나오는* 통계 영역.

## 다루는 것

- p-value를 면접관이 만족할 만하게 *말로* 설명하기
- t-test / chi-square / ANOVA 언제 어떤 거 쓰는지
- A/B 테스트 설계: 표본 크기, 통계 검정력, MDE
- 흔한 통계 함정 (다중비교, p-hacking, 생존자 편향)

## 누가 봐야 하는가

- 통계 들었는데 *실무 맥락*에서 적용 자신 없는 학생
- 실험 설계·A/B 테스트 직무 지원 예정인 학생
- 면접에서 "이 분석 어떻게 검증할 건가요?"에 막히는 학생

## 핵심 메시지 미리보기

통계 문제 답할 때 공식 외우는 것보다 *가정 명시* + *결론의 한계* 말하는 게 인상 깊다. "p<0.05이니 차이가 있다"가 아니라 "만약 표본 가정이 맞으면, 우리 데이터 하에서 차이를 우연으로 보기 어렵다"라는 톤.

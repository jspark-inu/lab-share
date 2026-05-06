---
title: "Ch 8. SQL & DB 설계"
date: 2026-05-06
authors:
  - jspark-inu
tags:
  - ds-interview
  - sql
  - database
attachments:
  - ch08-sql-db-design.pdf
display:
  dot: pink
  meta: "Ace the DS Interview · Ch 8"
  health:
    label: 권장
  priority: muted
  lead: JS
  date: May 6
  status:
    value: "—"
---

# Ch 8. SQL & DB 설계

*Ace the Data Science Interview* Chapter 8. 데이터 직무에서 *기본기 검증용*으로 거의 항상 나오는 SQL과 DB 설계 문제.

## 다루는 것

- SQL 핵심 패턴: window function, CTE, self-join, subquery
- 자주 나오는 문제 유형: 누적합·랭킹·연속 발생 감지·N번째 값
- 정규화 vs 비정규화 — 언제 어떤 거
- 인덱스가 빠르게 만드는 원리와 쓰지 말아야 할 때
- 실제 면접에서 자주 출제되는 스키마 설계 문제

## 누가 봐야 하는가

- 학교에서 SQL 배웠는데 *문제로 만들어서* 풀어본 적 적은 학생
- pandas는 익숙한데 SQL은 어색한 학생
- 데이터 분석가·데이터 엔지니어 직무 준비 중인 학생

## 추천 학습 흐름

이 슬라이드로 패턴 익힌 후 **LeetCode SQL 문제 50개** 또는 **Hackerrank SQL** 풀어보면 면접 SQL은 거의 두렵지 않게 됨.

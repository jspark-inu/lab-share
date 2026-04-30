---
title: HAI Lab 맥미니 인프라 (hai_1 · hai_2)
date: 2026-04-30
authors:
  - jspark-inu
tags:
  - infra
  - "1C18"
  - openclaw
display:
  dot: cyan
  meta: 맥미니 2대 · OpenClaw · Tailscale
  health:
    label: 운영 중
  priority: bars
  lead: JS
  date: 2026-Q2
  status:
    value: 80%
    variant: blue
  authorPageDate: Apr 30
  authorPageMeta: Project
---

# HAI Lab 맥미니 인프라 (hai_1 · hai_2)

> AI-Native 연구실 운영을 위한 항상 켜진 인프라. 학생/교수가 어디서든 접근 가능.

## 구성

- **hai_1** (192.168.0.13): Claude Code CLI + Socrates + Research Dashboard 호스트
- **hai_2** (192.168.0.15): OpenClaw 1 Gateway, 에이전트 2개 (교수 비서 + 연구실 도우미), Codex 5.4

## 결과물

### 단기

- Tailscale로 외부 접근 (`https://macmini.tailec5942.ts.net/`)
- 1C14 Dashboard 라이브
- hai_2 OpenClaw 학생 에이전트 운영

### 중기

- api.haiinu.com 백엔드 (Lab Ops Hub Phase 2와 연동)
- Cloudflare Access GitHub OAuth 인증 layer
- 학생별 OpenClaw 인스턴스

### 장기

- 모든 연구 결과물의 reproducibility — Docker / Nix 기반
- 회의록 자동 ingest 파이프라인 (Phase 2)

## 운영 메모

- DHCP IP 자주 바뀜 → SSH config 확인
- knowledge/ RO, insights/ WO — 존 분리 rsync
- 교훈 누적: workspace `00-system/lessons-hai1.md`, `lessons-hai2.md`

---

> 인프라 장애·요청은 댓글 또는 #에이전트병철 슬랙.

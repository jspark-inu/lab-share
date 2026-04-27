---
title: Claude Agent SDK — 에이전트 만들기 시작점
date: 2026-04-27
authors:
  - jspark-inu
tags:
  - github
  - agent
  - claude
---

# Claude Agent SDK — 에이전트 만들기 시작점

> 첫 에이전트를 만든다면 여기서 시작하라.

## 한 줄 요약

`anthropics/claude-agent-sdk-python` — Claude API + 도구 사용 + 메모리 + 멀티턴 루프를 묶어주는 공식 SDK. 에이전트의 *뼈대* 만 제공하고 도메인 로직은 사용자가 채움.

## 왜 이걸로 시작하나

- **공식 지원**: Anthropic이 직접 유지보수 → 모델 업그레이드(Opus 4.7 등) 즉시 반영.
- **얇은 추상화**: LangChain·LangGraph 같은 두꺼운 프레임워크 없이 *어떤 일이 일어나는지* 보임.
- **도구 정의가 명시적**: 함수 시그니처 → 자동 schema. 에이전트가 도구를 *왜* 부르는지 디버깅 쉬움.

## 학부연구생용 첫 과제 추천

1. `pip install claude-agent-sdk` 로 환경 세팅
2. *데이터 한 개 읽고 요약하는* 1-도구 에이전트 (read_file → summarize) 작성
3. 도구 2개로 확장: read_file + write_file → 자동 정리 에이전트
4. 멀티턴 루프 추가 → 사용자 피드백 받는 에이전트

## 함정

- API 키 노출 위험 → `.env` + `.gitignore` 필수.
- 토큰 비용은 *체감 가능한 수준* — 첫 일주일은 한도 알람 걸어두기.
- "더 똑똑한 모델 쓰면 나아지겠지" 함정 → **프롬프트 + 도구 정의** 가 90%, 모델 선택이 10%.

---

> 직접 만들어봤다면 어떤 에이전트인지, 어디서 막혔는지 댓글로.

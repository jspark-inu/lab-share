---
title: "Superpowers — 코딩 에이전트가 먼저 묻고 그다음에 짜게 하는 메타 스킬"
date: 2026-05-07
authors:
  - jspark-inu
tags:
  - external-skill
  - claude-code
  - methodology
display:
  dot: violet
  meta: "외부 스킬 · 메타 워크플로우"
  health:
    label: 사용 중
  priority: high
  lead: JS
  date: May 7
  status:
    value: "core"
---

# Superpowers

> **한 줄**: Claude Code(또는 Codex/Gemini/Cursor)가 코드부터 짜지 않게 강제하는 스킬 묶음. *"이거 만들어줘" → 즉시 코드*가 아니라 **의도 → 스펙 → 계획 → TDD → 검증** 순서를 자동으로 발동시킨다.

- **Repo**: [obra/superpowers](https://github.com/obra/superpowers)
- **저자**: Jesse Vincent (obra)
- **설치**: Claude Code 공식 마켓플레이스 — `/plugin install superpowers@claude-plugins-official`

## 왜 이걸 쓰나

기본 상태의 코딩 에이전트는 **"빨리 답하고 싶어" 편향**이 있다. 어설픈 한 줄 요청에도 바로 코드를 쓰기 시작하고, 뒤늦게 사용자가 "아 이거 말고…" 하면서 다시 짠다. 토큰만 태우고 결과는 어긋난다.

Superpowers는 이 편향을 *스킬 트리거*로 끊는다. 새 기능을 만들겠다고 말한 순간 `brainstorming` 스킬이 자동으로 깨어나서 **무엇을 왜 만드는지부터** 캐묻는다. 사용자가 의도를 정리하고 나면 그다음에 `writing-plans`가 따라붙고, 실행 단계에서는 `subagent-driven-development`가 서브에이전트를 분배한다.

핵심 슬로건은 *"If a skill applies, you do not have a choice. You must use it."* — 일종의 자기-규율 코드.

## 우리 워크스페이스에서 자주 쓰는 것

- **`brainstorming`** — 새 기능·스킬·에이전트·제안서 만들기 시작 시 자동 진입. 의도·요구사항·디자인을 분리해서 묻는다.
- **`writing-plans`** — 멀티스텝 작업 전 체크리스트형 계획 작성. 후배 엔지니어도 따라할 수 있을 정도까지 명확하게.
- **`test-driven-development`** — 빨강(실패하는 테스트) → 초록(통과) → 리팩터 사이클 강제.
- **`systematic-debugging`** — 버그·테스트 실패·예외 만나면 임시방편 금지, 근본 원인까지 추적.
- **`verification-before-completion`** — "다 됐다"고 선언하기 전에 *작동 증명*을 요구.

## 시작하는 법 (가장 작은 예시)

```
# 사용자
이 함수에 캐시 좀 붙여줘

# Superpowers 없는 에이전트
[즉시 LRU 캐시 코드 작성, 잘못된 invalidation 정책으로 ship]

# Superpowers 있는 에이전트
[brainstorming 발동]
"잠깐. 이 함수가 어떤 입력에 자주 호출되나요?
 stale data가 얼마나 위험한가요?
 캐시 invalidation 트리거가 뭐가 있나요?"
[답변 받은 후 → writing-plans → 그제서야 코드]
```

## 함정

- 작은 수정에도 스킬이 발동하면 답답할 수 있다. *5초 안에 끝낼 수정*에는 명시적으로 "skill skip"이라고 알려줘도 OK (단, *"그냥 빨리 해"*가 습관이 되면 의미 없음).
- TDD 스킬은 자동화가 어려운 도메인(시각 디자인, 디자인 토큰)에서는 적용하기 까다로움 — 이 경우 `frontend-design` 같은 다른 스킬에 위임.

---

> 우리 랩의 **거의 모든 코딩 세션이 이 스킬 위에서 돈다.** Claude Code 처음 쓰는 학생이라면 `brainstorming`과 `verification-before-completion` 두 개만 알아도 토큰·시간 절약 효과 큼.

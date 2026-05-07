---
title: "AI Research SKILLs — 아이디어부터 논문까지 자동화하는 98개 연구 스킬"
date: 2026-05-07
authors:
  - jspark-inu
tags:
  - external-skill
  - claude-code
  - research
display:
  dot: rose
  meta: "외부 스킬 · AI 연구 파이프라인"
  health:
    label: 사용 중 (부분 차용)
  priority: high
  lead: JS
  date: May 7
  status:
    value: "core"
---

# AI Research SKILLs

> **한 줄**: Orchestra Research가 만든 **98개 AI 연구 자동화 스킬** 라이브러리. literature survey → ideation → 모델 학습 → 평가 → 논문 작성까지 *연구 라이프사이클 전체*를 모듈로 쪼개놨다.

- **Repo**: [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs)
- **라이선스**: MIT
- **설치**: `npx @orchestra-research/ai-research-skills` (인터랙티브) — `~/.orchestra/skills/`에 설치되고 각 에이전트(Claude Code, Hermes, OpenCode, Cursor, Gemini CLI 등)에 심볼릭 링크.

## 왜 이걸 쓰나

AI 연구를 자동화하려면 한 도메인만 깊으면 안 된다. **Megatron-LM 분산 학습**도 알아야 하고, **vLLM 추론**도 알아야 하고, **TRL post-training**도 알아야 하고, **mech interp**도 알아야 한다. 한 사람이 다 외우는 건 불가능.

그래서 Orchestra는 도메인을 23개 카테고리로 나누고, 각 카테고리당 *공식 레포 + 실제 GitHub 이슈 + 프로덕션 워크플로우*를 반영한 스킬을 만들었다. 에이전트가 작업 맥락에 맞는 스킬을 자동 라우팅한다(두-루프 아키텍처: `autoresearch`가 오케스트레이션, 도메인 스킬이 실행).

## 23개 카테고리 (98 skills, 2026 기준)

| 그룹 | 예시 |
|-----|------|
| **연구 라이프사이클** | Autoresearch · Ideation · ML Paper Writing · Agent-Native Research Artifact |
| **학습/추론** | Model Architecture · Fine-Tuning · Post-Training · Distributed Training · Inference · Optimization |
| **데이터/평가** | Tokenization · Data Processing · Evaluation · Safety & Alignment |
| **응용** | Agents · RAG · Multimodal · Prompt Engineering |
| **운영** | MLOps · Observability · Infrastructure |
| **고급** | Mech Interp · Emerging Techniques |

## 우리 랩에서 차용한 부분

전부 다 깔지 않아도 *부분 차용*이 가능하다. 우리는 **`research-brainstorm`** 스킬만 가져다가 `~/.claude/skills/`에 두고 쓴다.

- **research-brainstorm** — 가설 생성용 *18개 인지 프레임워크*
  - 10개 Workflow Framework: 문제-해법 판별, Abstraction Ladder, Tension Hunting, Cross-Pollination, What Changed, Failure Analysis, Simplicity Test, Stakeholder Rotation, Composition/Decomposition, Explain-It Test
  - 8개 Cognitive Engine: Bisociation, Problem Reformulation, Analogical Reasoning, Constraint Manipulation, Negation/Inversion, Abstraction Laddering, Adjacent Possible, Janusian Thinking
  - **사회과학·경영학 연구에도 그대로 매핑 가능** — 우리 랩이 GABM(Generative Agent-Based Modeling) 가설 다각도 생성에 쓰고 있음

## 시작하는 법 (가장 작은 예시)

```
# 학생: 모호한 연구 아이디어가 있을 때
"learning ABM 환경에서 학생들의 협력 패턴이 LLM persona 변화로 어떻게 영향받나"

# Skill 호출
/research-brainstorm

# 18개 프레임워크 중 3-5개 자동 선택
# 각 프레임워크 렌즈로 가설 생성:
# - Tension Hunting → "협력 vs 무임승차 긴장이 personality trait와 어떻게 상호작용?"
# - Negation/Inversion → "LLM이 *비협력적*일 때 학생 협력은 오히려 늘어날까?"
# - Adjacent Possible → "ABM 외에 RL multi-agent에서 비슷한 현상 보고됐나?"
```

## 함정

- 98개 스킬을 다 깔면 토큰·디스크·인지부담이 큼. **필요한 것만 부분 차용**이 권장.
- AI 연구용으로 만들어졌지만 사회과학 연구에도 *구조* 자체는 적용된다 — 다만 도메인 용어를 머리속에서 매핑해야 함 (예: "ML 모델" → "에이전트 페르소나").
- `autoresearch` 오케스트레이션 레이어는 우리는 안 씀 — 우리 랩의 1A6/1A7 같은 자체 연구 파이프라인이 더 좁고 깊음.

---

> 새 논문 가설을 짤 때 *왜 이 가설이 나왔는지* 자기-설명이 안 되면 `/research-brainstorm`을 한 번 돌려보길. 다른 4-5개 렌즈로 같은 데이터를 보면 보통 **원래 가설이 한 프레임에 매몰**돼 있던 게 드러남.

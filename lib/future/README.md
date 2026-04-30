# lib/future — 백엔드 연결 자리 (Phase 5 skeleton)

> 이 디렉토리는 **현재 단계에서 코드를 실행하지 않는다.** 미래 child seed
> 활성화 시점의 명세와 연결 패턴을 보존하기 위한 참조 자료.

## 아키텍처 — 슬랙봇 패턴

```
브라우저 (lab.haiinu.com 정적)
    │
    │ fetch("https://api.haiinu.com/...", { credentials: "include" })
    ▼
api.haiinu.com  (Cloudflare CNAME → hai_1 Tailscale funnel)
    │
    │ Caddy reverse proxy
    ▼
hai_1 FastAPI :8001 (1C4 Socrates 확장) 또는 신규 FastAPI :8003
    │
    ├── Claude API (anthropic-py)
    ├── workspace.db (SQLite SSOT, read-only API)
    └── lib/rag (Chroma / FAISS / 1C7 Dept-Chatbot 인덱스 재활용)
```

## 활성화 순서 (예상 child seed 5개)

### child seed 1 — api.haiinu.com 셋업
- Cloudflare DNS: `api` CNAME → hai_1 Tailscale funnel address
- hai_1 Caddy: `api.haiinu.com` 리버스 프록시 추가
- HTTPS: Let's Encrypt 자동
- 첫 endpoint: `GET /health`
- CORS: `lab.haiinu.com` origin allow + credentials true

### child seed 2 — Cloudflare Access (인증)
- Access policy: GitHub OAuth, allowed list (jspark-inu, 학부생 3명)
- lab.haiinu.com + api.haiinu.com 둘 다 적용
- Free tier: 50명까지
- AC07/12 (학부생 댓글 검증) 도 이 layer 가 자연스럽게 처리

### child seed 3 — Knowledge DB
- workspace.db 에 `knowledge_doc` 테이블 추가 OR `lab_os.db` 분리 (결정 보류)
- 학생이 폼으로 글/링크/노트 등록 → 백엔드 → DB
- 현 정적 article 은 그대로, 동적 노트는 별도 컬렉션
- 페이지: `/notes/`, `/notes/[id]/`

### child seed 4 — RAG / Chat
- `lib/future/rag/` 활성화 (현재 빈 디렉토리)
- 1C7 Dept-Chatbot 검색 인덱스 재활용 검토
- 첫 endpoint: `POST /chat` (질문 → 검색 → Claude → 답변)
- UI: `components/future/ChatBox.tsx` 활성화

### child seed 5 — Agents/Tasks 콘솔
- workspace.db 의 task/project 읽기 + agent 실행 로그
- 1C14 Dashboard 와 분리: 1C14 = 교수 1인용 / lab.haiinu.com = 협업
- Socrates·돌고래·범고래 실행 로그 stream

## 현 skeleton 자산

- `api/client.ts` — fetch wrapper (`API_BASE` 미설정시 명확한 에러)
- `../components/future/ChatBox.tsx` — Coming Soon 자리

## 디자인 원칙 (활성화 시)

- 모든 신규 페이지는 **Linear 디자인 SSOT** (extra.css → globals.css) 안에서만 조합
- `LinearShell` + `ProjectChrome` + `ProjectTabs` + `FilterRow` 패턴 재사용
- 새 색·새 폰트·새 디자인 시스템 도입 금지
- 신규 surface 는 `project-surface` 안의 한 section 으로

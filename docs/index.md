---
title: Home
comments: false
hide:
  - navigation
---

<section class="erp-hero">
  <div class="erp-hero-copy">
    <span class="erp-kicker">HAI Lab Internal Hub</span>
    <h1>연구실 운영과 지식 공유를 한 화면에서</h1>
    <p>
      프로젝트 진행상황, 연구 노트, 유용한 도구, 공지와 댓글 피드백을 연구원들이 빠르게 확인하는
      내부 ERP형 공유 공간입니다.
    </p>
    <div class="erp-actions">
      <a class="md-button md-button--primary" href="news/">새 업데이트 확인</a>
      <a class="md-button" href="lab-skills/">연구 노하우 보기</a>
    </div>
  </div>

  <div class="erp-hero-panel">
    <span class="panel-label">이번 주 운영 상태</span>
    <table>
      <thead>
        <tr><th>항목</th><th>상태</th></tr>
      </thead>
      <tbody>
        <tr><td>공유 글</td><td>5개 카테고리 운영</td></tr>
        <tr><td>댓글 검증</td><td>연구원 GitHub 계정 확인 대기</td></tr>
        <tr><td>배포</td><td>lab.haiinu.com HTTPS 정상</td></tr>
        <tr><td>다음 액션</td><td>연구원 피드백 3건 수집</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="metric-grid">
  <div class="metric-card">
    <span>Knowledge Areas</span>
    <strong>5</strong>
    <small>News, GitHub, Skills, External, Notice</small>
  </div>
  <div class="metric-card">
    <span>Acceptance</span>
    <strong>15/17</strong>
    <small>댓글 검증 2건만 남음</small>
  </div>
  <div class="metric-card">
    <span>Live Domain</span>
    <strong>HTTPS</strong>
    <small>lab.haiinu.com</small>
  </div>
  <div class="metric-card">
    <span>Feedback Loop</span>
    <strong>Giscus</strong>
    <small>GitHub Discussions 기반</small>
  </div>
</section>

<section class="workspace-grid">
  <div class="workspace-main">
    <h2>프로젝트 보드</h2>
    <div class="project-board">
      <div class="project-row">
        <div>
          <span class="row-eyebrow">Core</span>
          <strong>Lab Share MVP</strong>
          <p>MkDocs Material 기반 연구실 공유 사이트. 검색, 태그, RSS, 댓글, 소셜 카드까지 기본 운영 기능 구축 완료.</p>
        </div>
        <span class="status-chip done">Live</span>
      </div>

      <div class="project-row">
        <div>
          <span class="row-eyebrow">Pending</span>
          <strong>연구원 댓글 검증</strong>
          <p>김규현, 이혜진, 박경 연구원의 GitHub 계정 보유 여부와 댓글 작성 가능 여부 확인 필요.</p>
        </div>
        <span class="status-chip warning">Need Input</span>
      </div>

      <div class="project-row">
        <div>
          <span class="row-eyebrow">Next</span>
          <strong>Cloudflare Access 인증</strong>
          <p>외부 공개가 아닌 내부 공유 목적에 맞게 GitHub OAuth 기반 접근 제한을 후속 seed로 검토.</p>
        </div>
        <span class="status-chip">Planned</span>
      </div>
    </div>

    <h2>최근 업데이트</h2>
    <div class="update-list">
      <a class="update-item" href="news/2026-04-27-인공지능-학과-개편/">
        <span>News</span>
        <strong>인천대 데이터사이언스학과 → AI 학과 전환 흐름</strong>
        <small>학과 구조 변화와 연구실 관점에서 볼 포인트 정리</small>
      </a>

      <a class="update-item" href="useful-github/2026-04-27-claude-agent-sdk/">
        <span>Useful GitHub</span>
        <strong>Claude Agent SDK 시작점</strong>
        <small>LLM 기반 자율 에이전트 개발을 위한 SDK 진입 노트</small>
      </a>

      <a class="update-item" href="external-skills/2026-04-27-claude-code-워크플로우/">
        <span>External Skills</span>
        <strong>Claude Code 워크플로우 4개</strong>
        <small>힌트 정리, 디버깅, 검증, 문서화 루틴</small>
      </a>
    </div>
  </div>

  <aside class="workspace-side">
    <h2>빠른 이동</h2>
    <div class="quick-links">
      <a href="news/"><span>News</span><strong>소식과 트렌드</strong></a>
      <a href="useful-github/"><span>Useful GitHub</span><strong>추천 저장소</strong></a>
      <a href="lab-skills/"><span>Lab Skills</span><strong>내부 노하우</strong></a>
      <a href="external-skills/"><span>External Skills</span><strong>외부 도구</strong></a>
      <a href="notice/"><span>Notice</span><strong>공지와 마감</strong></a>
    </div>

    <h2>오늘의 체크</h2>
    <div class="check-panel">
      <ul>
        <li>연구원 GitHub 계정 보유 여부 확인</li>
        <li>lab.haiinu.com 댓글 작성 테스트</li>
        <li>다음 주 공유 글 후보 3개 선정</li>
        <li>내부 인증 방식 후속 seed 검토</li>
      </ul>
    </div>

    <h2>운영 원칙</h2>
    <div class="principle-card">
      다시 만들지 말고 공유하자.<br>
      짧게 남기고, 댓글로 보완하고, 다음 사람이 바로 이어받을 수 있게 한다.
    </div>
  </aside>
</section>

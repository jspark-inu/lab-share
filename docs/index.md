---
title: Home
comments: false
hide:
  - navigation
---

<section class="linear-home">
  <aside class="linear-sidebar">
    <div class="linear-workspace">
      <span class="workspace-mark">H</span>
      <div>
        <strong>HAI Lab</strong>
        <small>Internal workspace</small>
      </div>
    </div>

    <nav class="linear-nav" aria-label="Lab workspace navigation">
      <a class="active" href="./"><span>⌘</span>Command center</a>
      <a href="news/"><span>N</span>News</a>
      <a href="useful-github/"><span>G</span>Useful GitHub</a>
      <a href="lab-skills/"><span>L</span>Lab Skills</a>
      <a href="external-skills/"><span>E</span>External Skills</a>
      <a href="notice/"><span>!</span>Notice</a>
    </nav>

    <div class="linear-sidebar-section">
      <p>Teams</p>
      <a href="lab-skills/"><span class="team-dot mint"></span>Research Ops</a>
      <a href="useful-github/"><span class="team-dot blue"></span>Tooling</a>
      <a href="news/"><span class="team-dot amber"></span>Signals</a>
    </div>

    <div class="linear-sidebar-footer">
      <span class="sync-dot"></span>
      <div>
        <strong>lab.haiinu.com</strong>
        <small>GitHub Pages deploy active</small>
      </div>
    </div>
  </aside>

  <main class="linear-main">
    <header class="linear-topbar">
      <div class="linear-search">Search projects, notes, tools, notices...</div>
      <div class="linear-top-actions">
        <span>2026.04.30</span>
        <a href="tags/">Tags</a>
      </div>
    </header>

    <section class="linear-title-row">
      <div>
        <span class="linear-kicker">Lab Share / Overview</span>
        <h1>Command center</h1>
        <p>연구실 프로젝트, 지식 공유, 공지, 댓글 피드백을 한 화면에서 추적합니다.</p>
      </div>
      <a class="linear-primary" href="notice/">New update</a>
    </section>

    <section class="linear-metrics" aria-label="Workspace metrics">
      <div>
        <span>Open tracks</span>
        <strong>5</strong>
        <small>Knowledge areas</small>
      </div>
      <div>
        <span>Completion</span>
        <strong>15/17</strong>
        <small>Acceptance checks</small>
      </div>
      <div>
        <span>Pending</span>
        <strong>2</strong>
        <small>Student comment checks</small>
      </div>
      <div>
        <span>Deploy</span>
        <strong>Live</strong>
        <small>HTTPS on custom domain</small>
      </div>
    </section>

    <section class="linear-board">
      <div class="linear-board-head">
        <div>
          <h2>Projects</h2>
          <p>연구실 운영 과제를 Linear 프로젝트 리스트처럼 관리합니다.</p>
        </div>
        <div class="linear-view-tabs">
          <span class="active">List</span>
          <span>Roadmap</span>
          <span>Archive</span>
        </div>
      </div>

      <div class="linear-project-list">
        <article class="linear-project selected">
          <div class="project-icon">LS</div>
          <div class="project-body">
            <div class="project-line">
              <strong>Lab Share MVP</strong>
              <span class="linear-chip success">Live</span>
            </div>
            <p>MkDocs Material 기반 공유 허브. 검색, 태그, RSS, 댓글, 소셜 카드까지 운영 기능 구축 완료.</p>
            <div class="project-meta">
              <span>Owner: jspark-inu</span>
              <span>15/17 checks</span>
              <span>Updated today</span>
            </div>
          </div>
        </article>

        <article class="linear-project">
          <div class="project-icon amber">FB</div>
          <div class="project-body">
            <div class="project-line">
              <strong>Researcher feedback loop</strong>
              <span class="linear-chip warning">Needs input</span>
            </div>
            <p>김규현, 이혜진, 박경 연구원의 GitHub 계정과 댓글 작성 가능 여부 확인.</p>
            <div class="project-meta">
              <span>AC07 / AC12</span>
              <span>2 remaining</span>
              <span>Blocked by account check</span>
            </div>
          </div>
        </article>

        <article class="linear-project">
          <div class="project-icon blue">CA</div>
          <div class="project-body">
            <div class="project-line">
              <strong>Cloudflare Access layer</strong>
              <span class="linear-chip">Planned</span>
            </div>
            <p>외부 공개형 사이트에서 내부 연구원용 GitHub OAuth 접근 제한으로 전환하는 후속 seed.</p>
            <div class="project-meta">
              <span>Security</span>
              <span>Next seed</span>
              <span>Not started</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="linear-issues">
      <div class="linear-board-head">
        <div>
          <h2>Recent knowledge items</h2>
          <p>공유된 글을 이슈 피드처럼 빠르게 훑어봅니다.</p>
        </div>
      </div>

      <a class="linear-issue" href="news/2026-04-27-인공지능-학과-개편/">
        <span class="issue-key">NEWS-1</span>
        <strong>인천대 데이터사이언스학과 → AI 학과 전환 흐름</strong>
        <span class="issue-status">News</span>
      </a>
      <a class="linear-issue" href="useful-github/2026-04-27-claude-agent-sdk/">
        <span class="issue-key">GIT-1</span>
        <strong>Claude Agent SDK 시작점</strong>
        <span class="issue-status">Tooling</span>
      </a>
      <a class="linear-issue" href="external-skills/2026-04-27-claude-code-워크플로우/">
        <span class="issue-key">EXT-1</span>
        <strong>Claude Code 워크플로우 4개</strong>
        <span class="issue-status">Workflow</span>
      </a>
    </section>
  </main>

  <aside class="linear-detail">
    <section class="detail-card">
      <span class="linear-kicker">Selected project</span>
      <h2>Lab Share MVP</h2>
      <p>연구실 내부 지식 공유 사이트의 첫 운영 버전입니다. 문서, 댓글, 검색, 태그를 중심으로 유지합니다.</p>
      <div class="progress-row">
        <span>Completion</span>
        <strong>88%</strong>
      </div>
      <div class="linear-progress"><span style="width: 88%"></span></div>
    </section>

    <section class="detail-card">
      <h2>Next actions</h2>
      <ul class="linear-task-list">
        <li><span></span>연구원 GitHub 계정 확인</li>
        <li><span></span>댓글 작성 테스트 3건 수집</li>
        <li><span></span>내부 인증 후속 seed 검토</li>
      </ul>
    </section>

    <section class="detail-card">
      <h2>Quick links</h2>
      <div class="detail-links">
        <a href="news/">News</a>
        <a href="lab-skills/">Lab Skills</a>
        <a href="notice/">Notice</a>
        <a href="authors/jspark-inu/">Author profile</a>
      </div>
    </section>
  </aside>
</section>

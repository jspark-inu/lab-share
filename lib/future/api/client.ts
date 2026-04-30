/**
 * Phase 5 skeleton — 미래 child seed 에서 활성화될 API client.
 *
 * 패턴: 슬랙봇과 동일.
 *   브라우저(lab.haiinu.com 정적) → fetch → api.haiinu.com (hai_1 FastAPI)
 *
 * 현 단계는 endpoint 가 아무것도 없으므로 wrapper 만 정의하고 사용하지 않는다.
 * 활성화 시점:
 *   1) child seed: api.haiinu.com 셋업 (Cloudflare CNAME → hai_1 Tailscale)
 *   2) child seed: hai_1 Caddy reverse proxy
 *   3) child seed: FastAPI 신규 또는 1C4 Socrates(:8001) 확장 + CORS
 *   4) child seed: 본 client.ts 활성화 + 첫 endpoint (/health, /chat)
 */

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export class ApiNotConfiguredError extends Error {
  constructor() {
    super(
      "NEXT_PUBLIC_API_BASE not set. Backend integration is deferred — see lib/future/README.md.",
    );
    this.name = "ApiNotConfiguredError";
  }
}

interface ApiOptions {
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

async function request<T>(
  method: "GET" | "POST",
  path: string,
  body?: unknown,
  options?: ApiOptions,
): Promise<T> {
  if (!API_BASE) throw new ApiNotConfiguredError();
  const url = `${API_BASE.replace(/\/$/, "")}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    signal: options?.signal,
  });
  if (!res.ok) {
    throw new Error(`API ${method} ${path} failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export const apiGet = <T,>(path: string, options?: ApiOptions) =>
  request<T>("GET", path, undefined, options);

export const apiPost = <T,>(path: string, body: unknown, options?: ApiOptions) =>
  request<T>("POST", path, body, options);

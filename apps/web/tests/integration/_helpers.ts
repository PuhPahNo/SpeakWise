/**
 * Integration test helpers. Tests assume the dev server is running on
 * APP_URL (default http://localhost:3001). They exercise real Postgres
 * + real OpenAI/ElevenLabs (cheap calls only).
 */
const BASE = process.env.APP_URL ?? 'http://localhost:3001';

const TEST_USER = {
  username: process.env.TEST_USERNAME ?? 'anthony',
  password: process.env.TEST_PASSWORD ?? 'admin123',
};

export async function signInForTests(): Promise<string> {
  const res = await fetch(`${BASE}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(TEST_USER),
  });
  if (!res.ok) {
    throw new Error(
      `Sign-in failed (${res.status}); make sure ${TEST_USER.username}/${TEST_USER.password} exists locally`,
    );
  }
  const setCookie = res.headers.get('set-cookie');
  if (!setCookie) throw new Error('No set-cookie on sign-in response');
  const match = setCookie.match(/sw_session=([^;]+)/);
  if (!match) throw new Error('sw_session cookie not in set-cookie header');
  return `sw_session=${match[1]}`;
}

export interface ApiOpts {
  cookie?: string;
  expectStatus?: number | number[];
  body?: unknown;
}

export async function api<T = unknown>(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  path: string,
  opts: ApiOpts = {},
): Promise<{ res: Response; data: T }> {
  const headers: Record<string, string> = {};
  if (opts.cookie) headers.Cookie = opts.cookie;
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });
  const expected = opts.expectStatus
    ? Array.isArray(opts.expectStatus)
      ? opts.expectStatus
      : [opts.expectStatus]
    : null;
  if (expected && !expected.includes(res.status)) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `${method} ${path} → ${res.status}, expected ${expected.join('|')}: ${text.slice(0, 300)}`,
    );
  }
  let data: T = undefined as unknown as T;
  const ctype = res.headers.get('content-type') ?? '';
  if (ctype.includes('application/json')) {
    data = (await res.json()) as T;
  }
  return { res, data };
}

export { BASE };

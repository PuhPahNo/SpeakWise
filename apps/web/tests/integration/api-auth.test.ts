import { describe, expect, it } from 'vitest';
import { api } from './_helpers';

describe('auth flow', () => {
  it('POST /api/auth/signin with bad password → 401, no cookie', async () => {
    const { res } = await api('POST', '/api/auth/signin', {
      body: { username: 'anthony', password: 'definitely-wrong' },
    });
    expect(res.status).toBe(401);
    expect(res.headers.get('set-cookie') ?? '').not.toMatch(/sw_session=/);
  });

  it('POST /api/auth/signin with non-existent user → 401', async () => {
    const { res } = await api('POST', '/api/auth/signin', {
      body: { username: 'no-such-user-xyz', password: 'whatever' },
    });
    expect(res.status).toBe(401);
  });

  it('POST /api/auth/signin with malformed body → 400', async () => {
    const { res } = await api('POST', '/api/auth/signin', { body: { foo: 'bar' } });
    expect(res.status).toBe(400);
  });

  it('POST /api/auth/signin with valid creds → 200 + sw_session cookie', async () => {
    const res = await fetch(`${process.env.APP_URL ?? 'http://localhost:3001'}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'anthony', password: 'admin123' }),
    });
    expect(res.status).toBe(200);
    const setCookie = res.headers.get('set-cookie') ?? '';
    expect(setCookie).toMatch(/sw_session=/);
    expect(setCookie).toMatch(/HttpOnly/i);
    expect(setCookie).toMatch(/SameSite=lax/i);
    const data = (await res.json()) as {
      ok: boolean;
      user: { username: string; role: string };
    };
    expect(data.ok).toBe(true);
    expect(data.user.username).toBe('anthony');
    expect(data.user.role).toBe('admin');
  });

  it('POST /api/auth/signout → 200', async () => {
    const { res } = await api('POST', '/api/auth/signout', { expectStatus: 200 });
    expect(res.status).toBe(200);
  });
});

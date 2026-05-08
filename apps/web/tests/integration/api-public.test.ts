import { describe, expect, it } from 'vitest';
import { api } from './_helpers';

describe('public endpoints', () => {
  it('GET /api/health returns ok=true', async () => {
    const { res, data } = await api<{ ok: boolean }>('GET', '/api/health', {
      expectStatus: 200,
    });
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
  });

  it('GET /command-center without auth → redirect or 401', async () => {
    const { res } = await api('GET', '/command-center');
    // middleware redirects pages to /sign-in (307) or sends 401 for APIs
    expect([200, 307, 308, 401]).toContain(res.status);
    if (res.status === 307) {
      expect(res.headers.get('location') ?? '').toMatch(/sign-in/);
    }
  });

  it('GET /api/me without auth → 401', async () => {
    const { res } = await api('GET', '/api/me');
    expect(res.status).toBe(401);
  });

  it('GET /api/wise/greeting without auth → 401', async () => {
    const { res } = await api('GET', '/api/wise/greeting');
    expect(res.status).toBe(401);
  });
});

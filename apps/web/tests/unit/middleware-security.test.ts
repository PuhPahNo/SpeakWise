import { middleware } from '@/middleware';
import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

describe('middleware mutation origin checks', () => {
  it('rejects cross-origin POST requests', async () => {
    const response = middleware(
      new NextRequest('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { origin: 'https://attacker.example', 'sec-fetch-site': 'cross-site' },
      }),
    );
    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: 'cross_origin_request' });
  });

  it('allows same-origin public POST requests through', () => {
    const response = middleware(
      new NextRequest('http://localhost/api/auth/signin', {
        method: 'POST',
        headers: { origin: 'http://localhost', 'sec-fetch-site': 'same-origin' },
      }),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBe('1');
  });

  it('uses the browser-facing host when the runtime normalizes the request URL', () => {
    const response = middleware(
      new NextRequest('http://localhost:3011/api/auth/signin', {
        method: 'POST',
        headers: {
          host: '127.0.0.1:3011',
          origin: 'http://127.0.0.1:3011',
          'sec-fetch-site': 'same-origin',
        },
      }),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBe('1');
  });
});

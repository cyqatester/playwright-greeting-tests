import { test, expect } from '@playwright/test';

test.describe('Greeting HTTP/API tests', () => {
  test('GET /homepage returns HTML with the name fields', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
    const body = await response.text();
    expect(body).toMatch(/first name/i);
    expect(body).toMatch(/last name/i);
  });

  test('POST /greet returns the expected greeting', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/greet`, {
      form: { firstName: 'Ada', lastName: 'Lovelace' }
    });
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
    await expect(response.text()).resolves.toContain('Hello Ada Lovelace!');
  });

  test('POST /home redirects to home page', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/home`, { maxRedirects: 0 });
    expect(response.status()).toBe(302);
    expect(response.headers().location).toBe('/greeting-app/');
  });
});


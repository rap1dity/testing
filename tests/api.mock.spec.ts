import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.example.com/users';

const mockSuccessfulResponse = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  phone: '+1-555-123-4567',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipcode: '10001',
    country: 'USA'
  },
  company: {
    name: 'Doe Enterprises',
    industry: 'Technology',
    position: 'Software Engineer'
  },
  dob: '1990-05-15',
  profile_picture_url: 'https://example.com/images/johndoe.jpg',
  is_active: true,
  created_at: '2023-01-01T12:00:00Z',
  updated_at: '2023-10-01T12:00:00Z',
  preferences: {
    language: 'en',
    timezone: 'America/New_York',
    notifications_enabled: true
  }
};

const mockErrorResponses: Record<number, unknown> = {
  204: null,
  403: { error: 'Forbidden', details: 'You do not have access to this resource.' },
  404: { error: 'Not Found', details: 'User not found.' },
  502: { error: 'Bad Gateway', details: 'The server is unavailable.' }
};

test('Mock 200 successful response', async ({ page }) => {
  await page.route(`${BASE_URL}/1`, async route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockSuccessfulResponse)
    });
  });

  const response = await page.evaluate(async (url: string) => {
    const res = await fetch(url);
    return res.json();
  }, `${BASE_URL}/1`);

  expect(response).toHaveProperty('id', 1);
  expect(response).toHaveProperty('name', 'John Doe');
  expect(response.address).toHaveProperty('street', '123 Main St');
  expect(response.address).toHaveProperty('city', 'New York');
  expect(response.company).toHaveProperty('industry', 'Technology');
});

test('Mock 204 No Content response', async ({ page }) => {
  await page.route(`${BASE_URL}/204`, async route => {
    route.fulfill({ status: 204 });
  });

  const response = await page.evaluate(async (url: string) => {
    const res = await fetch(url);
    if (res.status === 204) return { status: 204, data: null };
    return { status: res.status, data: await res.json() };
  }, `${BASE_URL}/204`);

  expect(response.status).toBe(204);
  expect(response.data).toBeNull();
});

test('Mock 403 Forbidden response', async ({ page }) => {
  await page.route(`${BASE_URL}/403`, async route => {
    route.fulfill({
      status: 403,
      contentType: 'application/json',
      body: JSON.stringify(mockErrorResponses[403])
    });
  });

  const response = await page.evaluate(async (url: string) => {
    const res = await fetch(url);
    return { status: res.status, data: await res.json() };
  }, `${BASE_URL}/403`);

  expect(response.status).toBe(403);
  expect(response.data).toHaveProperty('error', 'Forbidden');
  expect(response.data).toHaveProperty('details');
});

test('Mock 404 Not Found response', async ({ page }) => {
  await page.route(`${BASE_URL}/404`, async route => {
    route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify(mockErrorResponses[404])
    });
  });

  const response = await page.evaluate(async (url: string) => {
    const res = await fetch(url);
    return { status: res.status, data: await res.json() };
  }, `${BASE_URL}/404`);

  expect(response.status).toBe(404);
  expect(response.data).toHaveProperty('error', 'Not Found');
  expect(response.data).toHaveProperty('details');
});

test('Mock 502 Bad Gateway response', async ({ page }) => {
  await page.route(`${BASE_URL}/502`, async route => {
    route.fulfill({
      status: 502,
      contentType: 'application/json',
      body: JSON.stringify(mockErrorResponses[502])
    });
  });

  const response = await page.evaluate(async (url: string) => {
    const res = await fetch(url);
    return { status: res.status, data: await res.json() };
  }, `${BASE_URL}/502`);

  expect(response.status).toBe(502);
  expect(response.data).toHaveProperty('error', 'Bad Gateway');
  expect(response.data).toHaveProperty('details');
});

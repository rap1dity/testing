import { test, expect, APIResponse } from '@playwright/test';
import Fakerator from 'fakerator';

const fakerator = Fakerator();
const baseURL = 'https://demoqa.com';

test.describe.serial('API Testing with DemoQA', () => {
  const userName: string = `${fakerator.names.firstName()}_${Date.now()}`;
  const password: string = `Test@${fakerator.random.number(1000, 9999)}`;

  let userID: string = '';
  let token: string = '';

  test('Should successfully create a new user', async ({ request }) => {
    const response: APIResponse = await request.post(`${baseURL}/Account/v1/User`, {
      data: { userName, password },
    });

    expect(response.status()).toBe(201);

    const responseBody: { userID: string; username: string } = await response.json();
    expect(responseBody).toHaveProperty('userID');

    userID = responseBody.userID;
    console.log('Created userID:', userID);
  });

  test('Should generate token for created user', async ({ request }) => {
    const response: APIResponse = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
      data: { userName, password },
    });

    expect(response.status()).toBe(200);

    const responseBody: { token: string; expires: string; status: string; result: string } = await response.json();
    expect(responseBody.token).toBeTruthy();

    token = responseBody.token;
    console.log('Generated token:', token);
  });

  test('Should fetch created user by ID', async ({ request }) => {
    const response: APIResponse = await request.get(`${baseURL}/Account/v1/User/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const responseBody: { userID: string; username: string; books: unknown[] } = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.username).toBe(userName);
  });

  test('Should delete created user', async ({ request }) => {
    const response: APIResponse = await request.delete(`${baseURL}/Account/v1/User/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.status()).toBe(204);
  });

  test('Should fail to create user with empty password', async ({ request }) => {
    const badUsername: string = `${fakerator.names.firstName()}_fail`;

    const response: APIResponse = await request.post(`${baseURL}/Account/v1/User`, {
      data: { userName: badUsername, password: '' },
    });
    const responseBody: { code: string; message: string } = await response.json();

    expect(response.status()).toBe(400);
    expect(responseBody.message.toLowerCase()).toContain('password');
  });

  test('Should fail to generate token with invalid password', async ({ request }) => {
    const response: APIResponse = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
      data: { userName, password: 'wrongpassword' },
    });
    const responseBody: { code: string; result: string } = await response.json();


    expect(response.status()).toBe(200); // OK even on error
    expect(responseBody.result).toContain('User authorization failed.');
  });

  test('Should fail to fetch non-existent user', async ({ request }) => {
    const response: APIResponse = await request.get(`${baseURL}/Account/v1/User/00000000-0000-0000-0000-000000000000`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.status()).toBe(401);
  });

  test('Should fail to delete non-existent user', async ({ request }) => {
    const response: APIResponse = await request.delete(`${baseURL}/Account/v1/User/00000000-0000-0000-0000-000000000000`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const responseBody: { code: string; message: string } = await response.json();


    expect(response.status()).toBe(200); // OK even on error
    expect(responseBody.message.toLowerCase()).toEqual('user id not correct!');
  });
});

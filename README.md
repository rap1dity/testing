# API Testing Project

Practice 4

This project demonstrates automated **API testing** using [Playwright](https://playwright.dev/docs/api-testing).

---

## Requirements

- [Node.js](https://nodejs.org/en/download/) (version 22.14.0 or higher)
- npm or yarn

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/rap1dity/testing-api.git
cd testing-api
npm install
```

---

## Running API Tests

### Run all Playwright API tests:

```bash
npm run test
```

### Run a specific test file:

```bash
npx playwright test tests/users-api.mock.spec.ts
```

### Run with filtering (by test name):

```bash
npx playwright test --grep "Mock 403"
```

---

## Project Structure

```
/tests
  └── accounts-api.spec.ts → Api testing for account endpoints
  └── api.mock.spec.ts     → Mocked API test cases (200, 204, 403, etc.)
```

---

## Notes

- All API responses are mocked using `page.route(...)`.
- No real network requests are made.
- Test structure validates both **successful responses** and **error handling**.

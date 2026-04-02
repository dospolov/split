# Split — Playwright automation

End-to-end UI tests for the Split Next.js app. Tests live next to the main repo and target the running web app via Playwright.

## Prerequisites

- Node.js (LTS recommended)
- App dependencies installed in the **repository root** (`npm install` one level above this folder). The Playwright config starts `npm run dev` from that root when using a local base URL.

## Setup

```bash
cd automation
npm install
npx playwright install
```

Use `npx playwright install --with-deps` on Linux CI images if the browser bundle needs system libraries.

## Running tests

From this directory:

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm test`         | Run all tests (default projects in config)       |
| `npm run test:ui`  | Playwright UI mode                               |
| `npm run test:headed` | Run with a visible browser                    |

From the **monorepo root**:

```bash
npm run test:e2e
```

That runs `npm test` inside `automation/`.

## Base URL and dev server

- Default **`baseURL`** is `http://localhost:3000`.
- Override with **`BASE_URL`** (e.g. `BASE_URL=https://example.com npx playwright test`).
- If `BASE_URL` points at **localhost** or **127.0.0.1**, Playwright starts **`npm run dev`** from the parent folder, waits until `baseURL` responds, then runs tests.
- **`reuseExistingServer`**: when not in CI, an already running dev server on the same URL is reused instead of starting a second process.
- For a **non-local** `BASE_URL`, the embedded dev server is **not** started (tests only hit the URL you configured).

## Configuration

- **`playwright.config.ts`** — projects (e.g. Mobile Chrome / Mobile Safari), `baseURL`, `webServer`, reporters, retries in CI.
- Tests and fixtures live under **`tests/`**; shared page objects, facades, and components under **`common/`**.

## Fixtures

`tests/common/fixtures/base.fixture.ts` extends Playwright’s `test` with a **`splitUi`** fixture (`SplitFacade`) so specs can open the app and drive friends/transactions through a small API.

## Reports

HTML report output is written under **`playwright-report/`** after a run (per `playwright.config.ts`). Open the report or use `npm run test:ui` for interactive debugging.

## `data-testid` in the app

Stable selectors use the `split-*` **`data-testid`** attributes defined in the Next.js app under `app/(home)/features/`. Prefer those (or roles/labels) over brittle CSS when adding new tests.

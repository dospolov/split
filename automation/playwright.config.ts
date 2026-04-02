import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const defaultBaseURL = "http://localhost:3000";
const baseURL = process.env.BASE_URL ?? defaultBaseURL;

function isLocalBaseURL(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === "localhost" || u.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

const repoRoot = path.join(__dirname, "..");

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  ...(isLocalBaseURL(baseURL)
    ? {
        webServer: {
          command: "npm run dev",
          cwd: repoRoot,
          url: baseURL,
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
        },
      }
    : {}),
});

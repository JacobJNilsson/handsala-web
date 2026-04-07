import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 180_000,
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npx serve out -l 3000",
    port: 3000,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        launchOptions: { headless: true },
      },
    },
  ],
});

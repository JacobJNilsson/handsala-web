import { test, expect } from "@playwright/test";

test("Palette game loads past the loading screen", async ({ page }) => {
  // Collect all console messages
  const logs: string[] = [];
  page.on("console", (msg) => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => {
    logs.push(`[pageerror] ${err.message}`);
  });

  // Collect failed network requests
  const failedRequests: string[] = [];
  page.on("requestfailed", (req) => {
    failedRequests.push(`${req.url()} - ${req.failure()?.errorText}`);
  });

  await page.goto("/palette/play/");

  // The loading div should be present initially
  const loading = page.locator("#loading");
  await expect(loading).toBeVisible({ timeout: 5_000 });

  // Wait for the loading screen to be removed (Flutter fires 'flutter-first-frame')
  try {
    await expect(loading).toBeHidden({ timeout: 120_000 });
  } catch (e) {
    // Dump diagnostics on failure
    console.log("\n=== FAILED REQUESTS ===");
    failedRequests.forEach((r) => console.log(r));

    // Filter logs to show timing-relevant entries
    console.log("\n=== KEY LOGS ===");
    const keyPatterns = [
      "error",
      "pageerror",
      "LateInit",
      "Generating puzzle of size",
      "Puzzle values reduced",
      "Puzzle generation completed",
      "flutter-first-frame",
      "Starting puzzle generation",
      "Saving puzzle states",
      "first service worker",
      "Injecting",
    ];
    logs
      .filter((l) =>
        keyPatterns.some((p) => l.toLowerCase().includes(p.toLowerCase())),
      )
      .forEach((l) => console.log(l));

    console.log(`\n=== TOTAL LOG COUNT: ${logs.length} ===`);
    console.log("=== LAST 10 LOGS ===");
    logs.slice(-10).forEach((l) => console.log(l));

    throw e;
  }

  // The Flutter canvas or flt-glass-pane should now be present
  const flutterElement = page.locator("flt-glass-pane, flutter-view, canvas");
  await expect(flutterElement.first()).toBeVisible({ timeout: 10_000 });
});

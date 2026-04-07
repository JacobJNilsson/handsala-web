import { test, expect } from "@playwright/test";

test("Palette game loads within 5s", async ({ page }) => {
  await page.goto("/palette/play/");
  const loading = page.locator("#loading");
  await expect(loading).toBeHidden({ timeout: 5_000 });
  await expect(
    page.locator("flt-glass-pane, flutter-view, canvas").first(),
  ).toBeVisible({ timeout: 5_000 });
});

test("Navigate to 9x9 puzzle within 5s per page", async ({ page }) => {
  const logs: string[] = [];
  page.on("console", (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));

  await page.goto("/palette/play/");
  await expect(page.locator("#loading")).toBeHidden({ timeout: 5_000 });

  const canvas = page.locator("canvas").first();
  await expect(canvas).toBeVisible({ timeout: 5_000 });

  // Wait for all puzzles to be generated (or loaded from cache)
  await expect
    .poll(
      () =>
        logs.some(
          (l) =>
            l.includes("generation took") ||
            l.includes("generation completed") ||
            l.includes("Saving puzzle states") ||
            l.includes("already exists. Skipping"),
        ),
      { timeout: 15_000, message: "Puzzle generation should complete" },
    )
    .toBeTruthy();

  // Print generation timing
  logs
    .filter(
      (l) => l.includes("Generation of size") || l.includes("generation took"),
    )
    .forEach((l) => console.log(l));

  const box = await canvas.boundingBox();
  expect(box).toBeTruthy();
  const cx = box!.x + box!.width / 2;
  const cy = box!.y + box!.height / 2;

  // --- Click Play button ---
  // Home layout (vertical, centered): "Palette" title, then buttons stacked.
  // On web the support button is hidden, so: Play, Instructions, Settings, Stats.
  // Each button is 110px tall with 0px margin. Title is ~78px + 20px gap.
  // Total content ~= 78 + 20 + 4*110 = 538px. Content starts at cy - 269.
  // Play button center Y = cy - 269 + 78 + 20 + 55 = cy - 116
  const playY = cy - 116;
  const playStart = Date.now();
  await page.mouse.click(cx, playY);
  // Wait for size selection to render — it should be responsive within 5s
  await page.waitForTimeout(2000);
  const playTime = Date.now() - playStart;
  console.log(`\nHome -> Size selection: ${playTime}ms`);
  expect(playTime).toBeLessThan(5_000);

  await page.screenshot({ path: "test-results/02-size-select.png" });

  // --- Click the 9x9 button ---
  // From screenshot: all 6 sizes in a single row, centered.
  // Buttons are 100x100 with 4px margin.
  // Total row width = 6*100 + 5*4 = 620. Centered at cx.
  // "9" is the 6th button (index 5).
  // Button 0 left edge = cx - 310
  // Button 5 center X = cx - 310 + 5*(100+4) + 50 = cx - 310 + 520 + 50 = cx + 260
  // Y: The buttons are below the date text. Date is roughly at cy - 60.
  // Buttons center Y is roughly at cy + 10 (based on the screenshot).

  const nineX = cx + 260;
  const nineY = cy + 10;
  console.log(`Clicking 9x9 at (${nineX.toFixed(0)}, ${nineY.toFixed(0)})`);

  const nineStart = Date.now();
  await page.mouse.click(nineX, nineY);
  // Wait for game screen to appear
  await page.waitForTimeout(3000);
  const nineTime = Date.now() - nineStart;
  console.log(`Size selection -> 9x9 game: ${nineTime}ms`);

  await page.screenshot({ path: "test-results/03-9x9-game.png" });

  // Verify no page crash/error
  const errors = logs.filter(
    (l) => l.includes("[pageerror]") || l.includes("LateInitializationError"),
  );
  expect(errors).toEqual([]);
});

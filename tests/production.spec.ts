import { expect, test } from "@playwright/test";

test("produção inicia o canvas sem expor API de desenvolvimento", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#game canvas")).toBeVisible();
  await expect.poll(() => page.evaluate(() => "GAME_TEST_API" in window)).toBe(false);
});

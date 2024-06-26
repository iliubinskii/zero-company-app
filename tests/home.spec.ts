import { expect, test } from "@playwright/test";
import { BASE_URL } from "./config";

test.describe.parallel("Home", () => {
  test("should have title", async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveTitle(/Zero Company/u);
  });
});

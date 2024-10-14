import { test, Page } from "@playwright/test";

test("Login Test ", async ({ page }: { page: Page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.locator(".oxd-userdropdown-tab").click();
  await page.getByRole("menuitem", { name: "Logout" }).click();
  await page.close();
});

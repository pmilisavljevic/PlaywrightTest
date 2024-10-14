import { test, expect } from "@playwright/test";

test.describe("sideMenu", () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    // Log in page before each test
    page = await browser.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com");
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test.afterEach(async () => {
    // Log out after each test
    await page.locator(".oxd-userdropdown-tab").click();
    await page.getByRole("menuitem", { name: "Logout" }).click();
    await page.close();
  });

  // Sidemenu navigation

  async function navigateAndAssert(linkName: string, expectedHeading: string) {
    await page.getByRole("link", { name: linkName }).click();
    await expect(
      page.getByRole("heading", { name: expectedHeading, exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: expectedHeading, exact: true })
    ).toHaveText(expectedHeading);
  }

  test("Admin", async () => {
    await navigateAndAssert("Admin", "Admin");
    await expect(
      page.locator("div").filter({ hasText: /^AdminUser Management$/ })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "/ User Management" })
    ).toHaveText("User Management");
  });

  test("PIM", async () => {
    await navigateAndAssert("PIM", "PIM");
  });

  test("Leave", async () => {
    await navigateAndAssert("Leave", "Leave");
  });

  test("Time", async () => {
    await page.getByRole("link", { name: "Time" }).click();
    await expect(
      page.locator("div").filter({ hasText: /^TimeTimesheets$/ })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Time", exact: true })
    ).toHaveText("Time");
    await expect(
      page.getByRole("heading", { name: "/ Timesheets" })
    ).toHaveText("Timesheets");
  });

  test("Recruitment", async () => {
    await navigateAndAssert("Recruitment", "Recruitment");
  });

  test("My Info", async () => {
    await navigateAndAssert("My Info", "PIM");
  });

  test("Performance", async () => {
    await page.getByRole("link", { name: "Performance" }).click();
    await expect(
      page.locator("div").filter({ hasText: /^PerformanceManage Reviews$/ })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Performance" })).toHaveText(
      "Performance"
    );
    await expect(
      page.getByRole("heading", { name: "/ Manage Reviews" })
    ).toHaveText("Manage Reviews");
  });

  test("Dashboard", async () => {
    await navigateAndAssert("Dashboard", "Dashboard");
  });

  test("Directory", async () => {
    await page.getByRole("link", { name: "Directory" }).click();
    await expect(page.locator("h6", { hasText: "Directory" })).toBeVisible();
    await expect(page.locator("h6", { hasText: "Directory" })).toHaveText(
      "Directory"
    );
  });

  test.skip("Maintenance", async () => {
    // test can be flaky
    await navigateAndAssert("Maintenance", "Maintenance");
  });

  test("Claim", async () => {
    await navigateAndAssert("Claim", "Claim");
  });

  test("Buzz", async () => {
    await navigateAndAssert("Buzz", "Buzz");
  });
});

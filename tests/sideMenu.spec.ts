import { test, expect } from "@playwright/test";

test.describe("sideMenu", () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    // Navigate to the login page before each test
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

  test("Admin", async () => {
    await page.getByRole("link", { name: "Admin" }).click();
    await expect(
      page.locator("div").filter({ hasText: /^AdminUser Management$/ })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Admin" })).toHaveText(
      "Admin"
    );
    await expect(
      page.getByRole("heading", { name: "/ User Management" })
    ).toHaveText("User Management");
  });

  test("PIM", async () => {
    await page.getByRole("link", { name: "PIM" }).click();
    await expect(page.getByRole("heading", { name: "PIM" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "PIM" })).toHaveText("PIM");
  });

  test("Leave", async () => {
    await page.getByRole("link", { name: "Leave" }).click();
    await expect(page.getByRole("heading", { name: "Leave" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Leave" })).toHaveText(
      "Leave"
    );
  });

  test("Time", async () => {
    await page.getByRole("link", { name: "Time" }).click();
    await page
      .locator("div")
      .filter({ hasText: /^TimeTimesheets$/ })
      .toBeVisible();
    await expect(page.getByRole("heading", { name: "Time" })).toHaveText(
      "Time"
    );
    await expect(
      page.getByRole("heading", { name: "/ Timesheets" })
    ).toHaveText("Timesheets");
  });

  test("Recruitment", async () => {
    await page.getByRole("link", { name: "Recruitment" }).click();
    await expect(
      page.getByRole("heading", { name: "Recruitment" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recruitment" })).toHaveText(
      "Recruitment"
    );
  });

  test("My Info", async () => {
    await page.getByRole("link", { name: "My Info" }).click();
    await expect(page.getByRole("heading", { name: "PIM" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "PIM" })).toHaveText("PIM");
  });

  test("Performance", async () => {
    await page.getByRole("link", { name: "Performance" }).click();
    await expect(
      page.locator("div").filter({ hasText: /^PerformanceManage Reviews$/ })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Performance" })).toHaveText(
      "Admin"
    );
    await expect(
      page.getByRole("heading", { name: "/ Manage Reviews" })
    ).toHaveText("Manage Reviews");
  });

  test("Dashboard", async () => {
    await page.getByRole("link", { name: "Dashboard" }).click();
    await expect(
      page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Dashboard" })).toHaveText(
      "Dashboard"
    );
  });

  test("Directory", async () => {
    await page.getByRole("link", { name: "Directory" }).click();
    await expect(
      page.getByRole("heading", { name: "Directory" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Directory" })).toHaveText(
      "Directory"
    );
  });

  test("Maintenance", async () => {
    await page.getByRole("link", { name: "Maintenance" }).click();
    await expect(
      page.getByRole("heading", { name: "Maintenance" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Maintenance" })).toHaveText(
      "Maintenance"
    );
  });

  test("Claim", async () => {
    await page.getByRole("link", { name: "Claim" }).click();
    await expect(page.getByRole("heading", { name: "Claim" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Claim" })).toHaveText(
      "Claim"
    );
  });

  test("Buzz", async () => {
    await page.getByRole("link", { name: "Buzz" }).click();
    await expect(page.getByRole("heading", { name: "Buzz" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Buzz" })).toHaveText(
      "Buzz"
    );
  });
});

import { test, expect } from "@playwright/test";

let page;

test.describe("User Tests", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    // Login before the tests
    await page.goto("https://opensource-demo.orangehrmlive.com");
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test.afterAll(async () => {
    // Logout after all tests
    await page.locator(".oxd-userdropdown-tab").click();
    await page.getByRole("menuitem", { name: "Logout" }).click();
    await page.close();
  });

  test("Add new employee", async () => {
    // Add new employee
    await page.getByRole("link", { name: "PIM" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByPlaceholder("First Name").fill("Dragan");
    await page.getByPlaceholder("Last Name").fill("Nedeljkov");
    await page
      .locator("div")
      .filter({ hasText: /^Employee Id$/ })
      .getByRole("textbox")
      .fill("2812888");
    await page.getByRole("button", { name: "Save" }).click();
  });

  const findEmployee = async () => {
    await page.getByRole("link", { name: "PIM" }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Employee Id$/ })
      .getByRole("textbox")
      .fill("2812888");
    await page.getByRole("button", { name: "Search" }).click();
  };

  test("Edit employee", async () => {
    // Edit employee
    await findEmployee();
    await page
      .getByRole("row", { name: "2812888" })
      .locator("button:has(i.bi-pencil-fill)")
      .click();
    await page.getByPlaceholder("First Name").click();
    await page.getByPlaceholder("First Name").fill("AdraganEdit");
    await page
      .locator("div.oxd-form-actions")
      .nth(0)
      .getByRole("button", { name: "Save" })
      .click();
    await page.getByRole("link", { name: "PIM" }).click();
  });

  test("Delete employee", async () => {
    // Delete employee
    await findEmployee();
    await page
      .getByRole("row", { name: "2812888" })
      .locator("button:has(i.bi-trash)")
      .click();
    await page.getByRole("button", { name: "Yes, Delete" }).click();
    await page.getByRole("link", { name: "PIM" }).click();
  });
});

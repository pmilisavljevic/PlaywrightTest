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
    await page.getByRole("link", { name: "PIM" }).click();
    await page.getByRole("button", { name: " Add" }).click();
    await page.getByPlaceholder("First Name").fill("Dragan");
    await page.getByPlaceholder("Last Name").fill("Nedeljkov");
    await page
      .locator(
        "//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']"
      )
      .fill("2812888");
    await page.getByRole("button", { name: "Save" }).click();
  });

  test("Edit employee", async () => {
    await page.getByRole("link", { name: "PIM" }).click();
    await page
      .locator(
        "//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']"
      )
      .fill("2812888");
    await page.getByRole("button", { name: "Search" }).click();
    await page
      .locator(
        "//body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[3]/div[1]/div[2]/div[1]/div[1]/div[9]/div[1]/button[1]"
      )
      .click();
    await page.getByPlaceholder("First Name").click();
    await page.getByPlaceholder("First Name").fill("AdraganEdit");
    await page
      .locator(
        "div[class='orangehrm-horizontal-padding orangehrm-vertical-padding'] button[type='submit']"
      )
      .click();
    await page.getByRole("link", { name: "PIM" }).click();
  });

  test("Delete employee", async () => {
    await page.getByRole("link", { name: "PIM" }).click();
    await page
      .locator(
        "//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']"
      )
      .fill("2812888");
    await page.getByRole("button", { name: "Search" }).click();
    await page
      .locator("//div[@class='orangehrm-paper-container']//button[2]")
      .click();
    await page.getByRole("button", { name: "Yes, Delete" }).click();
    await page.getByRole("link", { name: "PIM" }).click();
  });
});

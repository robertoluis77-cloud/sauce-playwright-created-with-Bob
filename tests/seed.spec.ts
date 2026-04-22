import { test, expect } from '@playwright/test';

test.describe('SauceDemo Seed Test', () => {
  test('seed - login and view products', async ({ page }) => {
    // Navigate to SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Login with standard user
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Verify successful login by checking products page
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(page.locator('.title')).toHaveText('Products');

    // Verify products are displayed
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
  });
});

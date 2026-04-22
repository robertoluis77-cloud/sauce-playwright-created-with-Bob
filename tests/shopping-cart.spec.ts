// spec: specs/shopping-cart.md
// seed: tests/seed.spec.ts

import { test, expect, Page } from '@playwright/test';

test.describe('Shopping Cart Tests', () => {
    // Helper function to login
    async function login(page: Page) {
        await page.goto('https://www.saucedemo.com/');
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('inventory-container')).toBeVisible();
    }

    test('CART-001: Adding Single Item to Cart', async ({ page }) => {
        // Login
        await login(page);

        // Click "Add to cart" button for "Sauce Labs Backpack"
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

        // Verify the button text changes to "Remove"
        await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();

        // Verify cart badge displays "1"
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Click on the shopping cart icon
        await page.click('.shopping_cart_link');

        // Verify cart page is displayed
        await expect(page.getByTestId('title')).toHaveText('Your Cart');

        // Verify "Sauce Labs Backpack" is listed in the cart
        const cartItem = page.locator('.cart_item');
        await expect(cartItem).toBeVisible();
        await expect(cartItem.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

        // Verify item price is correct
        await expect(cartItem.locator('.inventory_item_price')).toHaveText('$29.99');
    });

    test('CART-002: Adding Multiple Items to Cart', async ({ page }) => {
        // Login
        await login(page);

        // Add "Sauce Labs Backpack"
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Add "Sauce Labs Bike Light"
        await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

        // Add "Sauce Labs Bolt T-Shirt"
        await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

        // Click on the shopping cart icon
        await page.click('.shopping_cart_link');

        // Verify all 3 items are listed in the cart
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(3);

        // Verify each item name
        const itemNames = cartItems.locator('.inventory_item_name');
        await expect(itemNames.nth(0)).toHaveText('Sauce Labs Backpack');
        await expect(itemNames.nth(1)).toHaveText('Sauce Labs Bike Light');
        await expect(itemNames.nth(2)).toHaveText('Sauce Labs Bolt T-Shirt');
    });

    test('CART-003: Removing Item from Cart (Product Page)', async ({ page }) => {
        // Login
        await login(page);

        // Add "Sauce Labs Backpack" to cart
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Click "Remove" button for "Sauce Labs Backpack"
        await page.getByTestId('remove-sauce-labs-backpack').click();

        // Verify button text changes back to "Add to cart"
        await expect(page.getByTestId('add-to-cart-sauce-labs-backpack')).toBeVisible();

        // Verify cart badge is no longer visible
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

        // Click on shopping cart icon
        await page.click('.shopping_cart_link');

        // Verify cart is empty
        await expect(page.locator('.cart_item')).not.toBeVisible();
    });

    test('CART-004: Removing Item from Cart (Cart Page)', async ({ page }) => {
        // Login
        await login(page);

        // Add two items to cart
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

        // Click on shopping cart icon
        await page.click('.shopping_cart_link');

        // Verify both items are displayed
        await expect(page.locator('.cart_item')).toHaveCount(2);

        // Click "Remove" button for "Sauce Labs Backpack"
        await page.getByTestId('remove-sauce-labs-backpack').click();

        // Verify "Sauce Labs Backpack" is removed
        await expect(page.locator('.cart_item')).toHaveCount(1);

        // Verify cart badge shows "1"
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Verify "Sauce Labs Bike Light" is still in cart
        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Bike Light');
    });

    test('CART-005: Cart Badge Counter Updates', async ({ page }) => {
        // Login
        await login(page);

        // Verify cart badge is not visible initially
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

        // Add first item - verify badge shows "1"
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Add second item - verify badge shows "2"
        await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

        // Add third item - verify badge shows "3"
        await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

        // Remove one item - verify badge shows "2"
        await page.getByTestId('remove-sauce-labs-bolt-t-shirt').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

        // Remove another item - verify badge shows "1"
        await page.getByTestId('remove-sauce-labs-bike-light').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Remove last item - verify badge is no longer visible
        await page.getByTestId('remove-sauce-labs-backpack').click();
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });

    test('CART-006: Cart Persistence Across Pages', async ({ page }) => {
        // Login
        await login(page);

        // Add "Sauce Labs Backpack" to cart
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Click on product to view details
        await page.click('#item_4_title_link');
        await expect(page.getByTestId('inventory-item-name')).toBeVisible();

        // Verify cart badge still shows "1"
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Click "Back to products" button
        await page.getByTestId('back-to-products').click();

        // Verify cart badge still shows "1"
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Click shopping cart icon
        await page.click('.shopping_cart_link');

        // Verify "Sauce Labs Backpack" is still in cart
        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

        // Click "Continue Shopping" button
        await page.getByTestId('continue-shopping').click();

        // Verify cart badge still shows "1"
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Add another item to cart
        await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();

        // Verify cart badge shows "2"
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    });

    test('CART-007: Empty Cart State', async ({ page }) => {
        // Login
        await login(page);

        // Verify cart badge is not visible (cart is empty)
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

        // Click on shopping cart icon
        await page.click('.shopping_cart_link');

        // Verify "Your Cart" page is displayed
        await expect(page.getByTestId('title')).toHaveText('Your Cart');

        // Verify no items are shown in the cart
        await expect(page.locator('.cart_item')).not.toBeVisible();

        // Verify "Continue Shopping" button is visible
        await expect(page.getByTestId('continue-shopping')).toBeVisible();

        // Verify "Checkout" button is visible
        await expect(page.getByTestId('checkout')).toBeVisible();
    });

    test('CART-008: Add All Products to Cart', async ({ page }) => {
        // Login
        await login(page);

        // Add all 6 products to cart
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
        await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();
        await page.getByTestId('add-to-cart-sauce-labs-fleece-jacket').click();
        await page.getByTestId('add-to-cart-sauce-labs-onesie').click();
        await page.getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)').click();

        // Verify cart badge shows "6"
        await expect(page.locator('.shopping_cart_badge')).toHaveText('6');

        // Click shopping cart icon
        await page.click('.shopping_cart_link');

        // Verify all 6 items are displayed in cart
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(6);

        // Verify product names
        const itemNames = cartItems.locator('.inventory_item_name');
        await expect(itemNames.nth(0)).toHaveText('Sauce Labs Backpack');
        await expect(itemNames.nth(1)).toHaveText('Sauce Labs Bike Light');
        await expect(itemNames.nth(2)).toHaveText('Sauce Labs Bolt T-Shirt');
        await expect(itemNames.nth(3)).toHaveText('Sauce Labs Fleece Jacket');
        await expect(itemNames.nth(4)).toHaveText('Sauce Labs Onesie');
        await expect(itemNames.nth(5)).toContainText('Test.allTheThings()');
    });

    test('CART-009: Remove All Items from Cart', async ({ page }) => {
        // Login
        await login(page);

        // Add 3 items to cart
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
        await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

        // Click shopping cart icon
        await page.click('.shopping_cart_link');

        // Remove first item - verify badge shows "2"
        await page.getByTestId('remove-sauce-labs-backpack').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

        // Remove second item - verify badge shows "1"
        await page.getByTestId('remove-sauce-labs-bike-light').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Remove third item - verify badge disappears
        await page.getByTestId('remove-sauce-labs-bolt-t-shirt').click();
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

        // Verify cart is empty
        await expect(page.locator('.cart_item')).not.toBeVisible();
    });

    test('CART-010: Cart Badge Visibility', async ({ page }) => {
        // Login
        await login(page);

        // Verify cart badge is NOT visible when cart is empty
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

        // Add one item to cart
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

        // Verify cart badge IS visible and shows "1"
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Navigate to product details
        await page.click('#item_4_title_link');
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();

        // Navigate to cart page
        await page.click('.shopping_cart_link');
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();

        // Go back to products
        await page.getByTestId('continue-shopping').click();
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();

        // Remove the item from cart
        await page.getByTestId('remove-sauce-labs-backpack').click();

        // Verify cart badge is NO longer visible
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });
});

// Made with Bob

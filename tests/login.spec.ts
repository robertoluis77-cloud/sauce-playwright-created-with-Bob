// spec: https://www.saucedemo.com/
// seed: tests/seed.spec.ts

import { test, expect, Page } from '@playwright/test';

test.describe('Login Tests', () => {
    const validPassword = 'secret_sauce';

    async function gotoLogin(page: Page) {
        await page.goto('https://www.saucedemo.com/');
        await expect(page.getByTestId('login-button')).toBeVisible();
        await expect(page.getByTestId('username')).toBeVisible();
        await expect(page.getByTestId('password')).toBeVisible();
    }

    async function login(page: Page, username: string, password: string) {
        await page.getByTestId('username').fill(username);
        await page.getByTestId('password').fill(password);
        await page.getByTestId('login-button').click();
    }

    async function expectInventoryPage(page: Page) {
        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page.getByTestId('inventory-container')).toBeVisible();
        await expect(page.locator('.title')).toHaveText('Products');
    }

    async function expectLoginError(page: Page, message: string) {
        const errorBanner = page.getByTestId('error');
        await expect(errorBanner).toBeVisible();
        await expect(errorBanner).toContainText(message);
    }

    async function logout(page: Page) {
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await expect(page.getByTestId('logout-sidebar-link')).toBeVisible();
        await page.getByTestId('logout-sidebar-link').click();
        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByTestId('login-button')).toBeVisible();
    }

    test('LOGIN-001: Successful login with standard user', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Verify login form accessibility attributes are present
        await expect(page.getByTestId('username')).toHaveAttribute('placeholder', 'Username');
        await expect(page.getByTestId('password')).toHaveAttribute('placeholder', 'Password');
        await expect(page.getByTestId('login-button')).toHaveText('Login');

        // Login with standard user credentials
        await login(page, 'standard_user', validPassword);

        // Verify successful login by checking products page
        await expectInventoryPage(page);
        await expect(page.locator('.inventory_item')).toHaveCount(6);
    });

    test('LOGIN-002: Failed login with invalid username and password', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Submit invalid credentials
        await login(page, 'invalid_user', 'wrong_password');

        // Verify invalid credentials error is displayed
        await expectLoginError(page, 'Username and password do not match any user in this service');
        await expect(page).toHaveURL(/\/$/);
    });

    test('LOGIN-003: Failed login with locked out user', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Submit locked out user credentials
        await login(page, 'locked_out_user', validPassword);

        // Verify locked out message is displayed
        await expectLoginError(page, 'Sorry, this user has been locked out.');
        await expect(page).toHaveURL(/\/$/);
    });

    test('LOGIN-004: Failed login with missing username', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Submit form with missing username
        await login(page, '', validPassword);

        // Verify username required error is displayed
        await expectLoginError(page, 'Username is required');
    });

    test('LOGIN-005: Failed login with missing password', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Submit form with missing password
        await login(page, 'standard_user', '');

        // Verify password required error is displayed
        await expectLoginError(page, 'Password is required');
    });

    test('LOGIN-006: Failed login with missing username and password', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Submit form with both fields empty
        await login(page, '', '');

        // Verify the first validation error is displayed
        await expectLoginError(page, 'Username is required');
    });

    test('LOGIN-007: Session persists across page reload after login', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Login with standard user
        await login(page, 'standard_user', validPassword);
        await expectInventoryPage(page);

        // Reload the current page
        await page.reload();

        // Verify the authenticated session persists
        await expectInventoryPage(page);
    });

    test('LOGIN-008: Authenticated user can log out successfully', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Login with standard user
        await login(page, 'standard_user', validPassword);
        await expectInventoryPage(page);

        // Logout from the application menu
        await logout(page);

        // Verify protected page redirects back to login when revisited
        await page.goto('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByTestId('login-button')).toBeVisible();
    });

    test('LOGIN-009: Session can be reused in a new page within the same browser context', async ({ browser }) => {
        // Create a shared browser context and login in the first page
        const context = await browser.newContext();
        const firstPage = await context.newPage();
        await gotoLogin(firstPage);
        await login(firstPage, 'standard_user', validPassword);
        await expectInventoryPage(firstPage);

        // Open a second page in the same context
        const secondPage = await context.newPage();
        await secondPage.goto('https://www.saucedemo.com/inventory.html');

        // Verify the session is available in the new page
        await expectInventoryPage(secondPage);

        // Cleanup the browser context
        await context.close();
    });

    test('LOGIN-010: Concurrent login attempts succeed in isolated browser contexts', async ({ browser }) => {
        // Create two isolated browser contexts
        const contextOne = await browser.newContext();
        const contextTwo = await browser.newContext();
        const pageOne = await contextOne.newPage();
        const pageTwo = await contextTwo.newPage();

        // Navigate both pages to the login screen
        await gotoLogin(pageOne);
        await gotoLogin(pageTwo);

        // Login concurrently with two valid test users
        await Promise.all([
            login(pageOne, 'standard_user', validPassword),
            login(pageTwo, 'problem_user', validPassword),
        ]);

        // Verify both sessions authenticate successfully
        await expectInventoryPage(pageOne);
        await expectInventoryPage(pageTwo);

        // Cleanup the browser contexts
        await contextOne.close();
        await contextTwo.close();
    });

    test('LOGIN-011: Error banner can be dismissed after a failed login attempt', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Submit invalid credentials
        await login(page, 'invalid_user', 'wrong_password');
        await expectLoginError(page, 'Username and password do not match any user in this service');

        // Dismiss the error message
        await page.locator('.error-button').click();

        // Verify the error message is removed
        await expect(page.getByTestId('error')).not.toBeVisible();
    });

    test('LOGIN-012: Password field masks entered characters', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Verify password field uses secure input type
        await expect(page.getByTestId('password')).toHaveAttribute('type', 'password');

        // Fill the password field
        await page.getByTestId('password').fill(validPassword);

        // Verify the underlying value is stored while the field remains a password input
        await expect(page.getByTestId('password')).toHaveValue(validPassword);
        await expect(page.getByTestId('password')).toHaveAttribute('type', 'password');
    });

    test('LOGIN-013: Session expires after clearing storage and revisiting a protected page', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Login successfully
        await login(page, 'standard_user', validPassword);
        await expectInventoryPage(page);

        // Clear client-side session storage and cookies
        await page.context().clearCookies();
        await page.evaluate(() => {
            window.localStorage.clear();
            window.sessionStorage.clear();
        });

        // Revisit a protected page
        await page.goto('https://www.saucedemo.com/inventory.html');

        // Verify the user is returned to the login screen
        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByTestId('login-button')).toBeVisible();
    });

    test('LOGIN-014: Direct navigation to inventory requires authentication', async ({ page }) => {
        // Navigate directly to a protected route without logging in
        await page.goto('https://www.saucedemo.com/inventory.html');

        // Verify unauthenticated access is redirected to login
        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByTestId('login-button')).toBeVisible();
        await expectLoginError(page, "You can only access '/inventory.html' when you are logged in.");
    });

    test('LOGIN-015: Password reset, MFA, SSO, and token refresh flows are not exposed in the UI', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Verify there is no forgot password link
        await expect(page.getByRole('link', { name: /forgot password/i })).toHaveCount(0);

        // Verify there are no OAuth or SSO login options
        await expect(page.getByRole('button', { name: /sign in with|continue with|sso|oauth/i })).toHaveCount(0);
        await expect(page.getByRole('link', { name: /sign in with|continue with|sso|oauth/i })).toHaveCount(0);

        // Verify there is no MFA or verification code prompt
        await expect(page.getByPlaceholder(/verification code|one-time password|otp|mfa/i)).toHaveCount(0);
        await expect(page.getByText(/multi-factor|two-factor|verification code|otp/i)).toHaveCount(0);

        // Verify no token refresh UX is exposed before or after authentication
        await login(page, 'standard_user', validPassword);
        await expectInventoryPage(page);
        await expect(page.getByRole('button', { name: /refresh token|reauthenticate/i })).toHaveCount(0);
    });

    test('LOGIN-016: Repeated invalid login attempts do not trigger rate limiting in the current application', async ({ page }) => {
        // Navigate to SauceDemo login page
        await gotoLogin(page);

        // Submit invalid credentials multiple times
        for (let attempt = 0; attempt < 5; attempt++) {
            await login(page, 'invalid_user', `wrong_password_${attempt}`);
            await expectLoginError(page, 'Username and password do not match any user in this service');
        }

        // Verify no rate limit message or temporary block appears
        await expect(page.getByText(/too many requests|rate limit|try again later|temporarily locked/i)).toHaveCount(0);
    });
});

// Made with Bob
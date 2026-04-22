# Shopping Cart Test Plan

**Application:** SauceDemo (https://www.saucedemo.com/)  
**Seed Test:** tests/seed.spec.ts  
**Created:** 2026-04-06  
**Test Focus:** Shopping cart functionality including add/remove items, badge updates, and cart persistence

---

## Prerequisites

- User must be logged in as `standard_user` with password `secret_sauce`
- Products page must be loaded successfully
- All 6 products should be visible

---

## Test Scenarios

### Login Tests

#### LOGIN-001: Successful login with standard user

**Priority:** Critical
**Description:** Verify that a user can successfully log in with valid credentials

**Steps:**

1. Navigate to SauceDemo login page (https://www.saucedemo.com/)
2. Verify login form is displayed with username, password fields and login button
3. Verify username field has placeholder "Username"
4. Verify password field has placeholder "Password"
5. Verify login button displays "Login" text
6. Enter username: `standard_user`
7. Enter password: `secret_sauce`
8. Click "Login" button
9. Verify redirect to inventory page (URL contains `inventory.html`)
10. Verify inventory container is visible
11. Verify page title shows "Products"
12. Verify 6 products are displayed

**Expected Results:**

- User successfully logs in
- Redirected to products/inventory page
- All products are visible

---

#### LOGIN-002: Failed login with invalid username and password

**Priority:** High
**Description:** Verify appropriate error message when invalid credentials are provided

**Steps:**

1. Navigate to SauceDemo login page
2. Enter username: `invalid_user`
3. Enter password: `wrong_password`
4. Click "Login" button
5. Verify error banner is displayed
6. Verify error message: "Username and password do not match any user in this service"
7. Verify user remains on login page

**Expected Results:**

- Login fails with appropriate error message
- User remains on login page
- Error banner is visible

---

#### LOGIN-003: Failed login with locked out user

**Priority:** High
**Description:** Verify locked out user cannot log in

**Steps:**

1. Navigate to SauceDemo login page
2. Enter username: `locked_out_user`
3. Enter password: `secret_sauce`
4. Click "Login" button
5. Verify error banner is displayed
6. Verify error message: "Sorry, this user has been locked out."
7. Verify user remains on login page

**Expected Results:**

- Login fails for locked out user
- Appropriate error message is displayed
- User cannot access the application

---

#### LOGIN-004: Failed login with missing username

**Priority:** High
**Description:** Verify validation error when username is not provided

**Steps:**

1. Navigate to SauceDemo login page
2. Leave username field empty
3. Enter password: `secret_sauce`
4. Click "Login" button
5. Verify error banner is displayed
6. Verify error message: "Username is required"

**Expected Results:**

- Login fails with validation error
- Username required message is displayed

---

#### LOGIN-005: Failed login with missing password

**Priority:** High
**Description:** Verify validation error when password is not provided

**Steps:**

1. Navigate to SauceDemo login page
2. Enter username: `standard_user`
3. Leave password field empty
4. Click "Login" button
5. Verify error banner is displayed
6. Verify error message: "Password is required"

**Expected Results:**

- Login fails with validation error
- Password required message is displayed

---

#### LOGIN-006: Failed login with missing username and password

**Priority:** Medium
**Description:** Verify validation error when both fields are empty

**Steps:**

1. Navigate to SauceDemo login page
2. Leave username field empty
3. Leave password field empty
4. Click "Login" button
5. Verify error banner is displayed
6. Verify error message: "Username is required"

**Expected Results:**

- Login fails with validation error
- First validation error (username) is displayed

---

#### LOGIN-007: Session persists across page reload after login

**Priority:** Medium
**Description:** Verify authenticated session persists after page reload

**Steps:**

1. Navigate to SauceDemo login page
2. Login with username: `standard_user` and password: `secret_sauce`
3. Verify successful login to inventory page
4. Reload the page (F5 or browser refresh)
5. Verify user remains on inventory page
6. Verify inventory container is still visible
7. Verify page title still shows "Products"

**Expected Results:**

- Session persists after page reload
- User remains authenticated
- Inventory page displays correctly

---

#### LOGIN-008: Authenticated user can log out successfully

**Priority:** High
**Description:** Verify user can successfully log out

**Steps:**

1. Navigate to SauceDemo login page
2. Login with username: `standard_user` and password: `secret_sauce`
3. Verify successful login to inventory page
4. Click "Open Menu" button (hamburger menu)
5. Verify logout link is visible
6. Click "Logout" link
7. Verify redirect to login page
8. Verify login button is visible
9. Navigate directly to inventory page (https://www.saucedemo.com/inventory.html)
10. Verify redirect back to login page
11. Verify login button is visible

**Expected Results:**

- User successfully logs out
- Redirected to login page
- Session is cleared
- Protected pages redirect to login

---

#### LOGIN-009: Session can be reused in a new page within the same browser context

**Priority:** Medium
**Description:** Verify session is shared across tabs in same browser context

**Steps:**

1. Open first browser tab/page
2. Navigate to SauceDemo login page
3. Login with username: `standard_user` and password: `secret_sauce`
4. Verify successful login to inventory page
5. Open second tab/page in same browser context
6. Navigate to inventory page (https://www.saucedemo.com/inventory.html)
7. Verify inventory page loads without requiring login
8. Verify inventory container is visible
9. Verify page title shows "Products"

**Expected Results:**

- Session is shared across tabs in same context
- No additional login required in new tab
- Authenticated pages accessible in both tabs

---

#### LOGIN-010: Concurrent login attempts succeed in isolated browser contexts

**Priority:** Low
**Description:** Verify multiple users can log in simultaneously in isolated contexts

**Steps:**

1. Create first isolated browser context
2. Create second isolated browser context
3. In first context: Navigate to login page
4. In second context: Navigate to login page
5. In first context: Login with `standard_user` and `secret_sauce`
6. In second context: Login with `problem_user` and `secret_sauce`
7. Verify both contexts successfully authenticate
8. Verify first context shows inventory page
9. Verify second context shows inventory page

**Expected Results:**

- Both login attempts succeed
- Sessions are isolated between contexts
- Both users can access inventory page

---

#### LOGIN-011: Error banner can be dismissed after a failed login attempt

**Priority:** Low
**Description:** Verify error message can be dismissed

**Steps:**

1. Navigate to SauceDemo login page
2. Enter username: `invalid_user`
3. Enter password: `wrong_password`
4. Click "Login" button
5. Verify error banner is displayed
6. Click the error dismiss button (X button)
7. Verify error banner is no longer visible

**Expected Results:**

- Error banner can be dismissed
- Error message disappears after clicking dismiss button

---

#### LOGIN-012: Password field masks entered characters

**Priority:** Medium
**Description:** Verify password field uses secure input type

**Steps:**

1. Navigate to SauceDemo login page
2. Verify password field has `type="password"` attribute
3. Enter password: `secret_sauce`
4. Verify password field value is stored
5. Verify password field still has `type="password"` attribute
6. Verify characters are masked (not visible as plain text)

**Expected Results:**

- Password field uses secure input type
- Characters are masked
- Password value is stored correctly

---

#### LOGIN-013: Session expires after clearing storage and revisiting a protected page

**Priority:** Medium
**Description:** Verify session expires when storage is cleared

**Steps:**

1. Navigate to SauceDemo login page
2. Login with username: `standard_user` and password: `secret_sauce`
3. Verify successful login to inventory page
4. Clear browser cookies
5. Clear localStorage
6. Clear sessionStorage
7. Navigate to inventory page (https://www.saucedemo.com/inventory.html)
8. Verify redirect to login page
9. Verify login button is visible

**Expected Results:**

- Session expires after clearing storage
- User redirected to login page
- Protected pages require re-authentication

---

#### LOGIN-014: Direct navigation to inventory requires authentication

**Priority:** High
**Description:** Verify unauthenticated users cannot access protected pages

**Steps:**

1. Open browser without any existing session
2. Navigate directly to inventory page (https://www.saucedemo.com/inventory.html)
3. Verify redirect to login page
4. Verify login button is visible
5. Verify error message: "You can only access '/inventory.html' when you are logged in."

**Expected Results:**

- Unauthenticated access is blocked
- User redirected to login page
- Appropriate error message displayed

---

#### LOGIN-015: Password reset, MFA, SSO, and token refresh flows are not exposed in the UI

**Priority:** Low
**Description:** Verify advanced authentication features are not present

**Steps:**

1. Navigate to SauceDemo login page
2. Verify no "Forgot Password" link is present
3. Verify no OAuth/SSO login options are present
4. Verify no MFA/verification code fields are present
5. Login with username: `standard_user` and password: `secret_sauce`
6. Verify no token refresh or reauthenticate buttons are present

**Expected Results:**

- No password reset functionality
- No SSO/OAuth options
- No MFA prompts
- No token refresh UI

---

#### LOGIN-016: Repeated invalid login attempts do not trigger rate limiting in the current application

**Priority:** Low
**Description:** Verify no rate limiting on failed login attempts

**Steps:**

1. Navigate to SauceDemo login page
2. Attempt login with invalid credentials 5 times:
   - Attempt 1: `invalid_user` / `wrong_password_0`
   - Attempt 2: `invalid_user` / `wrong_password_1`
   - Attempt 3: `invalid_user` / `wrong_password_2`
   - Attempt 4: `invalid_user` / `wrong_password_3`
   - Attempt 5: `invalid_user` / `wrong_password_4`
3. Verify each attempt shows standard error message
4. Verify no rate limit or temporary lock message appears
5. Verify no "too many requests" or "try again later" message

**Expected Results:**

- No rate limiting implemented
- All attempts fail with standard error
- No temporary account lock

---

### Shopping Cart Tests

#### CART-001: Adding Single Item to Cart

**Priority:** High
**Description:** Verify that a single item can be added to the shopping cart

**Steps:**

1. Navigate to SauceDemo and login as standard_user
2. Verify products page is displayed
3. Click "Add to cart" button for "Sauce Labs Backpack"
4. Verify the button text changes to "Remove"
5. Verify cart badge displays "1"
6. Click on the shopping cart icon
7. Verify cart page is displayed
8. Verify "Sauce Labs Backpack" is listed in the cart
9. Verify item name, description, and price are correct

**Expected Results:**

- Item is successfully added to cart
- Cart badge shows correct count (1)
- Item appears in cart with correct details

---

#### CART-002: Adding Multiple Items to Cart

**Priority:** High
**Description:** Verify that multiple items can be added to the shopping cart

**Steps:**

1. Navigate to SauceDemo and login as standard_user
2. Verify products page is displayed
3. Click "Add to cart" for "Sauce Labs Backpack"
4. Verify cart badge shows "1"
5. Click "Add to cart" for "Sauce Labs Bike Light"
6. Verify cart badge shows "2"
7. Click "Add to cart" for "Sauce Labs Bolt T-Shirt"
8. Verify cart badge shows "3"
9. Click on the shopping cart icon
10. Verify all 3 items are listed in the cart
11. Verify each item has correct name, description, and price

**Expected Results:**

- All items are successfully added to cart
- Cart badge increments correctly (1, 2, 3)
- All items appear in cart with correct details

---

#### CART-003: Removing Item from Cart (Product Page)

**Priority:** High
**Description:** Verify that an item can be removed from cart via the products page

**Steps:**

1. Navigate to SauceDemo and login as standard_user
2. Add "Sauce Labs Backpack" to cart
3. Verify cart badge shows "1"
4. Click "Remove" button for "Sauce Labs Backpack"
5. Verify button text changes back to "Add to cart"
6. Verify cart badge is no longer visible (or shows 0)
7. Click on shopping cart icon
8. Verify cart is empty
9. Verify "Your Cart" page shows no items

**Expected Results:**

- Item is successfully removed from cart
- Cart badge updates correctly
- Cart page shows empty state

---

#### CART-004: Removing Item from Cart (Cart Page)

**Priority:** High
**Description:** Verify that an item can be removed from the cart page

**Steps:**

1. Navigate to SauceDemo and login as standard_user
2. Add "Sauce Labs Backpack" and "Sauce Labs Bike Light" to cart
3. Verify cart badge shows "2"
4. Click on shopping cart icon
5. Verify both items are displayed in cart
6. Click "Remove" button for "Sauce Labs Backpack"
7. Verify "Sauce Labs Backpack" is removed from cart
8. Verify cart badge shows "1"
9. Verify "Sauce Labs Bike Light" is still in cart

**Expected Results:**

- Specific item is removed from cart
- Other items remain in cart
- Cart badge updates correctly

---

#### CART-005: Cart Badge Counter Updates

**Priority:** High
**Description:** Verify cart badge counter updates correctly as items are added and removed

**Steps:**

1. Navigate to SauceDemo and login as standard_user
2. Verify cart badge is not visible initially
3. Add first item - verify badge shows "1"
4. Add second item - verify badge shows "2"
5. Add third item - verify badge shows "3"
6. Remove one item - verify badge shows "2"
7. Remove another item - verify badge shows "1"
8. Remove last item - verify badge is no longer visible

**Expected Results:**

- Badge appears when first item is added
- Badge increments correctly with each addition
- Badge decrements correctly with each removal
- Badge disappears when cart is empty

---

#### CART-006: Cart Persistence Across Pages

**Priority:** Medium
**Description:** Verify cart contents persist when navigating between pages

**Steps:**

1. Navigate to SauceDemo and login as standard_user
2. Add "Sauce Labs Backpack" to cart
3. Verify cart badge shows "1"
4. Click on any product to view details
5. Verify cart badge still shows "1"
6. Click "Back to products" button
7. Verify cart badge still shows "1"
8. Click shopping cart icon
9. Verify "Sauce Labs Backpack" is still in cart
10. Click "Continue Shopping" button
11. Verify cart badge still shows "1"
12. Add another item to cart
13. Verify cart badge shows "2"

**Expected Results:**

- Cart contents persist across all page navigations
- Cart badge remains accurate throughout navigation
- Items remain in cart when returning to products page

---

#### CART-007: Empty Cart State

**Priority:** Medium
**Description:** Verify the empty cart state displays correctly

**Steps:**

1. Navigate to SauceDemo and login as standard_user
2. Verify cart badge is not visible (cart is empty)
3. Click on shopping cart icon
4. Verify "Your Cart" page is displayed
5. Verify no items are shown in the cart
6. Verify cart item list is empty
7. Verify "Continue Shopping" button is visible
8. Verify "Checkout" button is visible (may be disabled or enabled)

**Expected Results:**

- Empty cart page displays correctly
- No items are shown
- Navigation buttons are available
- Page layout is correct

---

#### CART-008: Add All Products to Cart

**Priority:** Medium
**Description:** Verify all 6 products can be added to cart

**Steps:**

1. Navigate to SauceDemo and login as standard_user
2. Add all 6 products to cart one by one:
   - Sauce Labs Backpack
   - Sauce Labs Bike Light
   - Sauce Labs Bolt T-Shirt
   - Sauce Labs Fleece Jacket
   - Sauce Labs Onesie
   - Test.allTheThings() T-Shirt (Red)
3. Verify cart badge shows "6" after all items added
4. Click shopping cart icon
5. Verify all 6 items are displayed in cart
6. Verify each item has correct details

**Expected Results:**

- All 6 products can be added to cart
- Cart badge shows "6"
- All items display correctly in cart

---

#### CART-009: Remove All Items from Cart

**Priority:** Medium
**Description:** Verify all items can be removed from cart

**Steps:**

1. Navigate to SauceDemo and login as standard_user
2. Add 3 items to cart
3. Verify cart badge shows "3"
4. Click shopping cart icon
5. Remove first item - verify badge shows "2"
6. Remove second item - verify badge shows "1"
7. Remove third item - verify badge disappears
8. Verify cart is empty
9. Verify empty cart state is displayed

**Expected Results:**

- All items can be removed successfully
- Cart badge updates correctly after each removal
- Empty cart state displays when all items removed

---

#### CART-010: Cart Badge Visibility

**Priority:** Low
**Description:** Verify cart badge visibility behavior

**Steps:**

1. Navigate to SauceDemo and login as standard_user
2. Verify cart badge is NOT visible when cart is empty
3. Add one item to cart
4. Verify cart badge IS visible and shows "1"
5. Navigate to different pages (product details, cart page)
6. Verify cart badge remains visible on all pages
7. Remove the item from cart
8. Verify cart badge is NO longer visible

**Expected Results:**

- Badge is hidden when cart is empty
- Badge is visible when cart has items
- Badge visibility is consistent across all pages

---

## Test Data

### Products Available:

1. **Sauce Labs Backpack** - $29.99
2. **Sauce Labs Bike Light** - $9.99
3. **Sauce Labs Bolt T-Shirt** - $15.99
4. **Sauce Labs Fleece Jacket** - $49.99
5. **Sauce Labs Onesie** - $7.99
6. **Test.allTheThings() T-Shirt (Red)** - $15.99

### Test User:

- Username: `standard_user`
- Password: `secret_sauce`

---

## Locators Reference

Based on seed test analysis:

- Username field: `[data-test="username"]`
- Password field: `[data-test="password"]`
- Login button: `[data-test="login-button"]`
- Inventory container: `[data-test="inventory-container"]`
- Page title: `.title`
- Inventory items: `.inventory_item`
- Shopping cart link: `.shopping_cart_link`
- Shopping cart badge: `.shopping_cart_badge`
- Add to cart buttons: `[data-test="add-to-cart-{product-name}"]`
- Remove buttons: `[data-test="remove-{product-name}"]`
- Cart items: `.cart_item`

---

## Notes

- All tests should start from a clean state (fresh login)
- Cart should be empty at the start of each test
- Tests should be independent and not rely on execution order
- Verify both visual elements and functional behavior
- Consider testing on multiple browsers (Chromium, Firefox, WebKit)

---

## Success Criteria

- All test scenarios pass successfully
- Cart functionality works as expected
- Badge counter is accurate
- Cart persistence is maintained
- Empty cart state displays correctly
- No console errors during test execution

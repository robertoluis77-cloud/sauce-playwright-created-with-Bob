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

### 1. Adding Single Item to Cart

**Test ID:** CART-001  
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

### 2. Adding Multiple Items to Cart

**Test ID:** CART-002  
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

### 3. Removing Item from Cart (Product Page)

**Test ID:** CART-003  
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

### 4. Removing Item from Cart (Cart Page)

**Test ID:** CART-004  
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

### 5. Cart Badge Counter Updates

**Test ID:** CART-005  
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

### 6. Cart Persistence Across Pages

**Test ID:** CART-006  
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

### 7. Empty Cart State

**Test ID:** CART-007  
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

### 8. Add All Products to Cart

**Test ID:** CART-008  
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

### 9. Remove All Items from Cart

**Test ID:** CART-009  
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

### 10. Cart Badge Visibility

**Test ID:** CART-010  
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

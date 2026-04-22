# Playwright Test Agents - Usage Examples

This document provides practical examples of using the three Playwright Test Agents with SauceDemo.

## Table of Contents

- [Planner Agent Examples](#planner-agent-examples)
- [Generator Agent Examples](#generator-agent-examples)
- [Healer Agent Examples](#healer-agent-examples)
- [Complete Workflows](#complete-workflows)

---

## Planner Agent Examples

### Example 1: Shopping Cart Functionality

**Prompt:**
```
@playwright-test-planner

Explore the SauceDemo shopping cart and create a comprehensive test plan.

Focus on:
- Adding single and multiple items
- Removing items from cart
- Cart badge counter updates
- Cart persistence across pages
- Empty cart state

Seed file: tests/seed.spec.ts
Save as: specs/shopping-cart.md
```

**Expected Output:**
- Detailed test plan in `specs/shopping-cart.md`
- Multiple test scenarios with step-by-step instructions
- Clear success criteria for each scenario

---

### Example 2: Checkout Flow

**Prompt:**
```
@playwright-test-planner

Create a test plan for the complete checkout process on SauceDemo.

Include:
- Form validation (first name, last name, zip code)
- Required field validation
- Order review page
- Order completion
- Success message verification

Seed file: tests/seed.spec.ts
Save as: specs/checkout-flow.md
```

---

### Example 3: Product Filtering and Sorting

**Prompt:**
```
@playwright-test-planner

Analyze the product catalog filtering and sorting features.

Test scenarios:
- Sort by Name (A to Z)
- Sort by Name (Z to A)
- Sort by Price (low to high)
- Sort by Price (high to low)
- Verify product order after each sort
- Verify all 6 products remain visible

Seed file: tests/seed.spec.ts
Save as: specs/product-sorting.md
```

---

### Example 4: Authentication Scenarios

**Prompt:**
```
@playwright-test-planner

Create a comprehensive authentication test plan for SauceDemo.

Cover:
- Valid login (standard_user)
- Invalid username
- Invalid password
- Empty credentials
- Locked out user
- Logout functionality
- Session persistence

Seed file: tests/seed.spec.ts
Save as: specs/authentication.md
```

---

### Example 5: Product Details

**Prompt:**
```
@playwright-test-planner

Explore individual product pages and create test scenarios.

Include:
- Navigate to product details
- Verify product information (name, description, price)
- Add to cart from details page
- Back to products navigation
- Test for all 6 products

Seed file: tests/seed.spec.ts
Save as: specs/product-details.md
```

---

## Generator Agent Examples

### Example 1: Generate Shopping Cart Tests

**Prerequisites:** Run Planner Agent first to create `specs/shopping-cart.md`

**Prompt:**
```
@playwright-test-generator

Generate Playwright tests from the shopping cart test plan.

Source: specs/shopping-cart.md
Output: tests/shopping-cart.spec.ts

Generate all test scenarios from the plan.
```

**Expected Output:**
- Complete test file at `tests/shopping-cart.spec.ts`
- All scenarios from the plan converted to executable tests
- Proper assertions and waits included

---

### Example 2: Generate Specific Test Scenario

**Prompt:**
```
@playwright-test-generator

Generate only the "Add Single Item" test from specs/shopping-cart.md

Output: tests/add-single-item.spec.ts
```

---

### Example 3: Generate Checkout Tests

**Prerequisites:** Run Planner Agent first to create `specs/checkout-flow.md`

**Prompt:**
```
@playwright-test-generator

Generate tests for the checkout flow.

Source: specs/checkout-flow.md
Output: tests/checkout-flow.spec.ts

Include all validation scenarios.
```

---

### Example 4: Generate Authentication Tests

**Prerequisites:** Run Planner Agent first to create `specs/authentication.md`

**Prompt:**
```
@playwright-test-generator

Create authentication tests from the test plan.

Source: specs/authentication.md
Output: tests/authentication.spec.ts

Generate tests for:
- Valid login
- Invalid credentials
- Locked out user
- Logout
```

---

### Example 5: Generate Product Sorting Tests

**Prerequisites:** Run Planner Agent first to create `specs/product-sorting.md`

**Prompt:**
```
@playwright-test-generator

Generate product sorting and filtering tests.

Source: specs/product-sorting.md
Output: tests/product-sorting.spec.ts
```

---

## Healer Agent Examples

### Example 1: Fix Locator Issues

**Scenario:** Test fails because a button's data-test attribute changed

**Prompt:**
```
@playwright-test-healer

Fix the failing test in tests/shopping-cart.spec.ts

Test name: "Add Single Item"
Error: Locator '[data-test="add-to-cart-sauce-labs-backpack"]' not found

Please update the locator and re-run the test.
```

**What the Healer Does:**
1. Analyzes the current page structure
2. Finds the correct locator for the "Add to cart" button
3. Updates the test code
4. Re-runs the test to verify the fix

---

### Example 2: Fix Timing Issues

**Scenario:** Test fails due to race condition

**Prompt:**
```
@playwright-test-healer

Fix timing issue in tests/checkout-flow.spec.ts

Test name: "Complete checkout with valid data"
Error: Element not visible when trying to click

Add appropriate waits and fix the test.
```

---

### Example 3: Fix Multiple Failures

**Scenario:** Several tests fail after UI update

**Prompt:**
```
@playwright-test-healer

Fix all failing tests in tests/shopping-cart.spec.ts

Multiple tests are failing after the recent UI update.
Please analyze and fix all issues.
```

---

### Example 4: Fix Assertion Failures

**Scenario:** Expected values changed

**Prompt:**
```
@playwright-test-healer

Fix assertion failure in tests/product-sorting.spec.ts

Test name: "Sort by price low to high"
Error: Expected product order doesn't match actual order

Update the expected values based on current product data.
```

---

### Example 5: Fix Data-Dependent Test

**Scenario:** Test data is no longer valid

**Prompt:**
```
@playwright-test-healer

Fix data issue in tests/authentication.spec.ts

Test name: "Login with locked out user"
Error: User credentials no longer work

Update test data and fix the test.
```

---

## Complete Workflows

### Workflow 1: End-to-End Shopping Experience

#### Step 1: Plan
```
@playwright-test-planner

Create a comprehensive test plan for the complete shopping experience:
1. Login
2. Browse products
3. Add items to cart
4. Proceed to checkout
5. Complete purchase

Seed: tests/seed.spec.ts
Save as: specs/end-to-end-shopping.md
```

#### Step 2: Generate
```
@playwright-test-generator

Generate tests from specs/end-to-end-shopping.md
Output: tests/end-to-end-shopping.spec.ts
```

#### Step 3: Run
```bash
npx playwright test tests/end-to-end-shopping.spec.ts
```

#### Step 4: Fix (if needed)
```
@playwright-test-healer

Fix any failing tests in tests/end-to-end-shopping.spec.ts
```

---

### Workflow 2: Comprehensive Product Testing

#### Step 1: Plan Product Catalog
```
@playwright-test-planner

Create test plan for product catalog features:
- Product listing
- Product details
- Product images
- Product prices
- Product descriptions

Seed: tests/seed.spec.ts
Save as: specs/product-catalog.md
```

#### Step 2: Plan Product Interactions
```
@playwright-test-planner

Create test plan for product interactions:
- Add to cart from listing
- Add to cart from details
- Remove from cart
- Quantity management

Seed: tests/seed.spec.ts
Save as: specs/product-interactions.md
```

#### Step 3: Generate All Tests
```
@playwright-test-generator

Generate tests from specs/product-catalog.md
Output: tests/product-catalog.spec.ts
```

```
@playwright-test-generator

Generate tests from specs/product-interactions.md
Output: tests/product-interactions.spec.ts
```

#### Step 4: Run Test Suite
```bash
npx playwright test tests/product-*.spec.ts
```

---

### Workflow 3: User Journey Testing

#### Step 1: Plan Different User Types
```
@playwright-test-planner

Create test plans for different user types on SauceDemo:
- Standard user (happy path)
- Problem user (encounters issues)
- Performance glitch user (slow responses)

For each user type, test:
- Login
- Product browsing
- Cart operations
- Checkout

Seed: tests/seed.spec.ts
Save as: specs/user-journeys.md
```

#### Step 2: Generate Tests
```
@playwright-test-generator

Generate tests from specs/user-journeys.md
Output: tests/user-journeys.spec.ts

Create separate test cases for each user type.
```

#### Step 3: Run and Monitor
```bash
npx playwright test tests/user-journeys.spec.ts --reporter=html
npx playwright show-report
```

---

## Tips for Effective Agent Usage

### For Planner Agent:

1. **Be Specific**: Provide clear, detailed instructions about what to test
2. **Reference Seed**: Always specify the seed file
3. **Organize**: Use descriptive file names for test plans
4. **Iterate**: Start with high-level plans, then create detailed ones

### For Generator Agent:

1. **Verify Plans First**: Review test plans before generating tests
2. **One at a Time**: Generate one test file at a time for better control
3. **Review Output**: Always review generated tests before running
4. **Customize**: Feel free to modify generated tests as needed

### For Healer Agent:

1. **Provide Context**: Give the test name and error message
2. **Be Patient**: Healing may take multiple iterations
3. **Review Changes**: Check what the Healer changed
4. **Learn Patterns**: Observe common fixes to improve your tests

---

## Common Patterns

### Pattern 1: Test Data Setup

When tests need specific data:

```
@playwright-test-planner

Create test plan with data setup:
1. Login as standard_user
2. Add 3 specific items to cart
3. Test checkout with these items

Seed: tests/seed.spec.ts
```

### Pattern 2: Negative Testing

For error scenarios:

```
@playwright-test-planner

Create negative test scenarios:
- Invalid form inputs
- Missing required fields
- Boundary conditions
- Error message validation

Seed: tests/seed.spec.ts
```

### Pattern 3: Cross-Browser Testing

The generated tests automatically run on all configured browsers (Chromium, Firefox, WebKit).

To run on specific browser:
```bash
npx playwright test --project=chromium
```

---

## Troubleshooting Agent Issues

### Issue: Planner doesn't explore enough

**Solution:**
```
@playwright-test-planner

Please explore more thoroughly. Click through all navigation items,
test all interactive elements, and document edge cases.

[Your original prompt]
```

### Issue: Generator creates incomplete tests

**Solution:**
```
@playwright-test-generator

The generated test is missing some scenarios from the plan.
Please generate a complete test including all scenarios from:
specs/[your-plan].md
```

### Issue: Healer can't fix the test

**Solution:**
1. Run the test manually in debug mode
2. Identify the exact issue
3. Provide more specific instructions to the Healer
4. Consider manual fix if the issue is complex

---

## Next Steps

After mastering the agents:

1. **Create Custom Test Plans**: Design your own test scenarios
2. **Build Test Suites**: Organize tests by feature or user journey
3. **Integrate CI/CD**: Automate test execution
4. **Monitor Results**: Track test health over time
5. **Maintain Tests**: Use Healer for ongoing maintenance

Happy Testing! 🎭

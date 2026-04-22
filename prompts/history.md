# Prompt History

## Session: SauceDemo shopping cart

### 1. Planner prompt

```text
@playwright-test-planner

Create a comprehensive test plan for SauceDemo shopping cart functionality.

Include:
- Adding single and multiple items to cart
- Removing items from cart
- Cart badge counter updates
- Cart persistence across pages
- Empty cart state

Seed file: tests/seed.spec.ts
Save as: specs/shopping-cart.md
```

**Outcome**

- Created: `specs/shopping-cart.md`

---

### 2. Generator prompt

```text
@playwright-test-generator

Generate tests from specs/shopping-cart.md
Output: tests/shopping-cart.spec.ts
```

**Outcome**

- Created: `tests/shopping-cart.spec.ts`

---

### 3. Refactor prompt

```text
'tests/shopping-cart.spec.ts' change page.locator to page.getByTestId
```

**Outcome**

- Updated `data-test` based selectors to `page.getByTestId(...)`
- Left non-`data-test` selectors unchanged

---

### 4. Execution prompt

```text
'tests/shopping-cart.spec.ts' execute it
```

**Outcome**

- Executed Playwright test file
- Result: `30 passed`
- Projects:
  - Chromium: passed
  - Firefox: passed
  - WebKit: passed

---

### 5. Report prompt

```text
how to see the execution report
```

**Outcome**

- Recommended commands:
  - `npx playwright show-report`
  - `npm run test:report`
  - `open playwright-report/index.html`

---

## Files involved

- `tests/seed.spec.ts`
- `specs/shopping-cart.md`
- `tests/shopping-cart.spec.ts`
- `playwright-report/index.html`

## Notes

Use this file to keep reusable prompts and a lightweight history of outcomes.

# Quick Start Guide - Playwright Test Agents

Get started with Playwright Test Agents in 5 minutes!

## 🚀 Installation (Already Done!)

The project is already set up with:
- ✅ Playwright installed
- ✅ TypeScript configured
- ✅ Test Agents initialized
- ✅ Seed test created
- ✅ Browsers installed

## 📝 Step 1: Verify Setup

Run the seed test to verify everything works:

```bash
npm run test:seed
```

Expected output: ✅ 1 test passed

## 🎯 Step 2: Use the Planner Agent

Open VS Code and use GitHub Copilot Chat:

```
@playwright-test-planner

Create a test plan for adding items to the shopping cart on SauceDemo.

Include:
- Add single item
- Add multiple items
- Verify cart badge updates
- Remove items from cart

Seed: tests/seed.spec.ts
Save as: specs/shopping-cart.md
```

The Planner will:
1. Explore the SauceDemo application
2. Create detailed test scenarios
3. Save the plan to `specs/shopping-cart.md`

## 🔧 Step 3: Generate Tests

After the Planner creates the test plan:

```
@playwright-test-generator

Generate tests from specs/shopping-cart.md
Output: tests/shopping-cart.spec.ts
```

The Generator will:
1. Read the test plan
2. Execute each step to verify it works
3. Create executable Playwright tests
4. Save to `tests/shopping-cart.spec.ts`

## ▶️ Step 4: Run Your Tests

```bash
# Run all tests
npm test

# Run in headed mode (see the browser)
npm run test:headed

# Run with UI mode (interactive)
npm run test:ui

# View test report
npm run test:report
```

## 🩹 Step 5: Fix Failing Tests (if needed)

If a test fails:

```
@playwright-test-healer

Fix the failing test in tests/shopping-cart.spec.ts
Test name: "Add single item"
```

The Healer will:
1. Analyze the failure
2. Suggest and apply fixes
3. Re-run the test until it passes

## 📚 Next Steps

### Explore More Features

1. **Authentication Testing**
   ```
   @playwright-test-planner
   
   Create test plan for SauceDemo authentication:
   - Valid login
   - Invalid credentials
   - Locked out user
   - Logout
   
   Seed: tests/seed.spec.ts
   Save as: specs/authentication.md
   ```

2. **Checkout Flow**
   ```
   @playwright-test-planner
   
   Create test plan for complete checkout process:
   - Form validation
   - Order review
   - Order completion
   
   Seed: tests/seed.spec.ts
   Save as: specs/checkout.md
   ```

3. **Product Sorting**
   ```
   @playwright-test-planner
   
   Create test plan for product sorting:
   - Sort by name (A-Z, Z-A)
   - Sort by price (low-high, high-low)
   
   Seed: tests/seed.spec.ts
   Save as: specs/product-sorting.md
   ```

### Available NPM Scripts

```bash
npm test                 # Run all tests
npm run test:headed      # Run with visible browser
npm run test:debug       # Run in debug mode
npm run test:seed        # Run seed test only
npm run test:chromium    # Run on Chrome only
npm run test:firefox     # Run on Firefox only
npm run test:webkit      # Run on Safari only
npm run test:report      # View HTML report
npm run test:ui          # Interactive UI mode
```

## 🎓 Learning Resources

- **README.md** - Complete documentation
- **AGENT_USAGE_EXAMPLES.md** - Detailed examples for each agent
- [Playwright Docs](https://playwright.dev)
- [Playwright Test Agents](https://playwright.dev/docs/test-agents)

## 💡 Pro Tips

1. **Start Simple**: Begin with basic test plans, then add complexity
2. **Review Plans**: Always review test plans before generating tests
3. **Use Seed Tests**: Reference your seed test in all agent prompts
4. **Iterate**: Use the Healer to improve tests over time
5. **Organize**: Keep test plans organized in the `specs/` directory

## 🆘 Need Help?

- Check **README.md** for detailed documentation
- Review **AGENT_USAGE_EXAMPLES.md** for specific examples
- Run tests in debug mode: `npm run test:debug`
- View test reports: `npm run test:report`

## 🎉 You're Ready!

You now have a complete Playwright Test Agents framework for testing SauceDemo.

Start creating test plans with the Planner Agent and watch your test coverage grow automatically!

Happy Testing! 🎭

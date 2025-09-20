# E2E Testing with Playwright

## Overview

This directory contains end-to-end tests for AW Components Lit using Playwright. The tests focus on accessibility compliance, user interactions, and component behavior across multiple browsers.

## Test Coverage

### Components Tested
- **aw-button**: Button interactions, accessibility, keyboard navigation
- **aw-text-input**: Form input behavior, validation, accessibility features  
- **aw-menu**: Complex keyboard navigation, ARIA implementation, menu interactions

### Test Categories

#### 1. Functional Testing
- Component rendering and visibility
- User interaction handling (click, type, keyboard)
- Event dispatching and handling
- State management and updates

#### 2. Accessibility Testing
- WCAG 2.1 AA compliance verification
- Screen reader compatibility
- Keyboard navigation patterns
- Focus management and indicators
- ARIA attributes and states
- High contrast mode support

#### 3. Cross-Browser Testing
- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)
- Mobile Chrome
- Mobile Safari

## Running Tests

### Prerequisites
```bash
# Install Playwright browsers (first time only)
npm run test:install
```

### Test Commands
```bash
# Run all tests (headless)
npm test

# Run tests with browser UI visible
npm run test:headed

# Debug tests interactively
npm run test:debug

# Run tests with Playwright UI
npm run test:ui

# Run specific test file
npx playwright test aw-button.spec.ts

# Run tests in specific browser
npx playwright test --project=firefox
```

### Test Configuration

The tests are configured to:
- Start Storybook automatically before running
- Test against multiple browsers and viewports
- Take screenshots on failures
- Generate detailed HTML reports
- Capture traces for debugging

## Test Structure

### Test Organization
```
tests/e2e/
├── aw-button.spec.ts       # Button component tests
├── aw-text-input.spec.ts   # Text input component tests
├── aw-menu.spec.ts         # Menu component tests
└── README.md               # This documentation
```

### Test Patterns

#### Component Rendering
```typescript
test('should render with default properties', async ({ page }) => {
  await page.goto('/iframe.html?id=component-story');
  const component = page.locator('aw-component');
  await expect(component).toBeVisible();
});
```

#### Accessibility Testing
```typescript
test('should have proper ARIA attributes', async ({ page }) => {
  const element = page.locator('[role="button"]');
  await expect(element).toHaveAttribute('aria-label', 'Expected Label');
  await expect(element).toHaveAttribute('aria-expanded', 'false');
});
```

#### Keyboard Navigation
```typescript
test('should support keyboard navigation', async ({ page }) => {
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveText('First Item');
  
  await page.keyboard.press('ArrowDown');
  await expect(page.locator(':focus')).toHaveText('Second Item');
});
```

## Accessibility Testing Standards

### WCAG 2.1 AA Compliance
The tests verify compliance with:

- **1.3.1 Info and Relationships**: Proper semantic markup
- **1.4.3 Contrast**: Focus indicators and color contrast
- **2.1.1 Keyboard**: Full keyboard accessibility
- **2.1.2 No Keyboard Trap**: Proper focus management
- **2.4.3 Focus Order**: Logical tab sequence
- **2.4.7 Focus Visible**: Clear focus indicators
- **3.3.1 Error Identification**: Error message accessibility
- **4.1.2 Name, Role, Value**: Complete ARIA implementation

### Screen Reader Testing
Tests verify:
- Proper label association
- ARIA live region announcements
- Descriptive accessible names
- Semantic role implementation

### Keyboard Navigation Testing
Tests verify:
- Tab order and focus management
- Arrow key navigation (where applicable)
- Enter/Space activation
- Escape key handling
- Home/End key support

## Best Practices

### Writing Tests
1. **Focus on user behavior** - Test how users actually interact with components
2. **Test accessibility first** - Ensure components work for all users
3. **Use semantic selectors** - Prefer role and label selectors over CSS classes
4. **Test across browsers** - Verify consistent behavior
5. **Include mobile testing** - Test touch interactions and responsive behavior

### Test Maintenance
1. Keep tests simple and focused
2. Use descriptive test names
3. Group related tests with `test.describe()`
4. Use proper setup/teardown with `beforeEach()`
5. Update tests when component APIs change

## Continuous Integration

Tests can be integrated into CI/CD pipelines:

```bash
# Run tests in CI mode
CI=true npm test
```

CI mode:
- Fails build on test failures
- Retries failed tests
- Uses single worker for stability
- Generates artifacts for debugging

## Debugging Failed Tests

### Viewing Test Reports
```bash
# Open HTML report
npx playwright show-report
```

### Debug Mode
```bash
# Run in debug mode with inspector
npm run test:debug
```

### Screenshots and Videos
Failed tests automatically capture:
- Screenshots at failure point
- Full page traces for debugging
- Video recordings (when enabled)

## Performance Considerations

### Test Speed
- Tests run in parallel by default
- Use `test.serial()` for tests that must run sequentially
- Mock heavy operations when possible
- Use efficient selectors

### Resource Usage
- Browsers are shared across tests when possible
- Tests clean up after themselves
- Use `test.beforeEach()` for common setup

## Contributing

When adding new tests:
1. Follow existing patterns and naming conventions
2. Include both functional and accessibility tests
3. Test across multiple browsers when relevant
4. Add documentation for complex test scenarios
5. Verify tests pass consistently

---

**Last Updated**: 2025-08-25  
**Coverage**: Button, TextInput, Menu components  
**Status**: Comprehensive E2E and accessibility testing implemented
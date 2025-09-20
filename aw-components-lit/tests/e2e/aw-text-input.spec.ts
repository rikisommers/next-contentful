import { test, expect } from '@playwright/test';

test.describe('AW Text Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-atoms-textinput--default&viewMode=story');
    await page.waitForSelector('aw-text-input');
  });

  test('should render with default properties', async ({ page }) => {
    const textInput = page.locator('aw-text-input');
    await expect(textInput).toBeVisible();
    
    const input = textInput.locator('input');
    const label = textInput.locator('label');
    
    await expect(input).toBeVisible();
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Label');
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('should handle text input and dispatch events', async ({ page }) => {
    const input = page.locator('aw-text-input input');
    
    // Listen for custom input event
    await page.addInitScript(() => {
      window.inputEvents = [];
      window.addEventListener('aw-text-input-input', (e) => {
        window.inputEvents.push(e.detail);
      });
    });
    
    await input.fill('Hello World');
    
    // Check input value
    await expect(input).toHaveValue('Hello World');
    
    // Check if custom events were fired
    const events = await page.evaluate(() => window.inputEvents);
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].value).toBe('Hello World');
  });

  test('should support different input types', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-atoms-textinput--input-types&viewMode=story');
    await page.waitForSelector('aw-text-input');
    
    const inputs = page.locator('aw-text-input input');
    const expectedTypes = ['text', 'email', 'password', 'url', 'tel', 'search'];
    
    for (let i = 0; i < expectedTypes.length; i++) {
      const input = inputs.nth(i);
      await expect(input).toHaveAttribute('type', expectedTypes[i]);
    }
  });

  test('should handle validation states', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-atoms-textinput--validation&viewMode=story');
    await page.waitForSelector('aw-text-input');
    
    // Find error state input
    const errorInput = page.locator('aw-text-input[has_error] input');
    await expect(errorInput).toHaveAttribute('aria-invalid', 'true');
    
    // Find error message
    const errorMessage = page.locator('aw-text-input[has_error] .aw-text-input__error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveAttribute('role', 'alert');
    await expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-atoms-textinput--accessibility&viewMode=story');
    await page.waitForSelector('aw-text-input');
    
    const inputs = page.locator('aw-text-input input');
    const count = await inputs.count();
    
    // Tab through all inputs
    for (let i = 0; i < count; i++) {
      await page.keyboard.press('Tab');
      await expect(inputs.nth(i)).toBeFocused();
    }
  });

  test('should have proper focus indicators', async ({ page }) => {
    const input = page.locator('aw-text-input input');
    
    await input.focus();
    
    // Check for focus styles
    const borderColor = await input.evaluate((el) => {
      return getComputedStyle(el).borderColor;
    });
    
    const boxShadow = await input.evaluate((el) => {
      return getComputedStyle(el).boxShadow;
    });
    
    // Should have focus indicator (border change or box shadow)
    expect(borderColor !== 'rgb(209, 213, 219)' || boxShadow !== 'none').toBe(true);
  });

  test('should handle disabled state', async ({ page }) => {
    await page.goto('/iframe.html?args=disabled:true&id=components-atoms-textinput--default&viewMode=story');
    await page.waitForSelector('aw-text-input');
    
    const input = page.locator('aw-text-input input');
    
    await expect(input).toBeDisabled();
    
    // Should not accept input
    await input.fill('test', { force: true });
    await expect(input).toHaveValue('');
  });

  test('should handle required state with proper indicators', async ({ page }) => {
    await page.goto('/iframe.html?args=required:true&id=components-atoms-textinput--default&viewMode=story');
    await page.waitForSelector('aw-text-input');
    
    const input = page.locator('aw-text-input input');
    const label = page.locator('aw-text-input label');
    
    await expect(input).toHaveAttribute('required');
    
    // Should have asterisk indicator
    const asterisk = label.locator('span[aria-hidden="true"]');
    await expect(asterisk).toBeVisible();
    await expect(asterisk).toHaveText('*');
  });
});

test.describe('AW Text Input Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-atoms-textinput--accessibility&viewMode=story');
    await page.waitForSelector('aw-text-input');
  });

  test('should have proper label association', async ({ page }) => {
    const textInputs = page.locator('aw-text-input');
    const count = await textInputs.count();
    
    for (let i = 0; i < count; i++) {
      const container = textInputs.nth(i);
      const input = container.locator('input');
      const label = container.locator('label');
      
      if (await label.count() > 0) {
        const inputId = await input.getAttribute('id');
        const labelFor = await label.getAttribute('for');
        
        expect(inputId).not.toBeNull();
        expect(labelFor).toBe(inputId);
      }
    }
  });

  test('should support aria-describedby for help text', async ({ page }) => {
    const passwordInput = page.locator('aw-text-input[aria_describedby="password-help"] input');
    
    await expect(passwordInput).toHaveAttribute('aria-describedby', 'password-help');
    
    const helpText = page.locator('#password-help');
    await expect(helpText).toBeVisible();
  });

  test('should announce errors with live regions', async ({ page }) => {
    const errorInput = page.locator('aw-text-input[has_error] input');
    const errorMessage = page.locator('aw-text-input[has_error] .aw-text-input__error');
    
    await expect(errorInput).toHaveAttribute('aria-invalid', 'true');
    await expect(errorMessage).toHaveAttribute('role', 'alert');
    await expect(errorMessage).toHaveAttribute('aria-live', 'polite');
    
    // Error should be associated with input via aria-describedby
    const errorId = await errorMessage.getAttribute('id');
    const inputDescribedBy = await errorInput.getAttribute('aria-describedby');
    
    expect(inputDescribedBy).toContain(errorId);
  });

  test('should support screen reader navigation', async ({ page }) => {
    const inputs = page.locator('aw-text-input input');
    
    for (let i = 0; i < await inputs.count(); i++) {
      const input = inputs.nth(i);
      
      // Should have accessible name
      const accessibleName = await input.evaluate((el) => {
        const label = document.querySelector(`label[for="${el.id}"]`);
        const ariaLabel = el.getAttribute('aria-label');
        return ariaLabel || label?.textContent?.trim() || '';
      });
      
      expect(accessibleName).not.toBe('');
    }
  });

  test('should handle form validation properly', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-atoms-textinput--form-example&viewMode=story');
    await page.waitForSelector('form');
    
    const form = page.locator('form');
    const emailInput = form.locator('aw-text-input[input_type="email"] input');
    const submitButton = form.locator('button[type="submit"]');
    
    // Try to submit with invalid email
    await emailInput.fill('invalid-email');
    await submitButton.click();
    
    // Check if browser validation kicks in
    const validity = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(validity).toBe(false);
  });

  test('should maintain accessible focus order', async ({ page }) => {
    const inputs = page.locator('aw-text-input input');
    const count = await inputs.count();
    
    // Should be able to tab through in logical order
    await page.keyboard.press('Tab'); // Focus first input
    
    for (let i = 1; i < count; i++) {
      await page.keyboard.press('Tab');
      await expect(inputs.nth(i)).toBeFocused();
    }
  });

  test('should support high contrast mode', async ({ page }) => {
    // Enable high contrast simulation
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    
    const input = page.locator('aw-text-input input').first();
    await input.focus();
    
    // Check that focus is still visible in high contrast
    const outline = await input.evaluate((el) => {
      return getComputedStyle(el).outline;
    });
    
    expect(outline).not.toBe('none');
  });
});
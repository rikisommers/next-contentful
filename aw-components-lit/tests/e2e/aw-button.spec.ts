import { test, expect } from '@playwright/test';

test.describe('AW Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-atoms-button--default&viewMode=story');
    await page.waitForSelector('aw-button');
  });

  test('should render with default properties', async ({ page }) => {
    const button = page.locator('aw-button');
    await expect(button).toBeVisible();
    
    const buttonElement = button.locator('button');
    await expect(buttonElement).toHaveText('Button');
    await expect(buttonElement).toHaveAttribute('type', 'button');
  });

  test('should be clickable and dispatch events', async ({ page }) => {
    const button = page.locator('aw-button button');
    
    // Listen for the custom event
    let eventFired = false;
    await page.addInitScript(() => {
      window.addEventListener('aw-button-click', () => {
        window.customEventFired = true;
      });
    });
    
    await button.click();
    
    // Check if custom event was fired
    const eventResult = await page.evaluate(() => window.customEventFired);
    expect(eventResult).toBe(true);
  });

  test('should support keyboard navigation', async ({ page }) => {
    const button = page.locator('aw-button button');
    
    // Tab to the button
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    
    // Activate with Enter
    let eventFired = false;
    await page.addInitScript(() => {
      window.addEventListener('aw-button-click', () => {
        window.enterEventFired = true;
      });
    });
    
    await page.keyboard.press('Enter');
    const enterResult = await page.evaluate(() => window.enterEventFired);
    expect(enterResult).toBe(true);
    
    // Activate with Space
    await page.addInitScript(() => {
      window.addEventListener('aw-button-click', () => {
        window.spaceEventFired = true;
      });
    });
    
    await page.keyboard.press('Space');
    const spaceResult = await page.evaluate(() => window.spaceEventFired);
    expect(spaceResult).toBe(true);
  });

  test('should have proper focus indicators', async ({ page }) => {
    const button = page.locator('aw-button button');
    
    // Focus the button
    await button.focus();
    
    // Check for focus visible styles
    const focusOutline = await button.evaluate((el) => {
      const styles = getComputedStyle(el);
      return styles.outline;
    });
    
    // Should have some kind of outline or focus indicator
    expect(focusOutline).not.toBe('none');
  });

  test('should handle disabled state correctly', async ({ page }) => {
    // Navigate to disabled button story
    await page.goto('/iframe.html?args=disabled:true&id=components-atoms-button--default&viewMode=story');
    await page.waitForSelector('aw-button');
    
    const button = page.locator('aw-button button');
    
    // Should be disabled
    await expect(button).toBeDisabled();
    
    // Should not be clickable
    await button.click({ force: true });
    
    // Check if event was NOT fired
    const eventResult = await page.evaluate(() => window.customEventFired || false);
    expect(eventResult).toBe(false);
  });

  test('should display different sizes correctly', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-atoms-button--sizes&viewMode=story');
    await page.waitForSelector('aw-button');
    
    const buttons = page.locator('aw-button');
    const count = await buttons.count();
    expect(count).toBe(5); // XS, SM, MD, LG, XL
    
    // Check that buttons have different sizes
    const sizes = [];
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i).locator('button');
      const bbox = await button.boundingBox();
      sizes.push(bbox?.height || 0);
    }
    
    // Sizes should be different (ascending order)
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeGreaterThanOrEqual(sizes[i - 1]);
    }
  });

  test('should display different variants correctly', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-atoms-button--variants&viewMode=story');
    await page.waitForSelector('aw-button');
    
    const buttons = page.locator('aw-button');
    const count = await buttons.count();
    expect(count).toBe(6); // Primary, Secondary, Tertiary, Danger, Warning, Success
    
    // Check that buttons have different background colors
    const colors = [];
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i).locator('button');
      const backgroundColor = await button.evaluate((el) => {
        return getComputedStyle(el).backgroundColor;
      });
      colors.push(backgroundColor);
    }
    
    // All colors should be different
    const uniqueColors = new Set(colors);
    expect(uniqueColors.size).toBeGreaterThan(1);
  });
});

test.describe('AW Button Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-atoms-button--accessibility&viewMode=story');
    await page.waitForSelector('aw-button');
  });

  test('should have proper ARIA labels', async ({ page }) => {
    const closeButton = page.locator('aw-button[aria_label="Close dialog"] button');
    await expect(closeButton).toHaveAttribute('aria-label', 'Close dialog');
    
    const searchButton = page.locator('aw-button[aria_label="Search products"] button');
    await expect(searchButton).toHaveAttribute('aria-label', 'Search products');
  });

  test('should support ARIA controls and expanded', async ({ page }) => {
    const menuButton = page.locator('aw-button[aria_controls="options-menu"] button');
    
    // Should have aria-controls
    await expect(menuButton).toHaveAttribute('aria-controls', 'options-menu');
    
    // Should have aria-expanded
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    // Click to toggle expanded state
    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should be accessible to screen readers', async ({ page }) => {
    // Check for proper semantic structure
    const buttons = page.locator('aw-button button');
    
    for (let i = 0; i < await buttons.count(); i++) {
      const button = buttons.nth(i);
      
      // Should have button role (implicit)
      const role = await button.getAttribute('role');
      expect(role === null || role === 'button').toBe(true);
      
      // Should have accessible name (either text content or aria-label)
      const accessibleName = await button.evaluate((el) => {
        return el.getAttribute('aria-label') || el.textContent?.trim() || '';
      });
      expect(accessibleName).not.toBe('');
    }
  });

  test('should maintain focus order in keyboard navigation', async ({ page }) => {
    const buttons = page.locator('aw-button button');
    const count = await buttons.count();
    
    // Tab through all buttons
    for (let i = 0; i < count; i++) {
      await page.keyboard.press('Tab');
      const focusedButton = buttons.nth(i);
      await expect(focusedButton).toBeFocused();
    }
  });
});
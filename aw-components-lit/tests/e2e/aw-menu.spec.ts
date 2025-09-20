import { test, expect } from '@playwright/test';

test.describe('AW Menu Component', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with menu component
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/src/components/navigation/aw-menu/aw-menu.ts"></script>
          <script type="module" src="/src/components/navigation/aw-menu-item/aw-menu-item.ts"></script>
        </head>
        <body>
          <aw-menu trigger_label="Test Menu" aria_label="Test menu">
            <aw-menu-item slot="menu-content">Item 1</aw-menu-item>
            <aw-menu-item slot="menu-content">Item 2</aw-menu-item>
            <aw-menu-item slot="menu-content">Item 3</aw-menu-item>
          </aw-menu>
        </body>
      </html>
    `);
    await page.waitForSelector('aw-menu');
  });

  test('should render with trigger button', async ({ page }) => {
    const menu = page.locator('aw-menu');
    const trigger = menu.locator('.menu__trigger');
    
    await expect(menu).toBeVisible();
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveText('Test Menu');
  });

  test('should open and close on click', async ({ page }) => {
    const trigger = page.locator('aw-menu .menu__trigger');
    const dropdown = page.locator('aw-menu .menu__dropdown');
    
    // Initially closed
    await expect(dropdown).not.toHaveClass(/menu__dropdown--open/);
    
    // Click to open
    await trigger.click();
    await expect(dropdown).toHaveClass(/menu__dropdown--open/);
    
    // Click to close
    await trigger.click();
    await expect(dropdown).not.toHaveClass(/menu__dropdown--open/);
  });

  test('should close on escape key', async ({ page }) => {
    const trigger = page.locator('aw-menu .menu__trigger');
    const dropdown = page.locator('aw-menu .menu__dropdown');
    
    // Open menu
    await trigger.click();
    await expect(dropdown).toHaveClass(/menu__dropdown--open/);
    
    // Press escape
    await page.keyboard.press('Escape');
    await expect(dropdown).not.toHaveClass(/menu__dropdown--open/);
    
    // Focus should return to trigger
    await expect(trigger).toBeFocused();
  });

  test('should close when clicking outside', async ({ page }) => {
    const trigger = page.locator('aw-menu .menu__trigger');
    const dropdown = page.locator('aw-menu .menu__dropdown');
    
    // Open menu
    await trigger.click();
    await expect(dropdown).toHaveClass(/menu__dropdown--open/);
    
    // Click outside
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await expect(dropdown).not.toHaveClass(/menu__dropdown--open/);
  });

  test('should support keyboard navigation through menu items', async ({ page }) => {
    const trigger = page.locator('aw-menu .menu__trigger');
    const menuItems = page.locator('aw-menu-item');
    
    // Open menu
    await trigger.click();
    
    // Tab to first item or use arrow keys
    await page.keyboard.press('ArrowDown');
    await expect(menuItems.first()).toBeFocused();
    
    // Navigate with arrow down
    await page.keyboard.press('ArrowDown');
    await expect(menuItems.nth(1)).toBeFocused();
    
    // Navigate with arrow down again
    await page.keyboard.press('ArrowDown');
    await expect(menuItems.nth(2)).toBeFocused();
    
    // Should wrap to first item
    await page.keyboard.press('ArrowDown');
    await expect(menuItems.first()).toBeFocused();
    
    // Navigate up
    await page.keyboard.press('ArrowUp');
    await expect(menuItems.nth(2)).toBeFocused();
  });

  test('should support Home and End keys', async ({ page }) => {
    const trigger = page.locator('aw-menu .menu__trigger');
    const menuItems = page.locator('aw-menu-item');
    
    // Open menu and navigate to middle item
    await trigger.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(menuItems.nth(1)).toBeFocused();
    
    // Press Home to go to first item
    await page.keyboard.press('Home');
    await expect(menuItems.first()).toBeFocused();
    
    // Press End to go to last item
    await page.keyboard.press('End');
    await expect(menuItems.nth(2)).toBeFocused();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const trigger = page.locator('aw-menu .menu__trigger');
    const dropdown = page.locator('aw-menu .menu__dropdown');
    
    // Trigger should have proper ARIA attributes
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-label', 'Test Menu');
    
    // Open menu
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    
    // Dropdown should have menu role
    await expect(dropdown).toHaveAttribute('role', 'menu');
    await expect(dropdown).toHaveAttribute('aria-label', 'Menu');
  });

  test('should close menu on item selection', async ({ page }) => {
    const trigger = page.locator('aw-menu .menu__trigger');
    const dropdown = page.locator('aw-menu .menu__dropdown');
    const firstItem = page.locator('aw-menu-item').first();
    
    // Open menu
    await trigger.click();
    await expect(dropdown).toHaveClass(/menu__dropdown--open/);
    
    // Click menu item
    await firstItem.click();
    
    // Menu should close
    await expect(dropdown).not.toHaveClass(/menu__dropdown--open/);
  });

  test('should handle disabled state', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/src/components/navigation/aw-menu/aw-menu.ts"></script>
        </head>
        <body>
          <aw-menu trigger_label="Disabled Menu" disabled>
            <aw-menu-item slot="menu-content">Item 1</aw-menu-item>
          </aw-menu>
        </body>
      </html>
    `);
    
    const trigger = page.locator('aw-menu .menu__trigger');
    const dropdown = page.locator('aw-menu .menu__dropdown');
    
    // Should be disabled
    await expect(trigger).toBeDisabled();
    
    // Should not open when clicked
    await trigger.click({ force: true });
    await expect(dropdown).not.toHaveClass(/menu__dropdown--open/);
  });
});

test.describe('AW Menu Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/src/components/navigation/aw-menu/aw-menu.ts"></script>
          <script type="module" src="/src/components/navigation/aw-menu-item/aw-menu-item.ts"></script>
        </head>
        <body>
          <aw-menu 
            trigger_label="Accessible Menu" 
            aria_label="Main navigation menu"
            aria_describedby="menu-help">
            <aw-menu-item slot="menu-content">Dashboard</aw-menu-item>
            <aw-menu-item slot="menu-content">Settings</aw-menu-item>
            <aw-menu-item slot="menu-content">Profile</aw-menu-item>
          </aw-menu>
          <p id="menu-help">Use arrow keys to navigate menu items</p>
        </body>
      </html>
    `);
  });

  test('should have complete ARIA implementation', async ({ page }) => {
    const trigger = page.locator('aw-menu .menu__trigger');
    const dropdown = page.locator('aw-menu .menu__dropdown');
    
    // Trigger ARIA attributes
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-label', 'Accessible Menu');
    await expect(trigger).toHaveAttribute('aria-describedby', 'menu-help');
    
    // Open menu
    await trigger.click();
    
    // Updated ARIA state
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    
    // Dropdown ARIA attributes
    await expect(dropdown).toHaveAttribute('role', 'menu');
    await expect(dropdown).toHaveAttribute('aria-label', 'Main navigation menu');
  });

  test('should maintain focus management', async ({ page }) => {
    const trigger = page.locator('aw-menu .menu__trigger');
    const menuItems = page.locator('aw-menu-item');
    
    // Focus trigger
    await trigger.focus();
    await expect(trigger).toBeFocused();
    
    // Open menu
    await trigger.click();
    
    // First menu item should receive focus when opened via keyboard
    await page.keyboard.press('ArrowDown');
    await expect(menuItems.first()).toBeFocused();
    
    // Close with Escape
    await page.keyboard.press('Escape');
    
    // Focus should return to trigger
    await expect(trigger).toBeFocused();
  });

  test('should support screen reader announcements', async ({ page }) => {
    const trigger = page.locator('aw-menu .menu__trigger');
    const dropdown = page.locator('aw-menu .menu__dropdown');
    
    // Listen for ARIA live region updates
    let announcements = [];
    await page.exposeFunction('captureAnnouncement', (text) => {
      announcements.push(text);
    });
    
    // Open menu
    await trigger.click();
    
    // Check for proper ARIA states that screen readers will announce
    const expanded = await trigger.getAttribute('aria-expanded');
    const hasPopup = await trigger.getAttribute('aria-haspopup');
    const menuRole = await dropdown.getAttribute('role');
    
    expect(expanded).toBe('true');
    expect(hasPopup).toBe('menu');
    expect(menuRole).toBe('menu');
  });

  test('should work with high contrast mode', async ({ page }) => {
    // Enable high contrast
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    
    const trigger = page.locator('aw-menu .menu__trigger');
    const dropdown = page.locator('aw-menu .menu__dropdown');
    
    // Should still be visible and functional
    await expect(trigger).toBeVisible();
    
    await trigger.click();
    await expect(dropdown).toBeVisible();
    await expect(dropdown).toHaveClass(/menu__dropdown--open/);
    
    // Focus indicators should be visible
    await trigger.focus();
    const outline = await trigger.evaluate((el) => getComputedStyle(el).outline);
    expect(outline).not.toBe('none');
  });

  test('should handle touch interactions', async ({ page }) => {
    // Simulate mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const trigger = page.locator('aw-menu .menu__trigger');
    const dropdown = page.locator('aw-menu .menu__dropdown');
    
    // Touch to open
    await trigger.tap();
    await expect(dropdown).toHaveClass(/menu__dropdown--open/);
    
    // Touch outside to close
    await page.tap('body', { position: { x: 10, y: 10 } });
    await expect(dropdown).not.toHaveClass(/menu__dropdown--open/);
  });

  test('should support reduced motion preferences', async ({ page }) => {
    // Enable reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    const trigger = page.locator('aw-menu .menu__trigger');
    const dropdown = page.locator('aw-menu .menu__dropdown');
    
    // Should still function but with reduced animations
    await trigger.click();
    await expect(dropdown).toHaveClass(/menu__dropdown--open/);
    
    // Check for transition properties
    const transition = await dropdown.evaluate((el) => getComputedStyle(el).transition);
    // Should have short or no transition for reduced motion
    expect(transition === 'none' || transition.includes('0s')).toBe(true);
  });
});
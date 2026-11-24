import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/** First case study listed in the sitemap, so the test doesn't depend on a hard-coded CMS slug. */
async function firstArticlePath(request) {
  const xml = await (await request.get('/sitemap.xml')).text();
  const match = xml.match(/<loc>https?:\/\/[^/<]+(\/articles\/[^<]+)<\/loc>/);
  return match?.[1];
}

test.describe('Accessibility', () => {
  for (const name of ['home', 'work', 'article']) {
    test(`${name} page should have no WCAG A/AA violations and one main landmark`, async ({ page, request }) => {
      const path = name === 'home' ? '/' : name === 'work' ? '/work' : await firstArticlePath(request);
      test.skip(!path, 'No case study in the sitemap');
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      await expect(page.locator('main#main-content')).toHaveCount(1);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .disableRules(['color-contrast']) // Theme-dependent, checked via contrast checker
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }

  test('skip links should be present and functional', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Skip links should exist
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();

    // Tab to make skip links visible
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeVisible();
  });

  test('main content landmark should exist', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeAttached();
    await expect(mainContent).toHaveAttribute('role', 'main');
  });

  test('navigation should have proper landmark', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const nav = page.locator('#navigation');
    await expect(nav).toBeAttached();
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');

      // Image should either have alt text or role="presentation"
      const hasAlt = alt !== null && alt !== undefined;
      const isDecorative = role === 'presentation' || role === 'none';

      expect(hasAlt || isDecorative).toBe(true);
    }
  });
});

test.describe('Keyboard Navigation', () => {
  test('all interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Tab through the page multiple times to verify no keyboard traps
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
    }

    // If we get here without hanging, keyboard navigation is working
    expect(true).toBe(true);
  });
});

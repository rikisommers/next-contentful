import { test, expect } from '@playwright/test';

// A case study with `protected` ticked in Contentful.
const slug = process.env.E2E_PROTECTED_SLUG || 'appsharing';
// The site's PAGE_PASSWORD; the unlock test is skipped without it.
const password = process.env.E2E_PAGE_PASSWORD;

test.describe('Password-protected case study', () => {
  test('content is not in the page until unlocked', async ({ page, request }) => {
    const html = await (await request.get(`/articles/${slug}`)).text();
    expect(html).toContain('"csblocksCollection":null');
    expect((await request.get(`/api/protected-post?slug=${slug}`)).status()).toBe(401);

    await page.goto(`/articles/${slug}`);
    await page.getByLabel('This case study is password protected.').fill('wrong-password');
    await page.getByRole('button', { name: 'Unlock' }).click();
    await expect(page.locator('form').getByRole('alert')).toHaveText('Password is incorrect');
  });

  test('the right password unlocks it and is remembered', async ({ page }) => {
    test.skip(!password, 'Set E2E_PAGE_PASSWORD to run');
    await page.goto(`/articles/${slug}`);
    await page.getByLabel('This case study is password protected.').fill(password);
    await page.getByRole('button', { name: 'Unlock' }).click();
    await expect(page.locator('form')).toHaveCount(0);
    await expect(page.locator('main#main-content h1')).toHaveCount(1);

    await page.reload();
    await expect(page.getByLabel('This case study is password protected.')).toHaveCount(0);
    await expect(page.locator('main#main-content h1')).toHaveCount(1);
  });
});

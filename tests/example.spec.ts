import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});



test('test demo', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('banner').click();
  await page.getByText('PlaywrightDocsAPINode.jsNode.').click();
  await page.getByRole('heading', { name: 'Playwright enables reliable' }).click();
  await page.getByText('Get startedStar81k+').click();
  await page.getByRole('link', { name: 'API' }).click();
  await page.getByRole('heading', { name: 'Playwright Library' }).click();
});

test('api reference accessible', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // Find and click API link
  await page.getByRole('link', { name: 'API' }).click();
  
  // Verify API page loads
  await expect(page.getByRole('heading', { name: /Playwright Library|API/ })).toBeVisible();
});

test('page has main features section', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // Check for key feature headings
  await expect(page.getByText(/cross-browser|all browsers/i)).toBeVisible({ timeout: 5000 });
});

test('github link present', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // Look for GitHub link in header/footer
  const githubLink = page.getByRole('link', { name: /github/i }).first();
  await expect(githubLink).toBeVisible();
});

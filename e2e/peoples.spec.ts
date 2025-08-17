import { test, expect } from '@playwright/test';
import './mocks';

test('Renders list and paginates', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Person 2')).toBeVisible();

  await page.getByRole('button', { name: /^2$/ }).click();

  await expect(page.getByText('Person 11')).toBeVisible();

  const input = page.getByRole('textbox').or(page.getByPlaceholder(/Search/i));

  await input.fill('Luke');

  await expect(page.getByText('Luke Person 2')).toBeVisible();

  await expect(page).toHaveURL(/query=Luke/i);
  await expect(page).toHaveURL(/page=1/i);
});

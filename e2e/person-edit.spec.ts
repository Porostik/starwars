import { test, expect } from '@playwright/test';
import './mocks';

test('Renders list and paginates', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Person 2').click();
  await expect(page.getByRole('button', { name: /Save/i })).toBeHidden();
  const input = page.getByRole('textbox').first();
  await input.fill('Luke');
  await page.getByRole('button', { name: /Save/i }).click();
  await page.getByRole('link', { name: /Back/i }).click();
  await expect(page.getByText(/Luke/i)).toBeVisible();
});

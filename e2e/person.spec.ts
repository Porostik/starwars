import { test, expect } from '@playwright/test';
import './mocks';

test('Renders list and paginates', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Person 2').click();

  await expect(page.getByText('Person 2')).toBeVisible();

  const films = await page.getByText(/Film [0-9]/gi).all();
  expect(films.length).toBe(2);
});

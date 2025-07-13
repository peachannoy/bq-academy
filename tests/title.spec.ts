import { test, expect } from '@playwright/test';
import { HomePage } from '../infrastructure/homePage';

test('Homepage smoke test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  // Expect a title to contain beQualified
  await homePage.assertTitle();
});
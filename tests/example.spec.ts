import { test, expect } from '@playwright/test';
import { LandingPage } from '../infrastructure/landingPage';

test('has title', async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/beQualified/);
});
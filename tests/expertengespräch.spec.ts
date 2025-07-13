import { test, expect } from '@playwright/test';
import { HomePage } from '../infrastructure/homePage';


test('Expertengespräch vereinbaren', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await homePage.acceptCookies();

  await homePage.assertExpertengesprächButton();

  await homePage.assertCalendly();
});
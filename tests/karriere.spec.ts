import { test, expect } from '@playwright/test';
import { HomePage } from '../infrastructure/homePage';

test('Navigation to Karriere-Page and Title', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  await homePage.acceptCookies();

  await homePage.assertKarriereLink();
  const karrierePage = await homePage.gotoKarriere();

  await karrierePage.assertTitle();
  await karrierePage.assertHeading();
  await karrierePage.assertOffeneStellenButton();

});
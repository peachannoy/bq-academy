import { expect, type Locator, type Page } from '@playwright/test';
import { KarrierePage } from '../infrastructure/karrierePage';


export class HomePage {
  readonly page: Page;

  //Navbar-Locators
  readonly karriereButton: Locator;

  //Expertengespräch-Locators
  readonly expertenGesprächButtons: Locator;

  //Calendly-Locator
  readonly calendlyFrame: Locator;


  constructor(page: Page) {
    this.page = page;
    this.karriereButton = this.page.getByRole('link', { name: 'Karriere' }).first();
    this.expertenGesprächButtons = this.page.getByRole('link', { name: 'Expertengespräch vereinbaren' });
    this.calendlyFrame = this.page.locator('iframe[title="Select a Date & Time - Calendly"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async assertTitle() {
    await expect(this.page).toHaveTitle(/beQualified/);
  }

  async acceptCookies() {
    await this.page.getByRole('button', { name: 'Alle akzeptieren' }).click();
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => { });
    });
  }

  async assertKarriereLink() {
    await expect(this.karriereButton).toBeVisible();
    await expect(this.karriereButton).toHaveAttribute('href', "https://bequalified.de/karriere");
  }

  async gotoKarriere() {
    await this.karriereButton.click();
    return new KarrierePage(this.page);
  }

  async assertExpertengesprächButton() {
    await this.expertenGesprächButtons.first().click();
  }

  async assertCalendly() {
    //Calendly can take some time to load. Higher Timout
    await expect(this.calendlyFrame.contentFrame().getByRole('heading', { name: 'Expertengespräch buchen' })).toBeVisible({ timeout: 10000 });
    //Checking Calendar
    await this.calendlyFrame.contentFrame().getByRole('button', { name: 'Zum nächsten Monat' }).click();
    await this.calendlyFrame.contentFrame().getByRole('button', { name: 'Zum vorherigen Monat' }).click();
  }
}
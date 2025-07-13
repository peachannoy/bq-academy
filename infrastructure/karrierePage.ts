import { expect, type Locator, type Page } from '@playwright/test';

export class KarrierePage {
    readonly page: Page;
    readonly header: Locator;
    readonly offeneStellenButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByRole('heading', { name: 'WEIL MENSCHEN MIT LEIDENSCHAFT GROSSES BEWEGEN!', exact: true });
        this.offeneStellenButton = this.page.getByRole('link', { name: 'Jetzt zu den offenen Stellen' }).first();

    }

    async assertTitle() {
        await expect(this.page).toHaveTitle(/Karriere/);
    }

    async assertHeading(){
        await expect(this.header).toBeVisible();
    }

    async assertOffeneStellenButton(){
    await expect(this.offeneStellenButton).toBeVisible();
    await expect(this.offeneStellenButton).toHaveAttribute('href', "https://bequalified.de/karriere/stellenanzeigen");
    }

    async gotoOffeneStellenanzeigen(){
        await this.offeneStellenButton.click();
    }
}
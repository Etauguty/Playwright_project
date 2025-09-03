import {Page, Locator} from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.inventory_item_name');
        this.checkoutButton = page.locator('#checkout');
    }

    async getCartItems() {
        return await this.cartItems.allTextContents();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
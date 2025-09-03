import { Page } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly title;
    readonly inventoryItems;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator(".title");
        this.inventoryItems = page.locator(".inventory_item");
    }

    async getTitleText() {
        return await this.title.textContent();
    }

    async countProducts() {
        return await this.inventoryItems.count();
    }

    async addItemToCartByName(itemName: string) {
        await this.page.click(itemName)
    }

    async openCart() {
        await this.page.click('.shopping_cart_link');
    }
}
import { test as base} from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { InventoryPage } from './pages/inventoryPage';
import { CartPage } from './pages/cartPage';
import { CheckoutPage } from './pages/checkoutPage';

// Extend the base test to include our own fixtures
type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  chekoutPage: CheckoutPage;
};

export const test = base.extend<MyFixtures & { loggedInPage: InventoryPage}>({
  // Define the loginPage fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

    // Define the inventoryPage fixture
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    // Define the cartPage fixture
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    // Define the checkoutPage fixture
    chekoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    // Define the loggedInPage fixture
    loggedInPage: async ({ loginPage }, use) => {
        const username = process.env.STANDARD_USER!;
        const password = process.env.STANDARD_PASS!;

        if(!username || !password) {
            throw new Error("Environment variables STANDARD_USER and STANDARD_PASS must be set");
        }

        await loginPage.goto();
        await loginPage.login(username, password);

        // After login, we are on the inventory page
        const inventoryPage = new InventoryPage(loginPage.page);
        await use(inventoryPage);
    },
});

export { expect } from '@playwright/test';
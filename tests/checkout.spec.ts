import {test, expect} from '../fixtures';

test('Shopping items and validating checkout message', async ({ loggedInPage, inventoryPage, cartPage, chekoutPage }) => {
    // add items to cart
    await inventoryPage.addItemToCartByName('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await inventoryPage.openCart();

    // chekout
    await cartPage.proceedToCheckout();
    await chekoutPage.fillCheckoutInformation('John', 'Doe', '12345');

    // Validate summary
    const summaryItems = await cartPage.getCartItems();
    expect(summaryItems).toContain('Sauce Labs Backpack');

    // Finish checkout
    await chekoutPage.finishCheckout();
    
    // Validate completion message
    await expect(chekoutPage.confirmationMessage).toBeVisible();
    await expect(chekoutPage.confirmationMessage).toHaveText('Thank you for your order!');
});

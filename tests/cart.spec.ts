import {test, expect} from '../fixtures';

test('adding items to the cart', async ({ loggedInPage, inventoryPage, cartPage }) => {
    // add items to cart
    await inventoryPage.addItemToCartByName('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await inventoryPage.addItemToCartByName('button[data-test="add-to-cart-sauce-labs-bike-light"]');
    
    //Open cart
    await inventoryPage.openCart();

    // Validate items in cart
    const cartItems = await cartPage.getCartItems();
    expect(cartItems).toContain('Sauce Labs Backpack');
    expect(cartItems).toContain('Sauce Labs Bike Light');
});

import { test, expect } from '../fixtures';

test.describe('SauceDemo Login Tests', () => {
  test('Successful Login Test', async ({loginPage, inventoryPage}) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Assert we are on the inventory page
    await expect(await inventoryPage.getTitleText()).toBe('Products');

    // Assert there are products listed
    expect(await inventoryPage.countProducts()).toBeGreaterThan(0);
  });

  test("should show error with invalid credentials", async ({loginPage}) => {
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');

    // Assert error message is displayed
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test("should see products after logging in with fixture", async ({ loggedInPage }) => {
    // Assert we are on the inventory page
    await expect(await loggedInPage.getTitleText()).toBe('Products');

    // Assert there are products listed
    expect(await loggedInPage.countProducts()).toBeGreaterThan(0);
  });
});


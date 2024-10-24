const { test, expect } = require('@playwright/test');

test('login test', async ({ page }) => {
    // Visit the page
    await page.goto('https://www.saucedemo.com/');

    // Login with the locked_out_user should
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Check the 'locked_out_user' is seeing the error
    expect(page.locator('[data-test="error"]'));


});

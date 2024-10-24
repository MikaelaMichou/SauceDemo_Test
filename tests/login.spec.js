const { test, expect } = require('@playwright/test');

test('login test', async ({ page }) => {
    // Visit the page
    await page.goto('https://www.saucedemo.com/');

    // Login with the standard_user 
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify that the header contains the correct title
    expect(await page.locator('.app_logo').innerText()).toEqual('Swag Labs');

    // Verify the footer of the page once logged in
    const footer = await page.$('footer');
    expect(footer.isVisible());

    // Verify the displayed text on the footer
    const footerText = await footer.innerText();
    expect(footerText.replace(/\n/g, ' ')).toEqual('Twitter Facebook LinkedIn © 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');

});



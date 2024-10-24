const { test, expect } = require('@playwright/test');

test('cart test', async ({ page }) => {
    // Visit the page
    await page.goto('https://www.saucedemo.com/');

    // Login 
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Sort price low to high
    const sortLH = page.locator('[data-test="product-sort-container"]');
    await sortLH.selectOption('lohi');

    // Add the last product to the cart
    const lastProduct = page.locator('[data-test="inventory-item"]').last();
    await lastProduct.locator('text="Add to cart"').click();

    // Saving the details of the product in order to verify it in the Summary page
    const lastProductTitle = await lastProduct.locator('[data-test="inventory-item-name"]').innerText();
    const lastProductDescription = await lastProduct.locator('[data-test="inventory-item-desc"]').innerText();
    const lastProductPrice = await lastProduct.locator('[data-test="inventory-item-price"]').innerText();

    // Sort name A-Z
    const sortAZ = page.locator('[data-test="product-sort-container"]');
    await sortAZ.selectOption('az');

    // Add the top right product to the cart
    const elements = await page.$$('div[data-test="inventory-item"]');

    let topRightElement = null;
    let minDistance = Number.MAX_VALUE;

    // Get the viewport width
    const viewportWidth = page.viewportSize().width;

    // Iterate through all elements and calculate their distance to the top-right conrner
    for (const element of elements) {
        const boundingBox = await element.boundingBox();
        if (boundingBox) {
            const distanceToTopRight = Math.sqrt((viewportWidth - boundingBox.x) ** 2 + (boundingBox.y) ** 2);

            if (distanceToTopRight < minDistance) {
                minDistance = distanceToTopRight;
                topRightElement = element;
            }
        }
    }
    if (topRightElement) {
        // Add the top right product to the cart
        const addTopRightProduct = await topRightElement.$('text="Add to cart"')
        await addTopRightProduct.click();
    }

    // Saving the details of the product in order to verify it in the Summary page
    const topRightProductTitle = await topRightElement.$eval('div.inventory_item_name', el => el.innerHTML);
    const topRightProductDesc = await topRightElement.$eval('div.inventory_item_desc', el => el.innerHTML);
    const topRightProductPrice = await topRightElement.$eval('div.inventory_item_price', el => el.innerHTML);

    // Add shipping information
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Anna');
    await page.locator('[data-test="lastName"]').fill('Hath');
    await page.locator('[data-test="postalCode"]').fill('13162');
    await page.locator('[data-test="continue"]').click();

    // Verify the product details in the summary
    const firstItem = page.locator('[data-test="cart-list"]:has([data-test="inventory-item"])');
    const firstItemTitle = await firstItem.locator('[data-test="inventory-item-name"]').nth(0).innerText();
    const firstItemDesc = await firstItem.locator('[data-test="inventory-item-desc"]').nth(0).innerText();
    const firstItemPrice = await firstItem.locator('[data-test="inventory-item-price"]').nth(0).innerText();

    // Verify items to purchase matches the ones put in cart
    
    // the lastProduct refers to the last product that was added to the cart according to the task requirements
    // and the firstItem refers to the first item that is found on the summary page
    expect(lastProductTitle).toEqual(firstItemTitle);
    expect(lastProductDescription).toEqual(firstItemDesc);
    expect(lastProductPrice).toEqual(firstItemPrice);

    // the toppRightProduct refers to the top right product that was added to the cart according to the task requirements
    // and the secondtItem refers to the second item that is found on the summary page
    const secondItem = page.locator('[data-test="cart-list"]:has([data-test="inventory-item"])');
    const secondItemTitle = await secondItem.locator('[data-test="inventory-item-name"]').nth(1).innerText();
    const secondItemDesc = await secondItem.locator('[data-test="inventory-item-desc"]').nth(1).innerText();
    const secondtemPrice = await secondItem.locator('[data-test="inventory-item-price"]').nth(1).innerText();

    expect(topRightProductTitle).toEqual(secondItemTitle);
    expect(topRightProductDesc).toEqual(secondItemDesc);
    expect(topRightProductPrice).toEqual(secondtemPrice);

    // Finish the order
    await page.locator('[data-test="finish"]').click();

    // Check that the message is displayed in order to verify that the order is completed
    expect(await page.locator('[data-test="complete-header"]').innerText()).toEqual('Thank you for your order!');

});



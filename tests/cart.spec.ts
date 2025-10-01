import { test, expect, Page } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
});

test.describe.only('Add to Cart, Cart, and View Cart tests from Homepage', () => {


    test('Add MacBook to cart and verify cart', async ({ page }) => {

        //Get Product
        const products = await page.locator('.product-thumb .caption h4').allTextContents();
        const MacBook = products[0];

        //Get Product Price
        const prices = await page.locator('.price').allTextContents();
        const macBookPrice = prices[0].slice(0, 8);


        await page.getByRole('button', { name: ' Add to Cart' }).first().click();
        await expect(page.getByText('Success: You have added')).toContainText(MacBook);

        const cartTotal = page.locator('#cart-total');

        await expect(cartTotal).toContainText('1 item(s)');
        await expect(cartTotal).toContainText(macBookPrice);

        await cartTotal.click();
        await expect(page.locator('#cart').getByText(MacBook)).toBeVisible();
        await expect(page.getByRole('cell', { name: 'x1' })).toContainText('x1');
        await expect(page.getByRole('cell', { name: '$' }).first()).toHaveText(macBookPrice);
        await expect(page.locator('#cart div').getByRole('cell', { name: '$602.00' })).toHaveText(macBookPrice);

    });


    test('Add MacBook twice and verify quantity and price', async ({ page }) => {

        //Get Product
        const products = await page.locator('.product-thumb .caption h4').allTextContents();
        const MacBook = products[0];

        //Get Product Price
        const prices = await page.locator('.price').allTextContents();
        const macBookPrice = prices[0].slice(1, 8);

        

        for (let i = 0; i < 2; i++) {

            await page.getByRole('button', { name: ' Add to Cart' }).first().click();
            await expect(page.getByText('Success: You have added')).toContainText(MacBook);

            const cartTotal = page.locator('#cart-total');
            const expectedTotal = (Number(macBookPrice.replace(',', '')) * (i + 1)).toLocaleString();
            console.log(expectedTotal);
            

            await expect(cartTotal).toContainText(`${i + 1} item(s)`);
            await expect(cartTotal).toContainText(expectedTotal);

            await cartTotal.click();
            await expect(page.locator('#cart').getByText(MacBook)).toBeVisible();
            await expect(page.getByRole('cell', { name: 'x1' })).toContainText(`x${i+1}`);
            await expect(page.getByRole('cell', { name: '$' }).first()).toContainText(expectedTotal);
            await expect(page.locator('#cart div').getByRole('cell', { name: '$602.00' })).toContainText(String(Number(macBookPrice) * (i + 1)));

        }

    });


});
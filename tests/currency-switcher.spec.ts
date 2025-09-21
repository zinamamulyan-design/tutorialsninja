import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home')
});

test.describe('Currency Switcher functionality', () => {

    test('Default currency is set correctly on homepage', async ({ page }) => {

        await expect(page.locator('button.btn.dropdown-toggle strong')).toHaveText('$');
        await expect(page.locator('#cart-total')).toContainText('$');

        const products = await page.locator('.product-thumb .caption .price').allTextContents();
        for (let price of products) {
            expect(price).toContain('$');
            expect(price).not.toContain('€');
            expect(price).not.toContain('£');
        }

    });

    test.only('Changing currency updates prices', async ({ page }) => {

        await page.getByRole('button', { name: '$ Currency' }).click();
        await page.getByRole('button', { name: '€Euro' }).click()

        await expect(page.locator('button.btn.dropdown-toggle strong')).toHaveText('€');
        await expect(page.locator('#cart-total')).toContainText('€');

        const products = await page.locator('.product-thumb .caption .price').allTextContents();
        for (let price of products) {
            expect(price).toContain('€');
            expect(price).not.toContain('$');
            expect(price).not.toContain('£');
        }

    });

    test('Currency persists after page reload', async({ page })=>{

        await page.getByRole('button', { name: '$ Currency' }).click();
        await page.getByRole('button', { name: '€Euro' }).click()

        await expect(page.locator('button.btn.dropdown-toggle strong')).toHaveText('€');
        await expect(page.locator('#cart-total')).toContainText('€');

        const products = await page.locator('.product-thumb .caption .price').allTextContents();
        for (let price of products) {
            expect(price).toContain('€');
            expect(price).not.toContain('$');
            expect(price).not.toContain('£');
        };

        page.reload();

        await expect(page.locator('button.btn.dropdown-toggle strong')).toHaveText('€');
        await expect(page.locator('#cart-total')).toContainText('€');

            for (let price of products) {
            expect(price).toContain('€');
            expect(price).not.toContain('$');
            expect(price).not.toContain('£');
        };

    });

});

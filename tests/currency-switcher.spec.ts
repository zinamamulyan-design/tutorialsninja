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

    const currencies = [
        { option: '€Euro', header: '€ Currency  ', symbol: '€' },
        { option: '£Pound Sterling', header: '£ Currency  ', symbol: '£' },
        { option: '$US Dollar', header: '$ Currency  ', symbol: '$' },
      ];
    
      
      for( const {option, header, symbol} of currencies ){
          test(`should switch to ${option} and update header + cart + product prices`, async({page})=>{
    
            await page.getByRole('button', { name: "Currency" }).click();
            await page.getByRole('button', { name: option }).click();
    
            await expect(page.getByRole('button', { name: header })).toBeVisible();
    
            await expect(page.locator('//*[@id="cart-total"]')).toContainText(symbol);
    
    
            const prices = page.locator('.price');
            const count = await prices.count();
            for(let i=0; i<count; i++){
              await expect(prices.nth(i)).toContainText(symbol);
            }
            
    
          });
      }
    
    // test.only('Changing currency updates prices', async ({ page }) => {

    //     await page.getByRole('button', { name: '$ Currency' }).click();
    //     await page.getByRole('button', { name: '€Euro' }).click()

    //     await expect(page.locator('button.btn.dropdown-toggle strong')).toHaveText('€');
    //     await expect(page.locator('#cart-total')).toContainText('€');

    //     const products = await page.locator('.product-thumb .caption .price').allTextContents();
    //     for (let price of products) {
    //         expect(price).toContain('€');
    //         expect(price).not.toContain('$');
    //         expect(price).not.toContain('£');
    //     }

    // });

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

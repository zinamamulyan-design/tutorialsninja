import { test, expect, Page } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
});

test.describe.only('Cart', () => {

    
    const products = [
        {productName: 'MacBook', price: '$602.00'},
        {productName: 'iPhone', price: '$123.20'}
    ]
for(const {productName, price} of products)
test(`Add ${productName} to cart from home`, async({ page} )=>{

    const cartTotal = await page.locator('#cart-total').textContent();
    expect(cartTotal).toContain('0 item(s) - $0.00');
    
    

});


});
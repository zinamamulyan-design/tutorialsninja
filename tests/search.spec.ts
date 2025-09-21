import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home')
});

test.describe('Search', () => {

    const searchTerms = ['mac', 'iphone']

    for (let term of searchTerms) {

        test(`Search for ${term}`, async ({ page }) => {

            await page.getByRole('textbox', { name: 'Search' }).click();
            await page.getByRole('textbox', { name: 'Search' }).fill(term);
            await page.getByRole('button', { name: '' }).click();

            const products = await page.locator('.product-thumb .caption h4').allTextContents();
            for (let item of products) {
                expect(item.toLowerCase()).toContain(term);
                // await expect(page).toHaveTitle(`Search - ${term}`);
                // await expect(page).toHaveURL(`https://tutorialsninja.com/demo/index.php?route=product/search&search=${term}`)
            }
        })
    }

    const negativeSearchTerm = ['', 'asfahqrwewedh', '656565', '%*^(&^%', 'մակ'];

    for (let term of negativeSearchTerm) {

        test(`Search for Negative ${term}`, async ({ page }) => {

            await page.getByRole('textbox', { name: 'Search' }).click();
            await page.getByRole('textbox', { name: 'Search' }).fill(term);
            await page.getByRole('textbox', { name: 'Search', exact: true }).press('Enter');


            await expect(page.getByRole('heading', { name: 'Products meeting the search' })).toBeVisible();
            await expect(page.getByText('There is no product that')).toBeVisible();

            // if (term == '') {
            //     await expect(page).toHaveTitle('Search');
            //     await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=product/search&search')
            // }
            // else {
            //     await expect(page).toHaveTitle(`Search - ${term}`);
            //     await expect(page).toHaveURL(`https://tutorialsninja.com/demo/index.php?route=product/search&search=${term}`)
            // }
        });
    }

});

import { test, expect, firefox } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home')
});

test.skip(({ browserName }) => browserName === 'webkit', 'skipping webkit on Windows');
test.skip(({ browserName }) => browserName === 'firefox', 'skipping firefox on Windows');

test.describe('Desctop tests', () => {

    test('Autoplay', async({page})=>{
        
    });

    test('Next Button Test', async({page})=>{


    });

     test('Next Button Pre', async({page})=>{


    });

    test('Indicators', async({ page })=>{

        await page.locator('.swiper-pagination-bullet').first().click();
        await expect(page.getByRole('link', { name: 'iPhone' }).first()).toBeVisible();

        await page.locator('.swiper-pagination > span:nth-child(2)').first().click();
        await expect(page.getByRole('img', { name: 'MacBookAir' }).nth(1)).toBeVisible();
    });
});
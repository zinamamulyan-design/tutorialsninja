import { test, expect, firefox } from '@playwright/test'
import { title } from 'process';

test.beforeEach(async ({ page }) => {
    await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home')
});

test.skip(({ browserName }) => browserName === 'webkit', 'skipping webkit on Windows');
test.skip(({ browserName }) => browserName === 'firefox', 'skipping firefox on Windows');

test.describe('Desctop tests', () => {

    test('PC test', async ({ page }) => {
        await page.getByRole('link', { name: 'Desktops', exact: true }).hover();

        await page.getByRole('link', { name: 'PC (0)' }).click();
        await expect(page.getByRole('heading', { name: 'PC' })).toBeVisible();
        await expect(page).toHaveTitle('PC');

        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page).toHaveTitle('Your Store');
        await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=common/home');
    });

    test('Mac test', async ({ page }) => {
        await page.getByRole('link', { name: 'Desktops', exact: true }).hover();
        await page.getByRole('link', { name: 'Mac (1)' }).click();
        await expect(page.getByRole('heading', { name: 'Mac', exact: true })).toBeVisible();
        await expect(page).toHaveTitle('Mac');

        await expect(page.getByRole('link', { name: 'Continue' })).not.toBeVisible();
    });

    test('Show All Desctops', async ({ page }) => {
        //Homework
        await page.getByRole('link', { name: 'Desktops', exact: true }).hover();
        await page.getByRole('link', { name: 'Show AllDesktops' }).click();
        await expect(page.getByRole('heading', { name: 'Desktops' })).toBeVisible();
        await expect(page).toHaveTitle('Desktops');

    });

});

test.describe('Laptops & Notebooks', () => {
    //Homework
    test('Macs test', async ({ page }) => {
        await page.getByRole('link', { name: 'Laptops & Notebooks', exact: true }).hover();
        await page.getByRole('link', { name: 'Macs (0)' }).click();
        await expect(page.getByRole('heading', { name: 'Macs' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
        await expect(page).toHaveTitle('Macs');

        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page).toHaveTitle('Your Store');
        await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=common/home');

    });
    test('Windows test', async ({ page }) => {
        await page.getByRole('link', { name: 'Laptops & Notebooks', exact: true }).hover();
        await page.getByRole('link', { name: 'Windows (0)' }).click();
        await expect(page.getByRole('heading', { name: 'Windows' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
        await expect(page).toHaveTitle('Windows')

        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page).toHaveTitle('Your Store')
        await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=common/home');

    });
    test('Show All Laptops & Notebooks', async ({ page }) => {
        await page.getByRole('link', { name: 'Laptops & Notebooks', exact: true }).hover();
        await page.getByRole('link', { name: 'Show AllLaptops & Notebooks' }).click();
        await expect(page.getByRole('heading', { name: 'Laptops & Notebooks' })).toBeVisible();
        await expect(page).toHaveTitle('Laptops & Notebooks');
    });

});

test.describe('Components tests', () => {
    //Homework
    test('Mice and Trackballs', async ({ page }) => {
        await page.getByRole('link', { name: 'Components', exact: true }).hover();
        await page.getByRole('link', { name: 'Mice and Trackballs (0)' }).click();
        await expect(page.getByRole('heading', { name: 'Mice and Trackballs' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
        await expect(page).toHaveTitle('Mice and Trackballs');

        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page).toHaveTitle('Your Store');
        await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=common/home');
    });

    test('Monitors', async ({ page }) => {
        await page.getByRole('link', { name: 'Components', exact: true }).hover();
        await page.getByRole('link', { name: 'Monitors (2)' }).click();
        await expect(page.getByRole('heading', { name: 'Monitors' })).toBeVisible();
        await expect(page).toHaveTitle('Monitors');

    });

    test('Printers tests', async ({ page }) => {
        await page.getByRole('link', { name: 'Components', exact: true }).hover();
        await page.getByRole('link', { name: 'Printers (0)' }).click();
        await expect(page.getByRole('heading', { name: 'Printers' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
        await expect(page).toHaveTitle('Printers')

        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page).toHaveTitle('Your Store');
        await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=common/home');
    });

    test('Scaners tests', async({ page }) => {
        await page.getByRole('link', { name: 'Components', exact: true }).hover();
        await page.getByRole('link', { name: 'Scanners (0)' }).click();
        await expect(page.getByRole('heading', { name: 'Scanners' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
        await expect(page).toHaveTitle('Scanners');

        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page).toHaveTitle('Your Store');
        await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=common/home');
    });

    test('Web Cameras tests', async({ page })=>{
        await page.getByRole('link', { name: 'Components', exact: true }).hover();
        await page.getByRole('link', { name: 'Web Cameras (0)' }).click();
        await expect(page.getByRole('heading', { name: 'Web Cameras' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
        await expect(page).toHaveTitle('Web Cameras');

        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page).toHaveTitle('Your Store');
        await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=common/home');
    });

    test('Show All COmponents tests', async({ page })=>{
        await page.getByRole('link', { name: 'Components', exact: true }).hover();
        await page.getByRole('link', { name: 'Show AllComponents' }).click();
        await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Refine Search' })).toBeVisible();
        await expect(page).toHaveTitle('Components');
    });
});

test.describe('Tablets', () => {
    //Homework
    test('Tablets test', async ({ page }) => {
        await page.getByRole('link', { name: 'Tablets' }).click();
        await expect(page.getByRole('heading', { name: 'Tablets' })).toBeVisible();
        await expect(page).toHaveTitle('Tablets');
    });
});

test.describe('Software', () => {
    //Homework
    test('Software test',async ({ page })=>{
        await page.getByRole('link', { name: 'Software' }).click();
        await expect(page.getByRole('heading', { name: 'Software' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
        await expect(page).toHaveTitle('Software');

        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page).toHaveTitle('Your Store');
        await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=common/home');
    });
});

test.describe('Phones & PDAs', () => {
    //Homework
    test('Phones $ PDAs test', async({ page })=>{
        await page.getByRole('link', { name: 'Phones & PDAs' }).click();
        await expect(page.getByRole('heading', { name: 'Phones & PDAs' })).toBeVisible();
        await expect(page).toHaveTitle('Phones & PDAs');
    });
});

test.describe('Cameras', () => {
    //Homework
    test('Cameras test', async({ page })=>{
        await page.getByRole('link', { name: 'Cameras' }).click();
        await expect(page.getByRole('heading', { name: 'Cameras' })).toBeVisible();
        await expect(page).toHaveTitle('Cameras');
    });
});

test.describe('MP3 Player', () => {
    //Homework
});

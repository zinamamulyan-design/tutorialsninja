//login: zina.mamulyan@gmail.com
//password: @MyPass88

import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
});

test.describe('Auth', () => {

    const invelidParams = [
        { email: 'fakeemail', password: '@MyPass88' },
        { email: '', password: '@MyPass88' },
        { email: 'fakeemail@gmail.com', password: '@MyPass88' },

        { email: 'zina.mamulyan@gmail.com', password: '' },
        { email: 'zina.mamulyan@gmail.com', password: 'qwe2312' },
        { email: '', password: '' }
    ];

    for (const { email, password } of invelidParams) {

        test(`Login with negative params: email '${email}' and password '${password}'`, async ({ page }) => {

            await gotoLogin(page);

            await page.getByRole('textbox', { name: 'E-Mail Address' }).click();
            await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(email);
            await page.getByRole('textbox', { name: 'Password' }).click();
            await page.getByRole('textbox', { name: 'Password' }).fill(password);

            await page.getByRole('button', { name: 'Login' }).click();

            const error = page.locator('div.alert-danger');
            await expect(error).toBeVisible();
            //await expect(error).toHaveText('Warning: No match for E-Mail');
            await expect(page).toHaveTitle('Account Login');
            await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=account/login');
        });
    }

    const validParams = { email: 'zina.mamulyan@gmail.com', password: '@MyPass88' }

    test('Login successfully with valid credentials', async ({ page }) => {

        await loginSuccessfully(page, validParams.email, validParams.password);

        await expect(page).toHaveTitle('My Account');
        await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=account/account');

        await expect(page.locator('#content').getByRole('heading', { name: 'My Account' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Edit your account information' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Change your password' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Modify your address book' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Modify your wish list' })).toBeVisible();

        await expect(page.getByRole('heading', { name: 'My Orders' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'View your order history' })).toBeVisible();
        await expect(page.locator('#content').getByRole('link', { name: 'Downloads' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Your Reward Points' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'View your return requests' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Your Transactions' })).toBeVisible();
        await expect(page.locator('#content').getByRole('link', { name: 'Recurring payments' })).toBeVisible();

        await expect(page.getByRole('heading', { name: 'My Affiliate Account' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Register for an affiliate' })).toBeVisible();

        await expect(page.getByRole('heading', { name: 'Newsletter' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Subscribe / unsubscribe to' })).toBeVisible();

    });


    // New Password: @MyNewPass

    const newPassword = { password: '@MyNewPass', passwordConfirm: '@MyNewPass' };
    
    test('Change Password', async ({ page }) => {
        // HOMEWORK
        await loginSuccessfully(page, validParams.email, validParams.password);

        await expect(page).toHaveTitle('My Account');
        await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=account/account');

        await expect(page.getByRole('link', { name: 'Change your password' })).toBeVisible();
        await page.getByRole('link', { name: 'Change your password' }).click();

        await expect(page.getByRole('heading', { name: 'Change Password' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: '* Password', exact: true })).toBeVisible();
        await expect(page.getByRole('textbox', { name: '* Password Confirm' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();

        await page.getByRole('textbox', { name: '* Password', exact: true }).click();
        await page.getByRole('textbox', { name: '* Password', exact: true }).fill(newPassword.password);
        await page.getByRole('textbox', { name: '* Password Confirm' }).click();
        await page.getByRole('textbox', { name: '* Password Confirm' }).fill(newPassword.passwordConfirm);
        await page.getByRole('button', { name: 'Continue' }).click();

        await expect(page).toHaveTitle('My Account');
        await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=account/account')

        const success = page.getByText('Success: Your password has been successfully updated.');
        await expect(success).toBeVisible();

       
    });



});


async function gotoLogin(page: Page) {
    await page.getByText('My Account Register Login').click();
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveTitle('Account Login');
    await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=account/login');
    await expect(page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'E-Mail Address' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
}

async function loginSuccessfully(page: Page, email: string, password: string) {
    await gotoLogin(page);

    await page.getByRole('textbox', { name: 'E-Mail Address' }).click();
    await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
}
import { test, expect, Page } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
});

test.describe('Change Password', () => {

    // New Password: @MyNewPass


    //----------------------Positive case------------------------------

    const validParams = { email: 'zina.mamulyan@gmail.com', password: '@MyPass88' }
    const newPassword = { password: '@MyNewPass', passwordConfirm: '@MyNewPass' };

    test('User can Change Password successfuly', async ({ page }) => {
        // HOMEWORK

        await gotoLogin(page);
        await loginSuccessfully(page, validParams.email, validParams.password);

        //await expect(page).toHaveTitle('My Account');
        await expect(page).toHaveURL(/route=account\/account/);

        await expect(page.getByRole('link', { name: 'Change your password' })).toBeVisible();
        await page.getByRole('link', { name: 'Change your password' }).click();

        await expect(page.getByRole('heading', { name: 'Change Password' })).toBeVisible();
        await page.getByRole('textbox', { name: '* Password', exact: true }).click();
        await page.getByRole('textbox', { name: '* Password', exact: true }).fill(newPassword.password);

        await expect(page.getByRole('textbox', { name: '* Password', exact: true })).toBeVisible();

        await expect(page.getByRole('textbox', { name: '* Password Confirm' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();

        await page.getByRole('textbox', { name: '* Password Confirm' }).click();
        await page.getByRole('textbox', { name: '* Password Confirm' }).fill(newPassword.passwordConfirm);
        await page.getByRole('button', { name: 'Continue' }).click();

        await expect(page).toHaveTitle('My Account');
        await expect(page).toHaveURL(/route=account\/account/)

        const success = page.getByText('Success: Your password has been successfully updated.');
        await expect(success).toBeVisible();

        //-----------------------------Log out--------------------------------

    await page.getByRole('link', { name: ' My Account' }).click();
    await page.locator('#top-links').getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveTitle('Account Logout');
    await expect(page).toHaveURL(/route=account\/logout/);
    await expect(page.getByRole('heading', { name: 'Account Logout' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();

    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page).toHaveTitle('Your Store');
    await expect(page).toHaveURL(/route=common\/home/);
    await expect(page.getByRole('link', { name: 'Qafox.com' })).toBeVisible();

    });

    


    test('Old password should fail', async ({ page }) => {

        await gotoLogin(page);
        await loginSuccessfully(page, validParams.email, validParams.password);

        await expect(page.locator('.alert.alert-danger')).toBeVisible;
        
        await expect(page).toHaveTitle('My Account');
        await expect(page).toHaveURL(/route=account\/account/);

    });


    test('New password should success', async ({ page }) => {

        await gotoLogin(page);
        await loginSuccessfully(page, validParams.email, newPassword.password);
        //await expect(page).toHaveTitle('My Account');
        await expect(page).toHaveURL(/route=account\/login/);


    });


});

export async function gotoLogin(page: Page) {
    await page.getByText('My Account Register Login').click();
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveTitle('Account Login');
    await expect(page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=account/login');
    await expect(page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'E-Mail Address' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
}

export async function loginSuccessfully(page: Page, email: string, password: string) {

    await page.getByRole('textbox', { name: 'E-Mail Address' }).click();
    await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
}

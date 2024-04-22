import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    // Шаги для авторизации
  await page.goto('https://topface.com/');
  await page.locator('//button[contains(text(), "Log in with e-mail")]').click() // Click log in with e-mail
  await page.locator('//input[@id="form_auth_login"]').fill("accfortest@mail.ru") // Enter login
  await page.locator('//input[@id="form_auth_password"]').fill("Qwe1234") // Enter password
  await page.locator('//button[@id="btn_auth"]').click() // click Sigh In
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    // await page.waitForURL('https://topface.com/');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.locator('//a[@id="profile_link_rd18"]')).toBeVisible();
    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});

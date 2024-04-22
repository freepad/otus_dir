import { test, expect } from '@playwright/test';
import { HandwrittnerLoginPage } from '../pages/loginPage';
import { ForgotPasswordPage } from '../pages/forgotpasswordPage';

// Запускает тесты последовательно в рамках одного файла
test.describe.configure({ mode: 'serial' });

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('Ошибка при авторизации без каптчи на Handwrittner', async () => {
  const HandwrittnerLogin = new HandwrittnerLoginPage(page);
  await HandwrittnerLogin.open();
  await HandwrittnerLogin.login(
    // иногда можно и напрямую, но обычно лучше в файле `config.js` скрыть
    process.env.TEST_UI_LOGIN,
    process.env.TEST_UI_PASSWORD
  );
  await expect(page.locator('//div[@class="error"]')).toBeVisible();
});

test("Открытие экрана регистрации со страницы логина", async () => { 
  const HandwrittnerLogin = new HandwrittnerLoginPage(page);
  await HandwrittnerLogin.open();
  await HandwrittnerLogin.openRegistration();
  await expect(page).toHaveURL(/reg/);
})

test("Восстановление пароля", async () => {
const HandwrittnerLogin = new HandwrittnerLoginPage(page);
await HandwrittnerLogin.open(); 
await HandwrittnerLogin.forgotpasswordclick();
await expect(page).toHaveURL(/forgotpassword/);
})


test("Ошибка при восстановлении пароля - 'Введите email'", async () => {
  const PasswordPage = new ForgotPasswordPage(page);
  await PasswordPage.open();
  await expect(PasswordPage.mainText).toHaveText('Восстановление пароля');
  await expect(PasswordPage.mainText).toBeVisible();
  await PasswordPage.emptySubmit();
  await expect(PasswordPage.errorText).toHaveText('Введите email');
  await expect(PasswordPage.errorText).toBeVisible();
})


test("Успешный запрос восстановления пароля", async () => { 
  const PasswordPage = new ForgotPasswordPage(page);
  await PasswordPage.open(); 
  await PasswordPage.enterEmail('test@mail.ru');
  await expect(PasswordPage.successText).toHaveText('Мы отправили вам инструкции по восстановлению пароля на почту')
  await expect(PasswordPage.successText).toBeVisible();
})









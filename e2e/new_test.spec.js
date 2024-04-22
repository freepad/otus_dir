import { test, expect } from '@playwright/test';

test.describe('Start page tests', async () => {


test('Start page', async ({ page }) => {

  // ПЕРЕХОД НА СТРАНИЦУ ДЕЙТИНГА
  await page.goto('https://topface.com/', { timeout: 100000 }); // долго грузит
  await expect(page).toHaveURL(/topface/);
  await page.locator('//div[@class="lp-item-menu-label"][contains(text(),"Dating")]').click() // Нажатие на пункт "Знакомства"
  await expect(page).toHaveURL(/dating/);

  // ПРОВЕРКА СКИПА
  // сохраняем айди юзера, который сейчас отображается в дейтинге 
   let linkElement = await page.locator('//a[@class="tf-datingpage-link-a"]').first();
   let hrefAttribute = await linkElement.getAttribute('href');
   const firstUserId = hrefAttribute.match(/\/profile\/(\d+)\/$/)[1];
   await page.locator('//div[@class="tf-rd-search-button-icon tf-rd-search-button-icon-skip"]').click() // скипаем юзера в дейтинге
  // Узнаем айди нового юзера, который должен был показаться следующим 
  
    await new Promise(resolve => setTimeout(resolve, 2000)); // Добавляем задержку перед сохранением нового айдишника
    linkElement = await page.locator('//a[@class="tf-datingpage-link-a"]').first();
    hrefAttribute = await linkElement.getAttribute('href');
    const secondUserId = hrefAttribute.match(/\/profile\/(\d+)\/$/)[1];
  
    // Проверяем, что идентификаторы двух пользователей не совпадают
    await expect(firstUserId).not.toMatch(secondUserId);

  // ПЕРЕХОД В ПРОФИЛЬ
  await page.locator('//div[@class="lp-profile-info-image fll"]').click() // переходи в свой профиль
  await expect(page).toHaveURL(/profile\/155703100/); // проверка, что корректный айди в ссылке

  // РЕДАКТИРОВАНИЕ About myself
  await page.locator('//span[contains(text(),"Edit")]').click();
  await page.locator('//textarea[@name="about"]').fill("Good boy")
  await page.locator('//button[@type="submit"]').click(); // сохраняем значение
  await new Promise(resolve => setTimeout(resolve, 2000));
  await expect(page.locator('//div[@class="tf-profile-content-ab-item-desc fll"]')).toHaveText("Good boy");

  // ОЧИСТКА ЗАПОЛНЕННОГО РАНЕЕ ПОЛЯ
  await page.locator('//span[contains(text(),"Edit")]').click();
  await page.locator('//textarea[@name="about"]').fill("")
  await page.locator('//button[@type="submit"]').click(); 
  await new Promise(resolve => setTimeout(resolve, 2000));
  await expect(page.locator('//div[@class="tf-profile-content-about-container "]')).toHaveText("Unfortunately, your profile is not filled in.");
  
});

})

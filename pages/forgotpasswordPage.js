exports.ForgotPasswordPage = class ForgotPasswordPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.mainText = page.locator('//div[@class="bold"]');
    this.hintText = page.locator('//p[@class="mt-3"]');
    this.inputEmail = page.locator('//input[@class="highlightBlue forgetEmail me-2 form-control"]');
    this.confirmButton = page.locator('//span[@class="v-btn__content"][contains(text(), "Восстановить")]');
    this.errorText = page.locator('//div[@class="error"]');
    this.successText = page.locator('//div[@class="success"]');
 
  }

  async open() {
    await this.page.goto('https://handwrittner.com/forgotpassword');
  }

  async emptySubmit() {
    await this.confirmButton.click();
  }

  async enterEmail(email) {
    await this.inputEmail.fill(email)
    await this.confirmButton.click();
  }
 

};

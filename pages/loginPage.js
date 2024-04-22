exports.HandwrittnerLoginPage = class HandwrittnerLoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getStarted = page.locator('b', { hasText: 'Войти' });
    this.gettingStartedHeader = page.locator('h1', { hasText: 'Вход' });
    this.emailInput = page.locator('//input[@id="username"]');
    this.passwordInput = page.locator('//input[@id="password"]');
    this.recaptchaCheckbox = page.locator('//div[@class="recaptcha-checkbox-border"][@role="presentation"]');
    this.enterButton = page.locator('//button[@type="submit"]');
    this.captchaError = page.locator('//div[@class="error"]');
    this.forgotpassword = page.locator('//a[@href="/forgotpassword"]');
    this.registrationButton = page.locator('#contentAjax').getByRole('button', { name: 'Регистрация' });

  }

  async open() {
    await this.page.goto('https://handwrittner.com/login');
  }

  async login(username, password) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    // await this.recaptchaCheckbox.click();
    await this.enterButton.click();
  }

  async forgotpasswordclick() { 
    await this.forgotpassword.click();
  }

  async openRegistration(){
    await this.registrationButton.click();
  }


};

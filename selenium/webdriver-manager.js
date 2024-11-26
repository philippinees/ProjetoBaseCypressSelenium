const { Builder } = require('selenium-webdriver');

let driver;

class WebDriverManager {
  static async getDriver() {
    if (!driver) {
      driver = await new Builder().forBrowser('chrome').build();
    }
    return driver;
  }

  static async quitDriver() {
    if (driver) {
      await driver.quit();
      driver = null;
    }
  }
}

module.exports = WebDriverManager;

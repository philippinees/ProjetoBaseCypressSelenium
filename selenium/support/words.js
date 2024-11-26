const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const chrome = require('selenium-webdriver/chrome');
const { Builder } = require('selenium-webdriver');
const WebDriverManager = require('../webdriver-manager');
class CustomWorld {
  constructor() {
    // let options = new chrome.Options();
    //     options.addArguments('--headless');
    // this.driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    //this.driver = WebDriverManager.getDriver();
  }
}

setDefaultTimeout(120000);
setWorldConstructor(CustomWorld);



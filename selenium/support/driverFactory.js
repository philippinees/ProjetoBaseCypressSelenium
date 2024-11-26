const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const safari = require('selenium-webdriver/safari');
const edge = require('selenium-webdriver/edge');

class DriverFactory {
    static createDriver(browserName, headless = false) {
        if (!this.driverInstance) {
            switch (browserName.toLowerCase()) {
                case 'chrome':
                    const chromeOptions = new chrome.Options();
                    if (headless) chromeOptions.addArguments('--headless');
                    this.driverInstance = new Builder()
                        .forBrowser('chrome')
                        .setChromeOptions(chromeOptions)
                        .build();
                    break;
                case 'firefox':
                    const firefoxOptions = new firefox.Options();
                    if (headless) firefoxOptions.addArguments('-headless');
                    this.driverInstance = new Builder()
                        .forBrowser('firefox')
                        .setFirefoxOptions(firefoxOptions)
                        .build();
                    break;
                case 'safari':
                    this.driverInstance = new Builder()
                        .forBrowser('safari')
                        .build();
                    break;
                case 'edge':
                    const edgeOptions = new edge.Options();
                    if (headless) edgeOptions.addArguments('--headless');
                    this.driverInstance = new Builder()
                        .forBrowser('MicrosoftEdge')
                        .setEdgeOptions(edgeOptions)
                        .build();
                    break;
                default:
                    throw new Error(`Browser ${browserName} is not supported.`);
            }
        }
        return this.driverInstance;
    }

    static async quitDriver() {
        if (this.driverInstance) {
            await this.driverInstance.quit();
            this.driverInstance = null;
        }
    }
}

module.exports = DriverFactory;

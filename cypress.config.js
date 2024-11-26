const { defineConfig } = require("cypress");
const sqlServer = require('cypress-sql-server')
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const env = require('./cypress.env.json');

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  const tasks = sqlServer.loadDBPlugin(env.sqlServerConnect);
  on("task", tasks);
  on("file:preprocessor", browserify.default(config),);
  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    watchForFileChanges: false,
    video: false,
    chromeWebSecurity: false,
    pageLoadTimeout: 60000,
    experimentalModifyObstructiveThirdPartyCode: true,
    defaultCommandTimeout: 6000,
    viewportWidth: 1750,
    viewportHeight: 920,
    experimentalRunAllSpecs: true,
    specPattern: [
      'cypress/**/*.feature'
    ],
  }
});
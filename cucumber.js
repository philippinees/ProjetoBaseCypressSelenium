module.exports = {
    default: {
      require: [
        'selenium/steps/**/*.js', 
        'selenium/support/*.js' 
      ],
     paths: ['selenium/features/**/*.feature'], 
      format: [
        'json:reports/json/cucumberSelenium_report.json'
      ],
    }
  };
  
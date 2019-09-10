class CustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onTestResult(test, testResult, aggregatedResult) {
    console.log(JSON.stringify(testResult, null, 2));
  }
}

module.exports = CustomReporter;

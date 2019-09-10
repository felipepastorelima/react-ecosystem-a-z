module.exports = class CustomWatchPlugin {
  constructor({ config }) {
    this.config = config;
  }
  // Add hooks to Jest lifecycle events
  apply(jestHooks) {
    // jestHooks.shouldRunTestSuite(({ testPath }) => {
    //   return testPath.includes("/ok.test");
    // });
    // jestHooks.onTestRunComplete(results => {
    //   console.log(`Passed Tests: ${results.numPassedTests}`);
    // });
    // jestHooks.onFileChange(({ projects }) => {
    //   this._projects = projects;
    // });
  }

  // Get the prompt information for interactive plugins
  getUsageInfo(globalConfig) {
    if (this.config && this.config.key && this.config.prompt) {
      return this.config;
    }

    return {
      key: "s",
      prompt: "run only the ok.test"
    };
  }

  // Executed when the key from `getUsageInfo` is input
  run(globalConfig, updateConfigAndRun) {
    updateConfigAndRun({
      testPathPattern: "/ok.test"
    });

    return Promise.resolve(true);
  }
};

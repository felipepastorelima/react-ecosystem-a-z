module.exports = {
  collectCoverage: true,
  // collectCoverageFrom: ["./utils-1.js"],
  // coveragePathIgnorePatterns: ["./utils-1.js"],
  coverageDirectory: "./coverageCustom",
  // coverageReporters: ["json"]
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    },
    "./utils-1.js": {
      lines: 80
    }
  },
  forceCoverageMatch: ["**/*.t.js"]
};

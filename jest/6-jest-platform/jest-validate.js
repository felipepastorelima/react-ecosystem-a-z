const { validate } = require("jest-validate");

const configByUser = {
  transform: "<rootDir>/node_modules/my-custom-transform"
};

const result = validate(configByUser, {
  comment: "  Documentation: http://custom-docs.com",
  exampleConfig: { transform: "<rootDir>/node_modules/babel-jest" }
});

console.log(result);

const { parseWithComments } = require("jest-docblock");

const code = `
/**
 * This is a sample
 *
 * @flow
 */
 
 console.log('Hello World!');
`;

const parsed = parseWithComments(code);

// prints an object with two attributes: comments and pragmas.
console.log(parsed);

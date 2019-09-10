const prettyFormat = require("pretty-format");

const val = { object: {} };
val.circularReference = val;
val[Symbol("foo")] = "foo";
val.map = new Map([["prop", "value"]]);
val.array = [-0, Infinity, NaN];

console.log(prettyFormat(val));

const Worker = require("jest-worker").default;

async function main() {
  const worker = new Worker(require.resolve("./heavy-task.js"));

  // run 2 tasks in parallel with different arguments
  const results = await Promise.all([
    worker.myHeavyTask({ foo: "bar" }),
    worker.myHeavyTask({ bar: "foo" })
  ]);

  console.log(results);
}

main();

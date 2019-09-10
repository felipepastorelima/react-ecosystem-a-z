const { DocumentClient } = require("aws-sdk/clients/dynamodb");

const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: "localhost:8000",
    sslEnabled: false,
    region: "local-env"
  })
};

const ddb = new DocumentClient(config);

it("should insert item into table", async () => {
  await ddb
    .put({ TableName: "files", Item: { id: "1", hello: "world" } })
    .promise();

  const { Item } = await ddb
    .get({ TableName: "files", Key: { id: "1" } })
    .promise();

  expect(Item).toEqual({
    id: "1",
    hello: "world"
  });
});

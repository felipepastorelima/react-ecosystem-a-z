jest.mock("node-fetch");

const fetch = require("node-fetch");
const Response = jest.requireActual("node-fetch").Response;

const createUser = require("./createUser");

test("createUser calls fetch with the right args and returns the user id", async () => {
  fetch.mockReturnValue(Promise.resolve(new Response("4")));

  const userId = await createUser();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith("http://website.com/users", {
    method: "POST"
  });
  expect(userId).toBe("4");
});

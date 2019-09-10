const fetch = require("node-fetch");

module.exports = async () => {
  const response = await fetch("http://website.com/users", { method: "POST" });
  const userId = await response.text();
  return userId;
};

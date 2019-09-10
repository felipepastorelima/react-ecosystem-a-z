const axios = require("axios").default;

class Users {
  static all() {
    return axios.get("/users.json").then(resp => resp.data);
  }
}

module.exports = Users;

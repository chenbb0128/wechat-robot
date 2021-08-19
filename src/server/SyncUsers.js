const BaseApi = require("./BaseApi");

class SyncUsers extends BaseApi {
  constructor(users) {
    super();
    this.users = users;
  }

  getApi() {
    return '/syncUsers';
  }

  getMethod() {
    return "POST";
  }

  getParams() {
    return {
      users: this.users,
    }
  }
}

module.exports = SyncUsers

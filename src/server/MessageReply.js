const BaseApi = require("./BaseApi");

class MessageReply extends BaseApi {
  constructor(keyword, user) {
    super();
    this.keyword = keyword;
    this.user = user
  }

  getApi() {
    return '/messageReply';
  }

  getMethod() {
    return "POST";
  }

  getParams() {
    return {
      keyword: this.keyword,
      user: this.user
    }
  }
}

module.exports = MessageReply

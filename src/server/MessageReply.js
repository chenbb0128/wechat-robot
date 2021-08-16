const BaseApi = require("./BaseApi");

class MessageReply extends BaseApi {
  constructor(keyword) {
    super();
    this.keyword = keyword;
  }

  getApi() {
    return '/reply';
  }

  getMethod() {
    return "POST";
  }

  getParams() {
    return {
      keyword: this.keyword,
    }
  }
}

module.exports = MessageReply

const BaseApi = require("./BaseApi");

class JdGoodsSearch extends BaseApi {
  constructor(keyword) {
    super();
    this.keyword = keyword;
  }

  getApi() {
    return '/jdGoodsSearch';
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

module.exports = JdGoodsSearch

const BaseApi = require("./BaseApi");

class TpwdSearch extends BaseApi {
  constructor(q) {
    super();
    this.q = q;
  }

  getApi() {
    return '/tpwdSearch';
  }

  getMethod() {
    return "POST";
  }

  getParams() {
    return {
      q: this.q,
    }
  }
}

module.exports = TpwdSearch

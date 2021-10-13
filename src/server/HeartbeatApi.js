const BaseApi = require("./BaseApi");

class HeartbeatApi extends BaseApi {
  constructor(status) {
    super()
    this.status = status
  }

  getApi() {
    return '/heartbeat';
  }

  getMethod() {
    return "POST";
  }

  getParams() {
    return {
      status: this.status,
    }
  }
}

module.exports = HeartbeatApi

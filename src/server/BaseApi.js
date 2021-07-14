const axios = require('axios');
const qs = require('qs');
const config = require('../config/config')

const formatParams = values => {
  const params = {};
  Object.keys(values).forEach(key => {
    if (typeof values[key] === 'object') {
      params[key] = JSON.stringify(values[key]);
    } else {
      params[key] = values[key];
    }
  });
  return params;
};

const HttpMethod = {
  GET: 'GET',
  POST: "POST"
};

class BaseApi {
  getApi() {
    throw new Error('please overwrite getApi method')
  }

  getParams() {
    return {}
  }

  getHeaders() {
    return {}
  }

  attachVersion() {
    return true;
  }

  getMethod() {
    return HttpMethod.GET;
  }

  send() {
    let api = `/${this.getApi().replace(/^(\\s|\/)+|(\\s|\/)+$/g, '')}`;
    if (this.attachVersion()) {
      const version = 'v1'
      api = `${config.server_url}/api/${version}${api}`
    }

    let headers = this.getHeaders();

    const options = {
      url: api,
      method: this.getMethod(),
      headers: headers
    };
    if (this.getMethod().toUpperCase() === HttpMethod.GET) {
      options.params = this.getParams();
    } else {
      options.data = qs.stringify(formatParams(this.getParams()));
    }
    console.log(options)
    return axios.request(options);
  }
}

module.exports = BaseApi

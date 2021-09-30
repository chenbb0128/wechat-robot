const { getOfWork } = require('../schecdule/getOfWork')
const { waimai } = require('../schecdule/waimai')
const { heartbeat } = require('../schecdule/heartbeat')
const robotApi = require('../routes/robotApi')
module.exports = (bot, service) => {
  return async function onLogin() {
    // 登录后的操作
    // robotApi(service)
    // await getOfWork(bot);
    // await waimai(bot)
    await heartbeat(bot)
  }
}

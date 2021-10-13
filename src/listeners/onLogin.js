const { getOfWork } = require('../schecdule/getOfWork')
const { waimai } = require('../schecdule/waimai')
const { heartbeat } = require('../schecdule/heartbeat')
const robotApi = require('../routes/robotApi')
const heartbeatApi = require('../server/HeartbeatApi')

module.exports = (bot, service) => {
  return async function onLogin() {
    // 登录后的操作
    // robotApi(service)
    // await getOfWork(bot);
    // await waimai(bot)
    await asyncOnlineStatus()
    await heartbeat(bot)
  }

  async function asyncOnlineStatus() {
    await new heartbeatApi(true)
      .send()
      .then(response => {
        console.log('同步在线状态')
      })
      .catch(error => {
        console.log(error)
        console.log('同步在线状态失败')
      })
  }
}

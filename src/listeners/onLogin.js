const { getOfWork } = require('../schecdule/getOfWork')
const { waimai } = require('../schecdule/waimai')
module.exports = bot => {
  return async function onLogin() {
    // 登录后的操作
    await getOfWork(bot);
    await waimai(bot)
  }
}

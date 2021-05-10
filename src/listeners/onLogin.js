const { getOfWork } = require('../schecdule/getOfWork')
module.exports = bot => {
  return async function onLogin() {
    // 登录后的操作
    await getOfWork(bot);
  }
}

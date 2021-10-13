const heartbeatApi = require('../server/HeartbeatApi')

module.exports = bot => {
  return async function onLogout(user) {
    console.log(`用户${user}已登出`)
    const contact = await bot.Contact.find({ alias: '陈华' })
    await contact.say('我退出了')
    await asyncOnlineStatus()
  }

  async function asyncOnlineStatus() {
    await new heartbeatApi(false)
      .send()
      .then(response => {
        console.log('同步退出在线状态')
      })
      .catch(error => {
        console.log(error)
        console.log('同步退出在线状态失败')
      })
  }
}

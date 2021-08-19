const user = require('../common/user')
const delay = require('delay')

async function onReady() {
  console.log('onReady')
  await user.updateContactInfo(this);
  await delay(5000)
  // await user.updateRoomInfo(this)
}

module.exports = onReady

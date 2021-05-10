const config = require('../config/config')

async function onRoomInvite(roomInvitation) {
  try {
    console.log(`received room-invite event.`)
    await roomInvitation.accept()
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  default: onRoomInvite,
  onRoomInvite
}

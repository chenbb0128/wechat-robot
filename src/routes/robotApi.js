const { FileBox } = require('file-box')
const { messageType } = require('../constants/message')

module.exports = (bot, service) => {
  service.post('/test', async function (req, res) {
    console.log(req.body.formData)
    res.send('调用成功')
  })
  service.post('/sendRoomMessage', async function (req, res) {
    const query = req.body.query
    const msgType = req.body.msgType
    const msg = req.body.msg
    const room = await bot.Room.find(query)
    switch (msgType) {
      case messageType.TEXT:
        room.say(msg)
        break
      case messageType.IMAGE:
        const fileBox = FileBox.fromUrl(msg)
        room.say(fileBox)
        break
      default:
        console.log('未知类别，发送消息失败')
        break
    }
  })

  service.post('/sendContactMessage', async function (req, res) {
    const query = req.body.query
    const msgType = req.body.msgType
    const msg = req.body.msg
    const contact = await bot.Contact.find(query)
    switch (msgType) {
      case messageType.TEXT:
        contact.say(msg)
        break
      case messageType.IMAGE:
        const fileBox = FileBox.fromUrl(msg)
        contact.say(fileBox)
        break
      default:
        console.log('未知类别，发送消息失败')
        break
    }
  })
}

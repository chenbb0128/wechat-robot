const { FileBox } = require('file-box')
const { messageType } = require('../constants/message')
const delay = require('delay');
const randomNum = require('../utils/randomNum')

module.exports = (bot, service) => {
  service.post('/test', async function (req, res) {
    const searchRoom = await bot.Room.find({topic: '陈华测试'});
    searchRoom.say(req.body.text)
    console.log(req.body.text)
    res.send('调用成功1')
  })
  service.post('/sendRoomMessage', async function (req, res) {
    const query = JSON.parse(req.body.query)
    const msgType = req.body.msg_type
    const msg = req.body.msg
    const room = await bot.Room.find(query)
    const replyGapTime = randomNum(2, 5) * 1000
    await delay(replyGapTime)
    switch (parseInt(msgType)) {
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
    res.status(200).send('调用成功')
  })

  service.post('/sendContactMessage', async function (req, res) {
    const query = JSON.parse(req.body.query)
    const msgType = req.body.msg_type
    const msg = req.body.msg
    const contact = await bot.Contact.find(query)
    const replyGapTime = randomNum(3, 5) * 1000
    await delay(replyGapTime)
    switch (parseInt(msgType)) {
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
    res.status(200).send('调用成功')
  })

  service.post('/setUserAlias', async function (req, res) {
    const query = JSON.parse(req.body.query)
    const alias = req.body.alias
    const contact = await bot.Contact.find(query)
    await contact.alias(alias)
    const changeAliasTime = randomNum(3, 5) * 1000
    await delay(changeAliasTime)
    res.status(200).send('调用成功')
  })
}

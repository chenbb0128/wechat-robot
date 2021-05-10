const { Message } = require('wechaty');
const request = require("request")
const urlencode = require("urlencode")

module.exports = bot => {
  return async function onMessage(msg) {
    if (msg.self()) {
      return ;
    }
    console.log("=============================") 
    console.log(`msg : ${msg}`) 
    console.log(
      `from: ${msg.talker() ? msg.talker().name() : null}: ${
        msg.talker() ? msg.talker().id : null
      }` ) console.log(`to: ${msg.to()}`) 
    console.log(`text: ${msg.text()}`) 
    console.log(`isRoom: ${msg.room()}`) 
    console.log("=============================")
    if (msg.type() == Message.Type.Text) {
      // 判断消息来自群聊·
      if (msg.room()) {
        const room = await msg.room();
        console.log(room.id)
        // 收到消息 提到自己
        if (await msg.mentionSelf()) {
          // 获取机器人自己的名字
          console.log(msg.text());
          console.log(await msg.mention());
          // 返回消息，并@来自人 
          room.say('哈哈大笑', msg.talker())
          return;
        }
      } else {
        msg.say('哈哈大笑')
      }
    } else {
      console.log('消息不是文本!')
    }
  }
}

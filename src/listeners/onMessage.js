const { Message } = require('wechaty');
const config = require('../config/config')


async function onMessage(msg) {
  const room = await msg.room();
  const from = msg.talker();
  const text = msg.text();
  // 屏蔽自己的消息
  if (msg.self()) {
    return;
  }
  room && console.log(await room.topic() + ':' +room.id)
  // 屏蔽不在自己管理的群组消息
  if (room && !Object.values(config.room.roomList).includes(room.id)) {
    return;
  }
  if (msg.type() === Message.Type.Text) {
    // 判断消息来自群聊·
    if (room) {
      // 收到消息 提到自己
      if (await msg.mentionSelf()) {
        // 获取机器人自己的名字
        console.log(text);
        // 返回消息，并@来自人 
        room.say('你喊我干啥呢？', from)
        return;
      }
    } else {
      msg.say('你喊我干啥呢？')
    }
  } else {
    console.log('消息不是文本!')
  }
}

module.exports = {
  default: onMessage,
  onMessage,
}

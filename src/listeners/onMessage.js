const config = require('../config/config')
const delay = require('delay');
const { getContactTextReply, getRoomTextReply } = require('../common/reply')
const randomNum = require('../utils/randomNum')

async function onMessage(msg) {
  try {
    const room = msg.room()
    // 屏蔽自己的消息
    if (msg.self()) {
      return;
    }
    if (room) {
      await dispatchRoomFilterByMsgType(this, room, msg)
    } else {
      await dispatchFriendFilterByMsgType(this, msg)
    }
  } catch (e) {
    console.log('消息模块错误');
    console.log(e.message);
  }
}



/**
 * 根据消息类型处理群消息事件
 * @param bot bot实例
 * @param room room对象
 * @param msg 消息主体
 * @returns {Promise<void>}
 */
async function dispatchRoomFilterByMsgType(bot, room, msg) {
  const roomName = await room.topic()
  const userSelfName = bot.userSelf().name()
  const content = msg.text()
  console.log(await room.topic() + ':' +room.id)
  const mentionSelf = content.includes(`@${userSelfName}`)
  if (!mentionSelf) {
    return
  }
  const roomList = config[config.env].room.roomList
  // 屏蔽不在自己管理的群组消息
  if (!Object.keys(roomList).includes(roomName)) {
    return;
  }
  // 发送信息的人
  const contact = msg.talker()
  const contactName = contact.name()
  const type = msg.type()
  switch (type) {
    case bot.Message.Type.Text:
      console.log(`群名: ${roomName} 发消息人: ${contactName} 内容: ${content}`)
      const reply = await getRoomTextReply(bot, room, msg)
      const replyGapTime = randomNum(1, 3) * 1000
      console.log(reply)
      if (reply.trim()) {
        await delay(replyGapTime)
        msg.say(reply)
      }
      break
    case bot.Message.Type.Emoticon:
      console.log(`群名: ${roomName} 发消息人: ${contactName} 发了一个表情`)
      break
    case bot.Message.Type.Image:
      console.log(`群名: ${roomName} 发消息人: ${contactName} 发了一张图片`)
      break
    case bot.Message.Type.Url:
      console.log(`群名: ${roomName} 发消息人: ${contactName} 发了一个链接`)
      break
    case bot.Message.Type.Video:
      console.log(`群名: ${roomName} 发消息人: ${contactName} 发了一个视频`)
      break
    case bot.Message.Type.Audio:
      console.log(`群名: ${roomName} 发消息人: ${contactName} 发了一个语音`)
      break
    default:
      break
  }
}

/**
 * 根据消息类型处理私聊消息事件
 * @param bot bot实例
 * @param msg 消息主体
 * @returns {Promise<void>}
 */
async function dispatchFriendFilterByMsgType(bot, msg) {
  const type = msg.type()
  // 发消息人
  const contact = msg.talker()
  const isOfficial = contact.type() === bot.Contact.Type.Official
  switch (type) {
    case bot.Message.Type.Text:
      if (isOfficial) {
        console.log('公众号消息')
        return;
      }
      const reply = await getContactTextReply(bot, contact, msg)
      console.log(reply)
      const replyGapTime = randomNum(1, 3) * 1000
      if (reply.trim()) {
        await delay(replyGapTime)
        msg.say(reply)
      }
      break
    case bot.Message.Type.Emoticon:
      console.log(`发消息人${await contact.name()}:发了一个表情`)
      break
    case bot.Message.Type.Image:
      console.log(`发消息人${await contact.name()}:发了一张图片`)
      break
    case bot.Message.Type.Url:
      console.log(`发消息人${await contact.name()}:发了一个链接`)
      break
    case bot.Message.Type.Video:
      console.log(`发消息人${await contact.name()}:发了一个视频`)
      break
    case bot.Message.Type.Audio:
      console.log(`发消息人${await contact.name()}:发了一个视频`)
      break
    default:
      break
  }
}

module.exports = {
  default: onMessage,
  onMessage,
}

const MessageReply = require('../server/MessageReply')

async function getContactTextReply(bot, contact, msg) {
  const content = msg.text().trim();
  console.log(`发消息人${await contact.name()}:${content}`)
  if (['帮助'].includes(content) || content === '') {
    return helpReply()
  }
  if (/^[0-9]{19}/.test(content)) {
    // 记录淘宝订单号
  }
  return await reply(content, contact)
}

async function getRoomTextReply(bot, room, contact, msg) {
  const content = msg.text().replace(/@[^,，：:\s@]+/g, '').trim()
  if (['帮助'].includes(content) || content === '') {
    return helpReply()
  }
  return await reply(content, contact)
}

async function helpReply() {
  return "请输入以下关键词来帮助您更好的与我交流哦～\n" + "① '帮助'：显示帮助操作\n" + "② 回复京东链接或淘宝口令可查询佣金\n" + "③ 小主人vx：chenhuazhenbang\n";
}

async function reply(keyword, contact) {
  contact = contact.payload
  const user = {
    wx_id: contact.id,
    wx_no: contact.weixin || '',
    uid: contact.alias || '',
  }
  const message = await new MessageReply(keyword, user)
    .send()
    .then(response => {
      const data = response.data
      if (data.code == 200) {
        const reply = data.data
        if (Object.keys(reply).length) {
          return reply.desc
        }
      }
      reply.desc = ''
    })
    .catch(response => {
      return '我发生错误了，请原谅我，我马上让小主人修理我一下'
    })
  return message
}

module.exports = {
  getContactTextReply,
  getRoomTextReply
}

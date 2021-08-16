const TpwdSearch = require('../server/TpwdSearch')
const JdGoodsSearch = require('../server/JdGoodsSearch')
const MessageReply = require('../server/MessageReply')

async function getContactTextReply(bot, contact, msg) {
  const content = msg.text().trim();
  console.log(`发消息人${await contact.name()}:${content}`)
  if (['帮助'].includes(content) || content === '') {
    return helpReply()
  }
  if (content.startsWith("淘宝")) {
    // 搜索淘宝商品
    const keyword = content.replace("淘宝", "").trim()
    return await tpwdSearch(keyword)
  }
  if (content.startsWith("京东")) {
    const keyword = content.replace("京东", "").trim()
    return await jdGoodsSearch(keyword)
  }
  if (/^[0-9]{19}/.test(content)) {
    // 记录淘宝订单号
  }
  return await reply(content)
}

async function getRoomTextReply(bot, room, msg) {
  const content = msg.text().replace(/@[^,，：:\s@]+/g, '').trim()
  if (['帮助'].includes(content) || content === '') {
    return helpReply()
  }
  if (content.startsWith("淘宝")) {
    // 搜索淘宝商品
    const keyword = content.replace("淘宝", "").trim()
    return await tpwdSearch(keyword)
  }
  if (content.startsWith("京东")) {
    const keyword = content.replace("京东", "").trim()
    return await jdGoodsSearch(keyword)
  }
  return await reply(content)
}

async function helpReply() {
  return "请输入以下关键词来帮助您更好的与我交流哦～\n" + "① '帮助'：显示帮助操作\n" + "② 回复京东链接或淘宝口令可查询佣金\n" + "③ 小主人vx:chenhuazhenbang\n";
}

async function tpwdSearch(keyword) {
  let goodsInfo = '';
  goodsInfo = await new TpwdSearch(keyword)
    .send()
    .then((response) => {
      const data = response.data
      if (data.code == 200) {
        const goods = data.data;
        if (Object.keys(goods).length) {
          return goods.desc
        }
        return '该商品未查询到佣金，请联系我的小主人哦～'
      }
    })
    .catch(response => {
      return '我发生错误了，请原谅我，我马上让小主人修理我一下'
    })
  return goodsInfo;
}

async function jdGoodsSearch(keyword) {
  let goodsInfo = '';
  goodsInfo = await new JdGoodsSearch(keyword)
    .send()
    .then(response => {
      const data = response.data
      if (data.code == 200) {
        const goods = data.data
        if (Object.keys(goods).length) {
          return goods.desc
        }
        return '该商品未查询到佣金，请联系我的小主人哦～'
      }
    })
    .catch(response => {
      return '我发生错误了，请原谅我，我马上让小主人修理我一下'
    })
  return goodsInfo
}

async function reply(keyword) {
  const message = await new MessageReply(keyword)
    .send()
    .then(response => {
      const data = response.data
      if (data.code == 200) {
        const goods = data.data
        if (Object.keys(goods).length) {
          return goods.desc
        }
        return '该商品未查询到佣金，请联系我的小主人哦～'
      }
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

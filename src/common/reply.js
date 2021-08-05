const TpwdSearch = require('../server/TpwdSearch')
const JdGoodsSearch = require('../server/JdGoodsSearch')

async function getContactTextReply(bot, contact, msg) {
  const content = msg.text().trim();
  console.log(`发消息人${await contact.name()}:${content}`)
  if (['帮助'].includes(content) || content === '') {
    return helpReply()
  }
  if (content.indexOf("淘宝") >= 0) {
    // 搜索淘宝商品
    const keyword = content.replace("淘宝", "").trim()
    return await tpwdSearch(keyword)
  }
  if (content.indexOf("京东") >= 0) {
    const keyword = content.replace("京东", "").trim()
    return await jdGoodsSearch(keyword)
  }
  if (/^[0-9]{19}/.test(content)) {
    // 记录淘宝订单号
  }
  return '';
}

async function getRoomTextReply(bot, room, msg) {
  const content = msg.text().replace(/@[^,，：:\s@]+/g, '').trim()
  if (['帮助'].includes(content) || content === '') {
    return helpReply()
  }
  if (content.indexOf("淘宝") >= 0) {
    // 搜索淘宝商品
    const keyword = content.replace("淘宝", "").trim()
    return await tpwdSearch(keyword)
  }
  if (content.indexOf("京东") >= 0) {
    const keyword = content.replace("京东", "").trim()
    return await jdGoodsSearch(keyword)
  }
  return ''
}

async function helpReply() {
  return "请输入以下关键词来帮助您更好的与我交流哦～\n" + "① '帮助'：显示帮助操作\n" + "② 淘宝'+淘口令获取商品优惠券佣金查询\n";
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
          return goods.intro
        }
        return '该商品未查询到佣金，请联系我的小主人哦～'
      }
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
          return goods.intro
        }
        return '该商品未查询到佣金，请联系我的小主人哦～'
      }
    })
  return goodsInfo
}

module.exports = {
  getContactTextReply,
  getRoomTextReply
}

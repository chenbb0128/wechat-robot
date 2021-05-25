const TpwdSearch = require('../server/TpwdSearch')

async function getContactTextReply(bot, contact, msg) {
  const content = msg.text().trim();
  console.log(`发消息人${await contact.name()}:${content}`)
  if (content.indexOf("淘宝") >= 0) {
    // 搜索淘宝商品
    const keyword = content.replace("淘宝", "").trim()
    return await tpwdSearch(keyword)
  }
  if (/^[0-9]{19}/.test(content)) {
    // 记录淘宝订单号
  }
  return '你喊我干啥呢？';
}

async function getRoomTextReply(bot, room, msg) {
  const content = msg.text().replace(/@[^,，：:\s@]+/g, '').trim()
  if (['帮助', 'help', 'HELP'].includes(content) || content === '') {
    return helpReply()
  }
  if (content.indexOf("淘宝") >= 0) {
    // 搜索淘宝商品
    const keyword = content.replace("淘宝", "").trim()
    return await tpwdSearch(keyword)
  }
  return '你喊我干啥呢？'
}

async function helpReply() {
  da
  return "请输入以下关键词来帮助您更好的与我交流哦～\n" + "① '帮助','help','HELP'：显示帮助操作\n" + "② 淘宝'+淘口令获取商品优惠券佣金查询\n";
}

async function tpwdSearch(keyword) {
  let goodinfo = '';
  goodinfo = await new TpwdSearch(keyword)
    .send()
    .then((response) => {
      const data = response.data;
      if (data.status == 1) {
        const goods = data.data;
        // 折扣价
        const zkPrice = (goods.price - goods.coupon_price).toFixed(2);
        const commissionRate = (goods.commission_rate / 100 * 0.85).toFixed(2);
        const commissionPrice = (zkPrice * commissionRate / 100).toFixed(2);
        return `复制本条信息购买\n${goods.tpwd}\n原价：${goods.price} 元\n优惠价：${zkPrice} 元\n佣金比率：${commissionRate}%\n预估佣金：${commissionPrice} 元`
      }
    })
  return goodinfo;
}

module.exports = {
  getContactTextReply,
  getRoomTextReply
}

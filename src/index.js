const { Wechaty } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-padlocal');
const config = require('./config/config');

const express = require('express');
const app = express()

// const bot = new Wechaty({
//   puppet: new PuppetPadlocal({
//     token: config.token
//   }),
//   name: config.robot_name
// });

const bot = new Wechaty({
  name: config.robot_name,
  puppet: 'wechaty-puppet-wechat',
});

const onScan = require('./listeners/onScan');
const onLogin = require('./listeners/onLogin');
const { onMessage } = require('./listeners/onMessage');
const onFriendShip = require('./listeners/onFriendShip');
const { onRoomJoin } = require('./listeners/onRoomJoin');
const { onRoomInvite } = require('./listeners/onRoomInvite');
const { onRoomLeave } = require('./listeners/onRoomLeave');
const onRoomTopic = require('./listeners/onRoomTopic')
const onError = require('./listeners/onError')
const onReady = require('./listeners/onReady')
const onLogout = require('./listeners/onLogout')
const onHeartbeat = require('./listeners/onHeartbeat')

bot
  .on('scan', onScan)
  .on('login', onLogin(bot))
  .on('room-join', onRoomJoin)
  .on('room-invite', onRoomInvite)
  .on('room-leave', onRoomLeave)
  .on('message', onMessage)
  .on('friendship', onFriendShip)
  .on('room-topic', onRoomTopic)
  .on('logout', onLogout)
  .on('error', onError)
  .on('ready', onReady)
  .on('heartbeat', onHeartbeat)
  .start()
  .then(() => console.log('开始登陆微信'))
  .catch(e => console.error(e));

app.get('/', function (req, res) {
  res.send('Hello World1')
})

const TpwdSearch = require('./server/TpwdSearch')
const { FileBox } = require('file-box');

app.get('/test', async function (req, res) {
  // const str = '商品9👈￥fR5TXVxXadO￥ https://m.tb.cn/h.4rKUkcI  螺满地广西螺蛳粉300g整箱装 柳州正宗包邮袋装螺狮粉螺丝粉包邮';
  console.log(req.query.text)
  const text = req.query.text;
  const searchRoom = await bot.Room.find({ id: '@@9e4eafea48c6097a8c2c129132aaa2bd9d886f72aad534d5985a5f450700da07'});
  console.log(searchRoom)
  const fileBox2 = FileBox.fromUrl('https://i.loli.net/2021/05/11/ga3uewvxXMiEjyS.jpg');
  searchRoom.say(text);
  // const roomId = req.query.roomId ? req.query.roomId : '20817793749@chatroom';
  // const room = await bot.Room.find({ id: roomId })
  // await room.say(req.query.text);
  // const reply = new TpwdSearch(text).send().then((response) => {
  //   console.log(response)
  // }).catch(error => {
  //
  // })
  // const reply = tpwdSearch(text)
  res.send('调用成功');
})

const axios = require('axios');
async function tpwdSearch(keyword) {
  let res = '';
  await axios.post('http://www.robot.test/api/v1/tpwdSearch', { q: keyword })
    .then(function (response) {
      const data = response.data;
      if (data.status == 1) {
        const goods = data.data;
        // 折扣价
        const zkPrice = (goods.price - goods.coupon_price).toFixed(2);
        const commissionRate = (goods.commission_rate / 100 * 0.85).toFixed(2);
        const commissionPrice = (zkPrice * commissionRate / 100).toFixed(2);
        let info = `复制本条信息购买\n${goods.tpwd}\n原价：${goods.price} 元\n优惠价：${zkPrice} 元\n佣金比率：${commissionRate}%\n预估佣金：${commissionPrice} 元`
        console.log(info)
        res = info;
      }
    })
    .catch(function (error) {
      console.log(error)
      res = '查询错误，请联系管理员';
    })
  return res;
}

app.listen(3000)

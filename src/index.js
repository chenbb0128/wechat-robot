const { Wechaty } = require('wechaty')
const { PuppetPadlocal } = require('wechaty-puppet-padlocal')
const config = require('./config/config')

const express = require('express');
const bodyParser = require('body-parser')
const service = express()
service.use(bodyParser.urlencoded({extended: false}))
service.use(bodyParser.json())

const bot = new Wechaty({
  puppet: new PuppetPadlocal({
    token: config.token
  }),
  name: config.robot_name
});

// const bot = new Wechaty({
//   name: config.robot_name,
//   puppet: 'wechaty-puppet-wechat',
// });

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
  .on('login', onLogin(bot, service))
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

// 机器人api接口
const robotApi = require('./routes/robotApi')
robotApi(bot, service)
service.listen(3333)

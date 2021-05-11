const { Wechaty } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-padlocal');
const config = require('./config/config');

const express = require('express');
const app = express()

const bot = new Wechaty({
  puppet: new PuppetPadlocal({
    token: config.token
  }),
  name: config.robot_name
});

const onScan = require('./listeners/onScan');
const onLogin = require('./listeners/onLogin');
const { onMessage } = require('./listeners/onMessage');
const onFriendShip = require('./listeners/onFriendShip');
const { onRoomJoin } = require('./listeners/onRoomJoin');
const { onRoomInvite } = require('./listeners/onRoomInvite');
const { onRoomLeave } = require('./listeners/onRoomLeave');

bot
  .on('scan', onScan)
  .on('login', onLogin(bot))
  .on('room-join', onRoomJoin)
  .on('room-invite', onRoomInvite)
  .on('room-leave', onRoomLeave)
  .on('message', onMessage)
  .on('friendship', onFriendShip)
  .on('logout',     user => log.info('Bot', `${user.name()} logouted`))
  .on('error',      error => log.info('Bot', 'error: %s', error))
  .start()
  .then(() => console.log('开始登陆微信'))
  .catch(e => console.error(e));

app.get('/', function (req, res) {
  res.send('Hello World1')
})

app.get('/test', async function (req, res) {
  console.log(req.query.text)
  const text = req.query.text;
  const roomId = req.query.roomId ? req.query.roomId : '20817793749@chatroom';
  const room = await bot.Room.find({ id: roomId })
  await room.say(req.query.text);
  res.send('我在调用');
})

app.listen(3000)

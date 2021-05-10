const { Wechaty } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-padlocal');
const config = require('./config/config');

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

bot
  .on('scan', onScan)
  .on('login', onLogin(bot))
  .on('room-join', onRoomJoin)
  .on('room-invite', onRoomInvite)
  .on('message', onMessage)
  .on('friendship', onFriendShip)
  .on('logout',     user => log.info('Bot', `${user.name()} logouted`))
  .on('error',      error => log.info('Bot', 'error: %s', error))
  .start()
  .then(() => console.log('开始登陆微信'))
  .catch(e => console.error(e));

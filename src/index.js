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
const onMessage = require('./listeners/onMessage');
const onFriendShip = require('./listeners/onFriendShip');
const { onRoomJoin } = require('./listeners/onRoomJoin');

bot
  .on('scan', onScan)
  .on('room-join', onRoomJoin)
  .on('message', onMessage(bot))
  .on('friendship', onFriendShip)
  .on('logout',     user => log.info('Bot', `${user.name()} logouted`))
  .on('error',      error => log.info('Bot', 'error: %s', error))
  .start()
  .catch(e => console.error(e));

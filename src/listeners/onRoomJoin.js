const {
  Contact,
  Room,
  Wechaty,
} = require('wechaty');
const delay = require('delay');
const config = require('../config/config')

// 进入房间监听回调 room-群聊 inviteeList-受邀者名单 inviter-邀请者
async function onRoomJoin(
  room,
  inviteeList,
  inviter,
) {
  try {
    // 判断配置项群组id数组中是否存在该群聊id
    if (!Object.values(config.room.roomList).includes(room.id)) {
      return;
    }
    // 自己
    const inviterIsMyself = inviter.self()
    inviteeList.map((async c => {
      await room.say('欢迎加入，请准守群规，做一个可爱的群友', c)
      await delay(1000);
    }))
  } catch (e) {
    console.info(e)
  }
}

async function restrictionJoin(room, inviteeList, inviter) {
  await room.say('请勿私自拉人。需要拉人请加我', inviter)
  await delay(1000);
  await room.say('请先加我好友，然后我来拉你入群。先把你移出啦。', ...inviteeList)
  await delay(1000);
  inviteeList.forEach(async c => {
    await room.del(c);
    await delay(3000);
  })
}

module.exports = {
  default: onRoomJoin,
  onRoomJoin,
}

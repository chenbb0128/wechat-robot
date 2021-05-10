const {
  Contact,
  Room,
  Wechaty,
} = require('wechaty');
const config = require('../config/config')

// 进入房间监听回调 room-群聊 inviteeList-受邀者名单 inviter-邀请者
async function onRoomJoin(
  room,
  inviteeList,
  inviter,
) {
  try {
    // 判断配置项群组id数组中是否存在该群聊id
    if (Object.values(config.room.roomList).some(v => v == room.id)) {
      let roomTopic = await room.topic()
      inviteeList.map(c => {
        // 发送消息并@
        room.say(config.room.roomJoinReply, c)
      })
    }

  } catch (e) {
    console.info(e)
  }

}

async function restrictionJoin(room, inviteeList, inviter) {
  const inviteeName = inviteeList.map(c => c.name()).join(', ')
  // 本人邀请
  const inviterIsMyself = inviter.self()
  if (inviterIsMyself) {
    await room.say('Welcome to my room: ' + inviteeName)
    return
  }

  await room.say('请勿私自拉人。需要拉人请加我', inviter)
  await room.say('请先加我好友，然后我来拉你入群。先把你移出啦。', inviteeList)
  inviteeList.forEach(async c => {
    await room.del(c)
  })

}

module.exports = {
  default: onRoomJoin,
  onRoomJoin,
}

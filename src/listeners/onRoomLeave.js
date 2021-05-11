// 当有人离群的时候，会触发这个事件。如果是用户主动离群，是无法获取到这个事件的。 room 房间 leaver 用户
async function onRoomLeave(room, leaver) {
  const leaverIsMyself = leaver.self();
  console.log(await room.topic() + '：' + await leaver.name() + ' 离开了');
}

module.exports = {
  default: onRoomLeave,
  onRoomLeave
}

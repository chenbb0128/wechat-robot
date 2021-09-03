const { Friendship } = require('wechaty');
const config = require('../config/config');
const randomNum = require('../utils/randomNum')
const delay = require('delay')
const user = require('../common/user')

module.exports = async function onFriendShip(friendship) {
  let  logMsg;
  try {
    const friend = friendship.contact()
    logMsg = "添加好友" + friend.name()
    switch (friendship.type()) {
      case Friendship.Type.Receive:
        // 添加新的好友，暂时开放自动添加好友功能
        console.log(logMsg)
        // const addFriendGapTime = randomNum(6, 10) * 10000
        // await delay(addFriendGapTime)
        // logMsg = `自动通过验证，因为验证消息是"${friendship.hello()}"`
        // await friendship.accept()
        // await user.addFriend(friend)
        // // 如果要发送MSG，有时需要延迟
        // const replyFriendGapTime = randomNum(1, 5) * 1000
        // await delay(replyFriendGapTime)
        // // 发送消息给添加的人
        // await friendship.contact().say('谢谢你加我，你笑起来真好看～')
        break;
      case Friendship.Type.Confirm:
        await user.addFriend(friend)
        await friendship.contact().say('谢谢你加我，你笑起来真好看～')
        console.log('添加好友成功,'+ friendship.contact().name())
        break;
    }
    console.log(logMsg);
  } catch (e) {
    console.log('添加好友失败，原因为：');
    console.log(e.message);
  }
}

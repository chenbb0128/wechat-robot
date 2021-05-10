const { Friendship } = require('wechaty');
const config = require('../config/config');

module.exports = async function onFriendShip(friendship) {
  let  logMsg;
  try {
    logMsg = "添加好友" + friendship.contact().name();
    console.log(logMsg);
    switch (friendship.type()) {
      case Friendship.Type.Receive:
        logMsg = `自动通过验证，因为验证消息是"${friendship.hello()}"`
        await friendship.accept();
        // 如果要发送MSG，有时需要延迟
        await new Promise(r => setTimeout(r, 1000))
        // 发送消息给添加的人
        await friendship.contact().say('谢谢你加我，你笑起来真好看～')
        break;
      case Friendship.Type.Confirm:
        logMsg = "friend ship confirmed with " + friendship.contact().name();
        break;
    }
    console.log(logMsg);
  } catch (e) {
    console.log('添加好友失败，原因为：');
    console.log(e.message);
  }
}

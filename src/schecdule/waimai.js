const schedule = require('./index');
const { FileBox } = require('file-box');
const delay = require('delay');
const config = require('./../config/config')

async function waimai(bot) {

  const time = [
    '0 45 10 * * *',
    '0 50 16 * * *'
  ]
  time.map(t => {
    schedule.setSchedule(t, async () => {
      try {
        const roomIds = Object.values(config.room.waimaiRoomList);
        for (let key in roomIds) {
          const searchRoom = await bot.Room.find({ id: roomIds[key] });
          const fileBox = FileBox.fromUrl('https://i.loli.net/2021/05/11/8VKtcbiI1JBCxuW.jpg');
          searchRoom.say(fileBox);
          await delay(1000);
          const fileBox2 = FileBox.fromUrl('https://i.loli.net/2021/05/11/ga3uewvxXMiEjyS.jpg');
          searchRoom.say(fileBox2);
          await delay(5000)
          searchRoom.say('天气多变，小心感冒，～长按领取饿了么现金红包，领券点餐更省钱\n' +
            '饿了么红包扫码就可以领取，有机会领取25-4，30-5立减红包\n' +
            '美团外卖红包地址：https://dpurl.cn/XuNI4Gaz');
        }
      } catch (e) {
        console.log("error:",e.message);
      }
    });
  })
}

module.exports = {
  default: waimai,
  waimai
}


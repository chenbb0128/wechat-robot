const schedule = require('./index');
const config = require('./../config/config')
async function getOfWork(bot) {
  schedule.setSchedule('0 0 18 * * *', async () => {
    try {
      const roomIds = Object.values(config.room.roomList);
      for (let key in roomIds) {
        const searchRoom = await bot.Room.find({ id: roomIds[key]});
        await searchRoom.say("快下班了~大佬们~工作辛苦啦~记得打卡，要好好吃饭哦😊")
      }
    } catch (e) {
      console.log("error:",e.message);
    }
  });
}

module.exports = {
  default: getOfWork,
  getOfWork
}


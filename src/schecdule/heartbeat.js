const schedule = require('./index');
const schedule2 = require('node-schedule');
const heartbeatApi = require('../server/HeartbeatApi')

async function heartbeat(bot) {
  let rule = new schedule2.RecurrenceRule()
  // rule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  rule.minute = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16,17,18,19,20,21,22,23,24,25, 33, 34, 35,36,37,38,39, 40, 41, 42 ,43,44,45]
  console.log('心跳测试')
  schedule.setSchedule(rule, async () => {
    await new heartbeatApi(true)
      .send()
      .then(response => {
        console.log('心跳测试成功')
      })
      .catch(error => {
        console.log(error)
        console.log('心跳测试失败')
      })
    console.log('1分钟执行一次')
    console.log(new Date())
  });
}

module.exports = {
  default: heartbeat,
  heartbeat
}


const schedule = require('./index');
const schedule2 = require('node-schedule');

async function heartbeat(bot) {
  let rule = new schedule2.RecurrenceRule()
  rule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  console.log('心跳测试')
  schedule.setSchedule(rule, async () => {
    console.log('5分钟执行一次')
    console.log(new Date())
  });
}

module.exports = {
  default: heartbeat,
  heartbeat
}


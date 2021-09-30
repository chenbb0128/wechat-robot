const schedule = require('./index');

async function heartbeat(bot) {
  let rule = new schedule.RecurrenceRule()
  rule.minute = [0, 5, 45]
  schedule.setSchedule(rule, async () => {
    console.log('5分钟执行一次')
    console.log(new Date())
  });
}

module.exports = {
  default: heartbeat,
  heartbeat
}


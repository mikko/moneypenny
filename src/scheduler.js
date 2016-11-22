const cron = require('node-cron');

const add = (schedule, fn) => cron.schedule(schedule, fn);

module.exports = {
  add,
};

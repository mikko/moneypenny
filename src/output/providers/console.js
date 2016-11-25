const Promise = require('bluebird');
const chalk = require('chalk');

const init = () => Promise.resolve((msg) => {
  console.log(`${chalk.gray('[slightly uncanny robotic voice says]:')} ${msg}`);
  return Promise.resolve();
});

module.exports = {
  init,
};

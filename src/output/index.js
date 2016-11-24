const consoleOutput = require('./providers/console');
const tts = require('./providers/tts');

const provider = process.env.OUTPUT || 'consoleOutput';

const providers = {
  consoleOutput,
  tts,
};

module.exports = {
  instance: providers[provider],
};

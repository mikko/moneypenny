const config = require('../config');

if (typeof config.flowdock.apiKey !== 'string') {
  throw new Error('Missing flowdock apikey. Api key can be given as environment variable FLOWDOCK_APIKEY');
}

const FlowdockStream = require('flowdock-stream');

const org = 'futurice-nonda';
const flows = ['testflow'];
const defaultRequestOptions = {};

module.exports = (cb) => {
  const flowdockStream = FlowdockStream.createClient(org, flows, config.flowdock.apiKey, defaultRequestOptions);

  flowdockStream.on('data', (data) => {
    const sourceFlow = flowdockStream.flows[data.flow];
    if (data.event === 'message') {
      const from = (data.user) ? sourceFlow.users[data.user] : null;
      if (data.content.indexOf('@team') !== -1) {
        const message = data.content.split('@team').join('');
        const text = `${from} had something to announce in ${sourceFlow.name} flow: ${message}`;
        cb(text);
      }
    }
  });

  flowdockStream.on('error', () => {
    cb('undefined is not a function');
  });
};

const config = require('../config');
const drive = require('../drive');
const textTemplate = require('../textTemplate');

const randomItem = ar => (ar[Math.floor(Math.random() * ar.length)]);

if (typeof config.flowdock.apiKey !== 'string') {
  throw new Error('Missing flowdock apikey. Api key can be given as environment variable FLOWDOCK_APIKEY');
}

const FlowdockStream = require('flowdock-stream');

const apiKey = config.flowdock.apiKey;
const org = 'futurice-nonda';
const flows = ['testflow'];
const defaultRequestOptions = {};

module.exports = (cb) => {
  const flowdockStream = FlowdockStream.createClient(org, flows, apiKey, defaultRequestOptions);

  flowdockStream.on('data', (data) => {
    const sourceFlow = flowdockStream.flows[data.flow];
    if (data.event === 'message') {
      if (data.content.indexOf('@team') !== -1) {
        const name = (data.user) ? sourceFlow.users[data.user] : null;
        const flow = sourceFlow.name;
        const message = data.content.split('@team').join('');
        drive.getContent('flowdock', ['phrase'])
          .then((content) => {
            const text = textTemplate(randomItem(content.phrase), {
              name,
              flow,
              message,
            });
            cb(text);
          });
      }
    }
  });

  flowdockStream.on('error', () => {
    cb('undefined is not a function');
  });
};

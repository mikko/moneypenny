const Promise = require('bluebird');
const output = require('./src/output').instance;
const drive = require('./src/drive');
const flowdock = require('./src/triggers/flowdock');
const voiceCommander = require('./src/voiceCommander');
const { say$, feedback$ } = require('./src/triggers/http');
const { listen } = require('./src/content/speechToText');

// const scheduler = require('./src/scheduler');

Promise.props({
  driveInstance: drive.init(),
  outputInstance: output.init(),
}).then(({ outputInstance }) => {
  say$.subscribe(outputInstance);
  feedback$.subscribe(() => {
    outputInstance('Yes?')
      .then(() => {
        console.log('Listening');
        listen()
          .then(results => voiceCommander.execute(results))
          .catch(e => console.log('Something wrong listening to command', e));
      });
  });
  flowdock(outputInstance);
  voiceCommander.init(outputInstance);

  // Testing is possible for example by running commands by hand
  // voiceCommander.execute('feedback');
});

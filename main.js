const Promise = require('bluebird');
const output = require('./src/output').instance;
const fmi = require('./src/content/fmi');
const smallTalk = require('./src/content/smalltalk');
const yleNews = require('./src/content/yleNews');
const drive = require('./src/drive');
const flowdock = require('./src/triggers/flowdock');
const { say$, feedback$ } = require('./src/triggers/http');
const { listen } = require('./src/content/speechToText');

// const scheduler = require('./src/scheduler');
const place = 'tampere';

Promise.props({
  driveInstance: drive.init(),
  outputInstance: output.init(),
}).then(({ outputInstance }) => {
  say$.subscribe(outputInstance);
  feedback$.subscribe(() => {
    console.log('Listening...');

    listen().then((results) => console.log('I heard', results));
  });

  yleNews.getText()
    .then(text => outputInstance(text));
/*
  smallTalk.getText()
    .then(text => say(text));
  fmi.getText(place)
    .then(text => say(text));
  yleNews.getText()
    .then(text => say(text));
*/
  // flowdock(say);
});

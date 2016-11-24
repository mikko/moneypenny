const Promise = require('bluebird');
const speak = require('./src/speak');
const fmi = require('./src/content/fmi');
const smallTalk = require('./src/content/smalltalk');
const yleNews = require('./src/content/yleNews');
const drive = require('./src/drive');
const flowdock = require('./src/triggers/flowdock');
const { say$, feedback$ } = require('./src/triggers/http');

// const scheduler = require('./src/scheduler');
const place = 'tampere';


Promise.all([
  drive.init(),
  speak.init(),
]).then((initResults) => {
  const say = initResults[1];

  say$.subscribe(say);
  feedback$.subscribe(() => {
    console.log('feedback');
  });

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

const Promise = require('bluebird');
const speak = require('./src/speak');
const fmi = require('./src/content/fmi');
const smallTalk = require('./src/content/smalltalk');
const yleNews = require('./src/content/yleNews');
const drive = require('./src/drive');

// const scheduler = require('./src/scheduler');
const place = 'tampere';

Promise.all([
  drive.init(),
  speak.init(),
]).then((res) => {
  const say = res[1];
  smallTalk.getText()
    .then(text => console.log('TEST Smalltalk:', text));
  fmi.getText(place)
    .then(text => console.log('TEST FMI:', text));
  yleNews.getText()
    .then(text => console.log('TEST NEWS:', text));
});

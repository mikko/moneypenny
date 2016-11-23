const Promise = require('bluebird');
const express = require('express');
const speak = require('./src/speak');
const fmi = require('./src/content/fmi');
const smallTalk = require('./src/content/smalltalk');
const yleNews = require('./src/content/yleNews');
const drive = require('./src/drive');

// const scheduler = require('./src/scheduler');
const place = 'tampere';

const app = express();

Promise.all([
  drive.init(),
  speak.init(),
]).then((initResults) => {
  const say = initResults[1];
  smallTalk.getText()
    .then(text => console.log('TEST Smalltalk:', text));
  fmi.getText(place)
    .then(text => console.log('TEST FMI:', text));
  yleNews.getText()
    .then(text => console.log('TEST NEWS:', text));

  app.get('/say', (req, res) => {
    if (!req.query.text) {
      res.status(400).end();
      return;
    }
    say(req.query.text);
    res.status(200).end();
  });

  app.listen(process.env.PORT || 3000);
});

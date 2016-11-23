const express = require('express');
const speak = require('./src/speak');
const fmi = require('./src/content/fmi');
const smallTalk = require('./src/content/smalltalk');
const yleNews = require('./src/content/yleNews');

const scheduler = require('./src/scheduler');
const place = 'tampere';

const app = express();

speak.init()
    .then((say) => {

      app.get('/say', (req, res) => {
        if(!req.query.text) {
          res.status(400).end();
          return;
        }
        say(req.query.text);
        res.status(200).end();
      });

      app.listen(process.env.PORT || 3000);
      yleNews.getText()
            .then(text => say(text));
        // scheduler.add('* * * * * *', () => say(smallTalk.getText()));
        // say(smallTalk.getText());
        // fmi.getText(place)
//            .then(text => say(text))
    });

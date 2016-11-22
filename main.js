const speak = require('./src/speak');
const fmi = require('./src/content/fmi');
const smallTalk = require('./src/content/smalltalk');
const yleNews = require('./src/content/yleNews');

const scheduler = require('./src/scheduler');
const place = 'tampere';


speak.init()
    .then((say) => {
      yleNews.getText()
            .then(text => say(text));
        // scheduler.add('* * * * * *', () => say(smallTalk.getText()));
        // say(smallTalk.getText());
        // fmi.getText(place)
//            .then(text => say(text))
    });

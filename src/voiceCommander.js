const _ = require('lodash');
const { listen } = require('./content/speechToText');
const fb = require('./content/feedback');
const fmi = require('./content/fmi');
const smallTalk = require('./content/smalltalk');
const yleNews = require('./content/yleNews');


let say = () => console.log('not initialized');

const availableCommands = [
  {
    name: 'feedback',
    validate: command => ['feedback', 'palaute'].indexOf(command) !== -1,
    execute: () => {
      say('Please tell');
      listen()
        .then((results) => {
          fb.registerFeedback(results);
          say('Thank you! Coffee is important but feedback is importarter');
        })
        .catch(e => console.log('Something wrong listening to feedback', e));
    },
  },
  {
    name: 'status',
    validate: command => ['status', 'mitä kuuluu'].indexOf(command) !== -1,
    execute: () => {
      const allFeedback = fb.getText();
      say(`All feedback this week ${allFeedback}`);
    },
  },
  {
    name: 'weather',
    validate: command => ['sää', 'weather', 'sataako', 'is it raining'].indexOf(command) !== -1,
    execute: () => {
      fmi.getText()
        .then(text => say(text));
    },
  },
  {
    name: 'news',
    validate: command => ['uutiset', 'uutisia', 'news'].indexOf(command) !== -1,
    execute: () => {
      yleNews.getText()
        .then(text => say(text));
    },
  },
];

const execute = (word) => {
  const command = _.find(availableCommands, cmd => cmd.validate(word));
  if (!command) {
    smallTalk.getText()
      .then(text => say(text));
  } else {
    command.execute();
  }
};

module.exports = {
  init: (sayInstance) => {
    say = sayInstance;
    say('Good morning. Did I fall asleep?');
  },
  execute,
};
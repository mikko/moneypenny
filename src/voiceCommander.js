const _ = require('lodash');
const { listen } = require('./content/speechToText');
const fb = require('./content/feedback');
const fmi = require('./content/fmi');
const smallTalk = require('./content/smalltalk');
const yleNews = require('./content/yleNews');
const tkl = require('./content/tkl/index');


let say = () => console.log('not initialized');

const availableCommands = [
  {
    name: 'feedback',
    validate: command => ['feedback', 'palaute'].indexOf(command) !== -1,
    execute: () =>
      say('Please tell')
      .then(listen)
      .then((results) => {
        fb.registerFeedback(results);
        return say('Thank you! Coffee is important but feedback is importarter');
      }).catch(e => console.log('Something wrong listening to feedback', e)),
  },
  {
    name: 'status',
    validate: command => ['status', 'mitä kuuluu'].indexOf(command) !== -1,
    execute: () => {
      fb.getText()
        .then((allFeedback) => say(allFeedback));
    },
  },
  {
    name: 'weather',
    validate: command => ['sää', 'weather', 'sataako', 'is it raining'].indexOf(command) !== -1,
    execute: () =>
      fmi.getText()
        .then(text => say(text))
        .catch(e => say(e.message)),
  },
  {
    name: 'news',
    validate: command => ['uutiset', 'uutisia', 'news'].indexOf(command) !== -1,
    execute: () =>
      yleNews.getText()
        .then(text => say(text))
        .catch(e => say(e.message)),
  },
  {
    name: 'bus',
    validate: command => ['antin bussi', 'bus', 'bussi', 'home'].indexOf(command) !== -1,
    execute: () =>
      tkl.getText()
        .then(text => say(`Only antti goes by bus. ${text}`))
        .catch(e => say(e.message)),
  },
];

const execute = (word) => {
  const command = _.find(availableCommands, cmd => cmd.validate(word));
  if (!command) {
    return smallTalk.getText()
      .then(text => say(text))
      .catch(e => say(e.message));
  }
  return command.execute();
};

module.exports = {
  init: (sayInstance) => {
    say = sayInstance;
    say('Good morning');
  },
  execute,
};

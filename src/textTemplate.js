const Moment = require('moment');

const paramGetters = {
  time: () => {
    const now = new Moment();
    return now.minutes() === 0 ? `${now.hours()} o'clock` : `${now.hours()} ${now.minutes()}`;
  },
};

const hasParam = word => word.indexOf('$') !== -1;

module.exports = (text, givenParams) => {
  const params = givenParams || {};
  if (!hasParam(text)) {
    return text;
  }
  const words = text.split(' ');
  return words.map((word) => {
    if (hasParam(word)) {
      let wordValue = params[word.slice(1)];
      if (!wordValue) {
        const paramGetter = paramGetters[word.slice(1)];
        wordValue = paramGetter ? paramGetter() : 'null pointer exception';
      }
      return wordValue;
    }
    return word;
  }).join(' ');
};

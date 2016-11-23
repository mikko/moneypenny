const Promise = require('bluebird');
const drive = require('../drive');

const randomItem = ar => (ar[Math.floor(Math.random() * ar.length)]);

module.exports = {
  id: 'smalltalk',
  getText: () => (
    new Promise(resolve => (
      drive.getContent('smalltalk', ['prefix', 'phrase'])
        .then((content) => {
          const chosenPrefix = randomItem(content.prefix);
          const chosenPhrase = randomItem(content.phrase);
          resolve(`${chosenPrefix} ${chosenPhrase}`);
        })
    ))
  ),
};


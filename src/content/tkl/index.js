const Promise = require('bluebird');
const drive = require('../../drive');
const textTemplate = require('../../textTemplate');
const api = require('./api');

const randomItem = ar => (ar[Math.floor(Math.random() * ar.length)]);

module.exports = {
  id: 'tkl',
  getText: (line = '17') => {
    return Promise.props({
      rows: drive.getContent('tkl', ['message']),
      times: api.fetchDepartures({ stop: '0035', line }),
    }).then(({ rows, times }) => {
      const textContent = randomItem(rows.message);

      const tklText = textTemplate(textContent, {
        line,
        time: times,
      });

      return tklText;
    });
  },
};

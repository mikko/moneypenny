const Promise = require('bluebird');
const drive = require('../drive');
const textTemplate = require('../textTemplate');

const fmi = require('fmi-js');
const Moment = require('moment');

const randomItem = ar => (ar[Math.floor(Math.random() * ar.length)]);

module.exports = {
  id: 'weather',
  getText: (givenPlace) => {
    const place = givenPlace || 'tampere';
    return Promise.all([
      fmi.latestObservations(place),
      drive.getContent('weather', ['message']),
    ])
      .then((res) => {
        const weather = res[0];
        const textContent = randomItem(res[1].message);

        const latestUpdate = weather.pop();
        const time = new Moment(latestUpdate.time);
        const timeText = time.minutes() === 0 ? `${time.hours()} o'clock` : `${time.hours()} ${time.minutes()}`;

        const weatherText = textTemplate(textContent, {
          place,
          time: timeText,
          temperature: latestUpdate.temperature,
        });

        return Promise.resolve(weatherText);
      });
  },
};

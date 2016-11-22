const fmi = require('fmi-js');
const Moment = require('moment');

module.exports = {
  id: 'weather',
  getText: place => fmi.latestObservations('suinula')
            .then((res) => {
              const latestUpdate = res.pop();
              const time = new Moment(latestUpdate.time);
              const timeText = `${time.hours()} ${time.minutes()}`;
// const weatherText = `Kello on ${timeText} ja lämpötila ${place}ssa on ${latestUpdate.temperature} astetta`;

              const weatherText = `It's ${timeText} and in ${place} and it is ${latestUpdate.temperature} degrees`;
              console.log(weatherText);
              return weatherText;
            }),
};

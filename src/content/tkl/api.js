const superagent = require('superagent');
const { tkl } = require('../../config');

const createUrl = ({ action, params }) => {
  const paramsStr = `request=${action}&${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;
  return `http://api.publictransport.tampere.fi/prod/?user=${tkl.user}&pass=${tkl.pass}&${paramsStr}`;
};

const fetchDepartures = ({ stop, line }) => {
  return new Promise((resolve, reject) => {
    superagent
      .get(createUrl({ action: 'stop', params: { code: stop, dep_limit: '20' } }))
      .then(resp => resp.body[0].departures)
      .then(departures => departures.filter(d => d.code === line).map(d => d.time))
      .then(departures => resolve(departures), reject);
  });
};

module.exports = {
  fetchDepartures,
};

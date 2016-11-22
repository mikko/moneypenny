const http = require('http');
const Promise = require('bluebird');

module.exports = url => (
  new Promise(resolve => (
    http.get(url, (res) => {
      if (res.statusCode !== 200) {
        throw new Error(`HTTP ${res.statusCode} ${url}`);
      }
      res.setEncoding('utf8');
      let document = '';
      res.on('data', bit => (document += bit));
      res.on('end', () => resolve(document));
    })))
);

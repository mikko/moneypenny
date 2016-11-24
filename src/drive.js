const Promise = require('bluebird');
const _ = require('lodash');
const GoogleSpreadsheet = require('google-spreadsheet');
const config = require('./config');

const doc = new GoogleSpreadsheet(config.google.spreadsheetId);

const init = function init() {
  return new Promise(resolve => doc.useServiceAccountAuth(config.google.credentials, resolve));
};

module.exports = {
  init,
  getContent: (sheetName, columnNames) => new Promise((resolve) => {
    doc.getInfo((infoErr, info) => {
      if (infoErr) {
        throw new Error(infoErr);
      }
      const sheet = _.find(info.worksheets, workSheet => workSheet.title === sheetName);
      sheet.getRows({}, (err, rows) => {
        if (err) {
          throw new Error(err);
        }
        const content = {};
        columnNames.forEach(col => (content[col] = []));
        rows.forEach(r => columnNames.forEach((col) => {
          // Filter out empty strings and other falsy
          if (r[col]) {
            content[col].push(r[col]);
          }
        }));
        resolve(content);
      });
    });
  }),
};

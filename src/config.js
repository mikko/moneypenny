require('dotenv').config();
const path = require('path');

module.exports = {
  flowdock: {
    apiKey: process.env.FLOWDOCK_APIKEY,
  },
  google: {
    speech: {
      projectId: process.env.GOOGLE_SPEECH_PROJECT_ID,
    },
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    // eslint-disable-next-line
    credentialsFile: process.env.GOOGLE_CREDENTIALS_FILE,
    credentials: require(path.join('..', process.env.GOOGLE_CREDENTIALS_FILE)),
  },
  voicerrs: {
    apiKey: process.env.VOICERSS_APIKEY,
  },
  http: {
    port: process.env.PORT || 3000,
  },
};

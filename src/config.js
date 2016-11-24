require('dotenv').config();

module.exports = {
  flowdock: {
    apiKey: process.env.FLOWDOCK_APIKEY,
  },
  google: {
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    // eslint-disable-next-line
    credentials: require(process.env.GOOGLE_CREDENTIALS_FILE),
  },
  voicerrs: {
    apiKey: process.env.VOICERSS_APIKEY,
  },
  http: {
    port: process.env.PORT || 3000,
  },
};

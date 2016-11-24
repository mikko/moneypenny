const Speech = require('@google-cloud/speech');
const record = require('node-record-lpcm16');
const config = require('../config');

// Instantiates a client
const speech = Speech({
  projectId: config.google.speech.projectId,
  keyFilename: config.google.credentialsFile,
});

const options = {
  config: {
    // Configure these settings based on the audio you're transcribing
    encoding: 'LINEAR16',
    sampleRate: 16000,
    languageCode: 'fi-FI',
  },
};

module.exports.listen = function listen() {
  return new Promise((resolve, reject) => {
    // Create a recognize stream
    const recognizeStream = speech.createRecognizeStream(options)
      .on('error', reject)
      .on('data', (data) => {
        if (data.endpointerType === 'ENDPOINTER_EVENT_UNSPECIFIED') {
          resolve(data.results);
        }
      });

    // Start recording and send the microphone input to the Speech API
    record.start({ sampleRate: 16000 }).pipe(recognizeStream);
  });
};

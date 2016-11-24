const Promise = require('bluebird');
const Speak = require('tts-speak');
const config = require('../../config');

let speakInstance;

if (typeof config.voicerrs.apiKey !== 'string') {
  throw new Error('Missing voicerss apikey. Api key can be given as environment variable VOICERSS_APIKEY');
}

const init = () => new Promise((resolve) => {
  speakInstance = new Speak({
    tts: {
      engine: {                       // The engine to use for tts
        name: 'voicerss',
        key: config.voicerrs.apiKey,     // The API key to use
      },
      lang: 'en-us',                  // The voice to use 'fi-fi'
      speed: 40,                      // Speed in %
      format: 'mp3',                  // Output audio format
      quality: '44khz_16bit_stereo',  // Output quality
      cache: `${__dirname}/cache`,    // The cache directory were audio files will be stored
      loglevel: 0,                    // TTS log level (0: trace -> 5: fatal)
      delayAfter: 0,                   // Mark a delay (ms) after each message
    },
    speak: {
      volume: 80,                     // Audio player volume
      loglevel: 0,                     // Audio player log level
    },
    loglevel: 0,                         // Wrapper log level
  });

        // voicerss apitoken    000ed153d9c54a40a8e5dea5596b3677

  speakInstance.once('ready', () => {
    const say = msg => speakInstance.say(msg);
    resolve(say);
  });
});

module.exports = {
  init,
};

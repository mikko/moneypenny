const fs = require('fs');

const feedbackStorage = [];
// const addFeedback = text => feedbackStorage.push({ time: new Date().getTime(), text });

const filename = 'feedback.json';

const registerFeedback = (feedback) => {
  feedbackStorage.push({ time: new Date().getTime(), text: feedback });
  fs.writeFile(filename, JSON.stringify(feedbackStorage, null, 2), (err) => {
    if (err) {
      console.log('Error saving feedback', err);
    }
  });
};

const getText = () => feedbackStorage.map(fb => fb.text).join('. ');

module.exports = {
  getText,
  registerFeedback,
};

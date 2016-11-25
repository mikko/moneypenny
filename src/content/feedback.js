const fs = require('fs');
const drive = require('../drive');
const textTemplate = require('../textTemplate');

const randomItem = ar => (ar[Math.floor(Math.random() * ar.length)]);

const feedbackStorage = [];

const filename = 'feedback.json';

const registerFeedback = (feedback) => {
  feedbackStorage.push({ time: new Date().getTime(), text: feedback });
  fs.writeFile(filename, JSON.stringify(feedbackStorage, null, 2), (err) => {
    if (err) {
      console.log('Error saving feedback', err);
    }
  });
};

const getText = () => new Promise(resolve => drive.getContent('status', ['feedbacks'])
    .then((content) => {
      let feedbacks = feedbackStorage.map(fb => fb.text).join('. ');
      if (feedbacks === '') {
        feedbacks = 'What\'s wrong with you? No feedback at all!';
      }
      console.log(feedbacks);
      const params = {
        feedbacks,
      };
      const feedbackText = textTemplate(randomItem(content.feedbacks), params);
      resolve(feedbackText);
    }));

module.exports = {
  getText,
  registerFeedback,
};

const $ = require('cheerio');
const Promise = require('bluebird');
const drive = require('../drive');
const get = require('../get');
const textTemplate = require('../textTemplate');

const url = 'http://yle.fi/uutiset/osasto/news/';

const randomItem = ar => (ar[Math.floor(Math.random() * ar.length)]);

module.exports = {
  id: 'news',
  getText: () => Promise.all([
    get(url),
    drive.getContent('news', ['prefix']),
  ])
    .then((res) => {
      const doc = res[0];
      const randomPrefix = randomItem(res[1].prefix);
      const articles = $('section.recommends > article', doc);
      const randomArticle = randomItem(articles);
      const articleHeader = $('a > h1', randomArticle).text().trim();
      const newsText = `${textTemplate(randomPrefix)} ${articleHeader}.`;

      return Promise.resolve(newsText);
    }),
};


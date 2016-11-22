const $ = require('cheerio');
const Promise = require('bluebird');
const get = require('../get');

const url = 'http://yle.fi/uutiset/osasto/news/';

const randomItem = ar => (ar[Math.floor(Math.random() * ar.length)]);

const prefixes = [
  'Currently in news:',
  'News agencies today',
];

module.exports = {
  getText: () => get(url)
      .then((doc) => {
        const articles = $('section.recommends > article', doc);
        const randomArticle = randomItem(articles);
        const articleHeader = $('a > h1', randomArticle).text();
        const randomPrefix = randomItem(prefixes);
        const newsText = `${randomPrefix} ${articleHeader}.`;
        return Promise.resolve(newsText);
      }),
};


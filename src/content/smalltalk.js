const randomItem = ar => (ar[Math.floor(Math.random() * ar.length)]);

const prefix = [
  'hi, have you heard that',
  'the word is that',
];

const phrases = [
  'emacs is superior to vim',
  'you should really taste musta makkara',
  'trams are a major cause of suicides in tampere',
  'tuomo can really fix about anything',
];

module.exports = {
  id: 'smalltalk',
  getText: () => {
    const chosenPrefix = randomItem(prefix);
    const chosenPhrase = randomItem(phrases);
    return `${chosenPrefix} ${chosenPhrase}`;
  },
};


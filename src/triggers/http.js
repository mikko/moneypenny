const express = require('express');
const bodyParser = require('body-parser');
const { Subject } = require('rx');
const config = require('../config');

const app = express();

const say$ = module.exports.say$ = new Subject();
const feedback$ = module.exports.feedback$ = new Subject();

app.use(bodyParser.json());

app.get('/say', (req, res) => {
  if (!req.query.text) {
    res.status(400).end();
    return;
  }
  say$.onNext(req.query.text);
  res.status(200).end();
});

app.post('/feedback', (req, res) => {
  feedback$.onNext(res.body);
  res.status(200).end();
});

app.listen(config.http.port);

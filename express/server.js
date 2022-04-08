'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});


router.get('/validate', (req, res) => {
  
router.post("/validate", (req, res) => {
 

  let body = req.body;
  let domainName = body.domain_name;
  let url = body.url;
  let isCached = body.isCached;
  let cacheStatus = body.cacheStatus;

  let status;

  if (domainName == "google.com") {
    status = {
      threatLevel: "trusted",
      threatScore: 0,
      threatMessage: null,
      isWhitelisted: false,
      isOtherWhitelisted: true,
      isBlacklisted: false,
      isOtherBlacklisted: false,
      parentDomain: "google.com",
      siteDescription: "Google Search Engine",
      Labels: {
        "Search Engine": "#56000",
        "Trusted Site": "GREEN",
      },
      customButtons: {},
    };
  } else if (domainName == "yahoo.com") {
    status = {
      threatLevel: "blacklisted",
      threatScore: 0,
      threatMessage: "Phishing Site",
      isWhitelisted: false,
      isOtherWhitelisted: true,
      isBlacklisted: true,
      isOtherBlacklisted: false,
      parentDomain: "phish.com",
      siteDescription: null,
      Labels: {
        Phishing: "RED",
        "Some other labels": "RED",
      },
      customButtons: {
        "Button One": {
          img: "...",
          text: "Open Report",
          color: "...",
          hoverColor: "...",
          link: "https://report.com/?=phish.com",
        },
      },
    };
  } else {
    status = {
      threatLevel: "neutral",
      threatScore: 0,
      threatMessage: null,
      isWhitelisted: false,
      isOtherWhitelisted: false,
      isBlacklisted: false,
      isOtherBlacklisted: false,
      parentDomain: "xyz.com",
      siteDescription: null,
      Labels: {},
      customButtons: {},
    };
  }
  
  res.json(status)
  
});
  
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);

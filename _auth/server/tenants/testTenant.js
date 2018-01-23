
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import session from 'express-session';
import fs from 'fs';
import path from 'path';
import uuid from 'uuid';
import fetch from 'cross-fetch';
import jsonwebtoken from 'jsonwebtoken';

import '../../config';
import '../../globals';

const rawIndexHTML = fs.readFileSync(path.join(__dirname, './testTenant.html'), 'utf-8');

const app = express();

// serve the app
global.report();

// express middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

if (serverConfig.log) {
  app.use(morgan(serverConfig.log));
}

const sessionConfig = {
  secret: 'random',
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true },
};

app.use(session(sessionConfig));

// routes
app.get('/', (req, res) => {
  req.session.state = uuid.v4();
  res.send(rawIndexHTML
    .replace('__HOST__', serverConfig.domain)
    .replace('__HOST__', serverConfig.domain)
    .replace('__STATE_CODE__', req.session.state)
    .replace('__STATE_CODE__', req.session.state)
    .replace('__AUTHORIZATION_CODE__', '')
    .replace('__FILES__', '')
    .replace('__AUTHORIZED_USER__', ''));
});

app.get('/oauth/callback', async (req, res) => {
  const state = req.query.state;
  const tokenStruct = await fetch(`http://${serverConfig.domain}/user/token_by_code`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      code: req.query.code,
      token: jsonwebtoken.sign(req.query.code, 'oauth_test_tenant1_key'),
    }),
  }).then(ret => ret.json());
  res.send(rawIndexHTML
    .replace('__HOST__', serverConfig.domain)
    .replace('__HOST__', serverConfig.domain)
    .replace('__STATE_CODE__', state)
    .replace('__STATE_CODE__', state)
    .replace('__AUTHORIZATION_CODE__', req.query.code)
    .replace('__AUTHORIZED_USER__', JSON.stringify({
      ...tokenStruct,
      tokenDecoded: jsonwebtoken.decode(tokenStruct.token),
    }, null, 2)));
});

// run server
const server = app.listen(28000, (err) => {
  if (err) {
    printError(err, __filename);
  } else {
    printMessage(`${serverConfig.title} is listening on port ${28000}`, __filename);
  }
});

export default server;

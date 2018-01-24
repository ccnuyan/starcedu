import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import delay from 'express-delay';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import chalk from 'chalk';

import serverConfig from '../serverConfig';
import crossDomain from '../utils/middlewares/crossDomain';
import ajaxDetector from '../utils/middlewares/ajaxDetector';
import routes from './src';


import '../serverConfig/tenants';

console.log('ready to run');

const app = express();

// serve the app
const PORT = process.env.PORT || serverConfig.disk_port;

// express middleware
app.use(compression());

app.use('/static/', express.static(path.join(__dirname, '../build/')));
app.use('/static/', express.static(path.join(__dirname, '../public/')));

if (serverConfig.log) {
  app.use(morgan(serverConfig.log));
}
if (serverConfig.maxDelay) {
  app.use(delay(0, serverConfig.maxDelay));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(ajaxDetector);
app.use(crossDomain);

app.use(cookieParser());

// routes
routes.api(app);
routes.web(app);

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log(chalk.red(err)); // eslint-disable-line
  } else {
    console.log(chalk.blue(`${serverConfig.title} is listening on port ${PORT}`)); // eslint-disable-line
  }
});

export default server;

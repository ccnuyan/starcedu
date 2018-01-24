import connectRedis from 'connect-redis';
import session from 'express-session';
import chalk from 'chalk';
import serverConfig from '../../../serverConfig';

const RedisStore = connectRedis(session);

const ssConfig = {
  secret: serverConfig.session.secret,
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true },
};

if (serverConfig.mode !== 'test') {
  ssConfig.store = new RedisStore(serverConfig.redisSessionServer);
  console.log(chalk.green(`SESSION --> ${serverConfig.redisSessionServer.host}:${serverConfig.redisSessionServer.port}`)); // eslint-disable-line
} else {
  console.log(chalk.green('SESSION --> server memory')); // eslint-disable-line
}

const sessionMiddleware = session(ssConfig);

export default sessionMiddleware;

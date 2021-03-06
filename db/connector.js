import postgres from 'pg';
import chalk from 'chalk';
import serverConfig from '../serverConfig';

export const pg = new postgres.Pool(serverConfig.pg);

console.log(chalk.yellow(`postgres -> ${serverConfig.pg.host}:${serverConfig.pg.port}/${serverConfig.pg.database}`)); // eslint-disable-line

export default {
  query: async (text, params) => {
    return pg.query(text, params);
  },
  end: async () => {
    return pg.end();
  },
};

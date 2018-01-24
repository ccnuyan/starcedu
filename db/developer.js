import fs from 'fs';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk';
import _ from 'lodash';

import serverConfig from '../serverConfig';
import { pg } from './connector';
import packageConfig from './../package.json';

const versionRoot = packageConfig.version.replace(/\./g, '-');


const installSqls = async (sqls) => {
  for (const sqlObject of sqls) { // eslint-disable-line
    await pg.query(sqlObject.sql).then(() => { // eslint-disable-line
      console.log(`sql installed: ${path.relative(__dirname, sqlObject.file)}`); // eslint-disable-line
      return true;
    })
      .catch((err) => {
        console.log(err); // eslint-disable-line
        process.exit(1);
      });
  }
};

const install = app => async (dir) => {
  const sourceDir = path.join(__dirname, `../_${app}/database/sql/`, versionRoot);

  const globPattern = path.join(sourceDir, `${dir || '**'}/*.sql`);
  // use nosort to ensure that init.sql is loaded first
  // https://github.com/isaacs/node-glob
  const files = glob.sync(globPattern);

  const sqls = [];

  files.forEach((file) => {
    const sql = fs.readFileSync(file, { encoding: 'utf-8' }).replace(new RegExp(`#${app.toUpperCase()}_SCHEMA#`, 'g'), serverConfig.auth_dbname);
    if (!_.endsWith(path.parse(file).name, '.prod')) {
      sqls.push({ file, sql });
    }
  });
  await installSqls(sqls);
  console.log(chalk.green('all sql installed')); // eslint-disable-line
  process.exit(0);
};

export default (app) => {
  return { install: install(app) };
};


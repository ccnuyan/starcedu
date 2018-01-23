import fs from 'fs';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk';

import { pg } from './connector';

import packageConfig from '../package.json';

const versionRoot = packageConfig.version.replace(/\./g, '-');

const loadFiles = app => (dir) => {
  const sourceDir = path.join(__dirname, `../_${app}/database/sql/`, versionRoot);
  const globPattern = path.join(path.join(sourceDir, dir || ''), '**/*.sql');

  // use nosort to ensure that init.sql is loaded first
  const files = glob.sync(globPattern, {
    nosort: true,
  });
  // set search_path at first
  const result = [`set search_path = ${serverConfig.auth_dbname};`];
  files.forEach((file) => {
    if (!_.endsWith(path.parse(file).name, '.dev')) {
      const sql = fs.readFileSync(file, {
        encoding: 'utf-8',
      });
      result.push(sql);
    }
  });
  result.push('select \'schema initialized\' as result;');
  return result.join('\r\n');
};


const decideSqlFile = app => (dir) => {
  const buildDir = path.join(__dirname, `../_${app}/database/build`);
  const fileName = dir ? `${dir}-${versionRoot}.sql` : `${versionRoot}.sql`;
  console.log(chalk.red(`sql: ${path.join(buildDir, fileName)}`)); // eslint-disable-line
  return path.join(buildDir, fileName);
};

const readSql = app => (dir) => {
  const sqlBits = loadFiles(app)(dir).replace(new RegExp(`#${app.toUpperCase()}_SCHEMA#`, 'g'), serverConfig.auth_dbname);
  // write it to file
  const sqlFile = decideSqlFile(app)(dir);
  fs.writeFileSync(sqlFile, sqlBits);
  return sqlBits;
};

const install = app => (dir) => {
  const sqlFile = decideSqlFile(app)(dir);
  const sql = fs.readFileSync(sqlFile, {
    encoding: 'utf-8',
  });
  return pg.query(sql).then((res) => {
    console.log(res.rows[0].result); // eslint-disable-line
    return process.exit(0);
  }).catch((err) => {
    console.log(err); // eslint-disable-line
    return process.exit(1);
  });
};

export default (app) => {
  return {
    readSql: readSql(app),
    install: install(app),
  };
};


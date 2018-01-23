import program from 'commander';

import '../serverConfig';

import builder from './builder';
import developer from './developer';
/* eslint-disable no-console */

global.report();

program
  .command('dev <app>')
  .description('Build the sql file for our project')
  .action((app) => {
    console.log('installing now...');
    developer(app).install(program.folder);
  });

program
  .command('build <app>')
  .description('Build the sql file for our project')
  .action((app) => {
    console.log('building now...');
    builder(app).readSql(program.folder);
    console.log('sql script file created');
  });

program
  .command('install')
  .description('Install the SQL file for our project')
  .action(async (app) => {
    console.log('installing');
    await builder(app).install(program.folder);
    console.log('done');
  });


/* eslint-disable no-console */
program.option('-f, --folder <folder>').parse(process.argv);

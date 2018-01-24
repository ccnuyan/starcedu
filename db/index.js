import program from 'commander';
import chalk from 'chalk';


import builder from './builder';
import developer from './developer';
/* eslint-disable no-console */


program
  .command('dev <app>')
  .description('Build the sql file for our project')
  .action((app) => {
    console.log(chalk.green('installing now...'));
    developer(app).install(program.folder);
  });

program
  .command('build <app>')
  .description('Build the sql file for our project')
  .action((app) => {
    console.log(chalk.green('building now...'));
    builder(app).readSql(program.folder);
    console.log(chalk.green('sql script file created'));
  });

program
  .command('install')
  .description('Install the SQL file for our project')
  .action(async (app) => {
    console.log(chalk.green('installing'));
    await builder(app).install(program.folder);
    console.log(chalk.green('done'));
  });


/* eslint-disable no-console */
program.option('-f, --folder <folder>').parse(process.argv);

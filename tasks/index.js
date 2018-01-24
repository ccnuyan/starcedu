import program from 'commander';
import webpack from 'webpack';
import chalk from 'chalk';
import '../serverConfig';

import config from '../webpack.app.config';

/* eslint-disable no-console */

program.command('build <app>')
  .description('Build the app')
  .action((app) => {
    webpack(config(app), (err) => {
      if (err) {
        throw (err);
      } else {
        console.log(chalk.green(`app ${chalk.red(app)} built successfully`));
      }
    });
  });


/* eslint-disable no-console */
program.option('-f, --folder <folder>').parse(process.argv);

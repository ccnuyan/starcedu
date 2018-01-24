import program from 'commander';
import webpack from 'webpack';
import chalk from 'chalk';
import '../serverConfig';

import appConfig from '../webpack.app.config';
import buildConfig from '../webpack.build.config';

/* eslint-disable no-console */

program.command('build <app>')
  .description('Build the app')
  .action((app) => {
    webpack(buildConfig(app), (err1, stats1) => {
      if (err1) {
        throw (err1);
      } else {
        console.log(stats1.hash);
        webpack(appConfig(app), (err2, stats2) => {
          if (err2) {
            throw (err2);
          } else {
            console.log(stats2.hash);
            console.log(chalk.green(`app ${chalk.red(app)} built successfully`));
          }
        });
      }
    });
  });

/* eslint-disable no-console */
program.option('-f, --folder <folder>').parse(process.argv);

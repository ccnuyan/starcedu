import program from 'commander';
import webpack from 'webpack';
import '../serverConfig';

import config from '../webpack.app.config';

/* eslint-disable no-console */


program
  .command('build <app>')
  .description('Build the app')
  .action((app) => {
    webpack(config(app), (err, stats) => {
      if (err) {
        throw (err);
      } else {
        console.log(stats);
      }
    });
  });

/* eslint-disable no-console */
program.option('-f, --folder <folder>').parse(process.argv);

import chalk from 'chalk';
import lodash from 'lodash';
import development from './config.development';
import production from './config.production';
import test from './config.test';
import auth from './_auth.config';
import disk from './_disk.config';

global._ = lodash;

let configVar = {};
if (process.env.NODE_ENV === 'production') {
  configVar = production;
} else if (process.env.NODE_ENV === 'test') {
  configVar = test;
} else {
  configVar = development;
}
const config = configVar;

const appsConfigs = {
  auth,
  disk,
};

const commonKeys = Object.keys(config);

Object.keys(appsConfigs).forEach((app) => {
  commonKeys.forEach((k) => {
    config[`${app}_${k}`] = config[k];
  });
});

Object.keys(appsConfigs).forEach((app) => {
  Object.keys(appsConfigs[app][config.mode]).forEach((k) => {
    const appConfig = appsConfigs[app][config.mode][k];
    if (typeof appConfig === 'string') {
      config[`${app}_${k}`] = appConfig;
    } else if (typeof config[k] === 'number') {
      config[`${app}_${k}`] = appConfig;
    } else if (typeof appConfig === 'object') {
      if (typeof config[`${app}_${k}`] === 'object') {
        config[`${app}_${k}`] = _.merge(config[`${app}_${k}`], appConfig);
      } else {
        config[`${app}_${k}`] = appConfig;
      }
    }
  });
});

let chalkcontent = chalk.grey('running in ');
chalkcontent += config.mode === 'production' ? chalk.red(config.mode) : chalk.blue(config.mode);
chalkcontent += chalk.grey(' mode');

console.log(chalkcontent); // eslint-disable-line

export default config;

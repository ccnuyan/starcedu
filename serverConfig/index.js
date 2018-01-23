import lodash from 'lodash';
import development from './config.development';
import production from './config.production';
import test from './config.test';
import auth from './_auth.config';
import disk from './_disk.config';
import './globals';

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

Object.keys(appsConfigs).forEach((app) => {
  Object.keys(appsConfigs[app][config.mode]).forEach((k) => {
    const appConfig = appsConfigs[app][config.mode];
    if (config[k] === undefined || config[k] === null) {
      config[`${app}_${k}`] = appConfig[k];
    }
    if ((typeof config[k]) === 'string') {
      config[`${app}_${k}`] = appConfig[k];
    }
    if ((typeof config[k]) === 'object' && (typeof appConfig[k]) === 'object') {
      config[`${app}_${k}`] = _.merge(config[k], appConfig[k]);
    }
  });
});

global.serverConfig = config;

export default config;

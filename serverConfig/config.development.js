import common from './common';

export default {
  ...common,
  mode: 'development',
  log: 'tiny',
  minDelay: 300,
  maxDelay: 1000,
  assetsPath: '../../build/assets.json',
};

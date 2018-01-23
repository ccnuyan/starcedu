// import chalk from 'chalk';

import development from './config.development';
import production from './config.production';

let configVar = {};
if (process.env.NODE_ENV === 'production') {
  configVar = production;
  configVar.env = 'production';
} else {
  configVar = development;
  configVar.env = 'development';
}
const config = configVar;
export default config;

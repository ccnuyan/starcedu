import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import packageJson from './package.json';

import serverConfig from './serverConfig';

const rules = require('./webpack/commonRules.js');

export default (app) => {
  const entry = {};
  entry[app] = ['babel-polyfill', `./_${app}/src/frontend/app.js`];

  return {
    entry,
    target: 'web',
    output: {
      filename: `[name]-${packageJson.version}.js`,
      path: path.join(__dirname, './build/assets/'),
      publicPath: serverConfig[`${app}_publicPath`],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new AssetsPlugin({
        path: path.resolve(__dirname, './build'),
        filename: 'assets.json',
        prettyPrint: true,
      }),
      new ExtractTextPlugin({
        filename: `[name]-${packageJson.version}.css`,
      }),
      new UglifyJSPlugin({
        // beautify: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor', // Specify the common bundle's name.
        minChunks: module => /node_modules/.test(module.resource),
      }),
    ],
    module: {
      rules,
    },
    externals: {
      // when setting react as a external lib, webpack won't build react into the bundle.
      // but as InjectTapEventPlugin require some react sub files, webpack don't know these files are external.
      // As a result it build these files into the bundle.
      // so when InjectTapEventPlugin run and register tap event to react.
      // It register into a standalone react env and tap event can't fire
      // so always pack react with your app together, unless their is a solution of this issue.
    },
  };
};

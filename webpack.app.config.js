import path from 'path';
import webpack from 'webpack';
import serverConfig from './serverConfig';

export default (app) => {
  return {
    entry: {
      index: ['babel-polifill', path.join(__dirname, `/_${app}/src/index.js`)],
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: path.join(__dirname, './node_modules'),
        loader: 'babel-loader',
      }],
    },
    output: {
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, `/_${app}/dist`),
    },
    target: 'node',
    externals: /^[a-z\-0-9]+$/,
    plugins: [
      // Define free variables
      // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      new webpack.DefinePlugin(
        {
          'process.env.NODE_ENV': '"production"',
          'process.env.BROWSER': false,
          serverConfig,
        },
      ),

      // Do not create separate chunks of the server bundle
      // https://webpack.github.io/docs/list-of-plugins.html#limitchunkcountplugin
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],

    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },

    devtool: 'source-map',
  };
};

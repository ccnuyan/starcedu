import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (app) => {
  return {
    entry: {
      index: ['babel-polyfill', path.join(__dirname, `/_${app}/index.js`)],
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: path.join(__dirname, './node_modules'),
        loader: 'babel-loader',
      }],
    },
    output: {
      filename: 'index.js',
      libraryTarget: 'commonjs',
      path: path.join(__dirname, '/server'),
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
        },
      ),
      new CopyWebpackPlugin([
        { from: './serverConfig/tenants/tenants.json', to: './tenants.json' },
        { from: './utils/indexFabricator/index.html', to: './index.html' },
      ]),

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
  };
};


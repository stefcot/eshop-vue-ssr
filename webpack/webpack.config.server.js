const merge = require('webpack-merge');
const defaultConfig = require('./webpack.config.default');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const path = require('path');

module.exports = merge(defaultConfig, {
  entry: path.resolve(__dirname, '../src/entry-server'),
  // Here, we change multiple options, such as the target and output.libraryTarget ones,
  // to adapt to the node.js environment.
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  // Skip webpack processing on node_modules
  // Using the webpack-node-externals package, we tell webpack to ignore the modules
  // located in the node_modules folder (which means the dependencies). Since we are in
  // nodejs and not in a browser, we don't have to bundle all the dependencies into the bundle,
  // so this will improve the build times.
  externals: nodeExternals({
    // Force CSS files imported from node_modules
    // tobe processed by webpack
    whitelist: /\.css$/
  }),
  // Finally, we use VueSSRServerPlugin to generate the server bundle file that will be used
  // by the renderer. It contains the compiled server-side code and a lot of other informations so
  // that the renderer can support source maps (with the source-map value of devtool), hotreloading,
  // critical CSS injection, and other injections in conjunction with the client manifest data.
  plugins: [new VueSSRServerPlugin()]
});

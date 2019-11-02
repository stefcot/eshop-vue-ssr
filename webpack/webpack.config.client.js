const merge = require('webpack-merge');
const defaultConfig = require('./webpack.config.default');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(defaultConfig, {
  entry: './src/entry-client',
  optimization: {
    splitChunks: {
      minChunks: Infinity,
      name: 'manifest'
    }
  },
  // The VueSSRClientPlugin will generate a vue-ssr-client-manifest.json file that we
  // will give to the renderer. This way, it will know more about the client. Also, it will
  // automatically inject the script tags and the critical CSS to the HTML.
  plugins: [new VueSSRClientPlugin()]
});

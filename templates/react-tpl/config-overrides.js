const { override, addBabelPlugin, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addBabelPlugin('jsx-control-statements'),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  })
);

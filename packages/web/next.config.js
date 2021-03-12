const withImages = require("next-images");
const withPlugins = require('next-compose-plugins');

const withTM = require('next-transpile-modules')([
  '@parkyourself-frontend/shared',
]);

module.exports = withPlugins([
  withTM, withImages
]);
/* config-overrides.js */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.plugins = [
    ...config.plugins,
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 4096 * 2,
      },
    }),
  ];
  return config;
};

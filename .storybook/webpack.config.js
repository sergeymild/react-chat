const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.scss$/,
    loaders: 'style-loader!css-loader?modules=true!sass-loader',
    include: path.resolve(__dirname, '../')
  });
  defaultConfig.resolve.extensions.push('.scss');
  return defaultConfig;
};

const path = require('path');
const _ = require('lodash');

module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.alias['@components'] = path.resolve(__dirname + '/components');
    config.resolve.alias['@pages'] = path.resolve(__dirname + '/pages');
    config.resolve.alias['@public'] = path.resolve(__dirname + '/public');
    config.resolve.alias['@styles'] = path.resolve(__dirname + '/styles');

    // camel-case style names from css modules
    // inspired by https://github.com/vercel/next.js/discussions/11267
    const cssRules = _.find(config.module.rules, (rule) => !!rule.oneOf).oneOf;
    const cssLoaderRules = _.filter(cssRules, (rule) => _.includes(JSON.stringify(rule.use), 'css-loader'));
    const loaders = _.filter(_.flatMap(cssLoaderRules, 'use'), (loader) => !!loader.options.modules);
    for (const loader of loaders) {
      loader.options.modules.exportLocalsConvention = 'camelCase';
    }

    return config;
  }
};


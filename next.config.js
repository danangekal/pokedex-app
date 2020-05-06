const webpack = require('webpack')
const { parsed: localEnv } = require('dotenv').config()

const nextConfig = {
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    return config
  }
};

module.exports = nextConfig;

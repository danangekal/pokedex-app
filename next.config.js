const webpack = require('webpack')
const { parsed: localEnv } = require('dotenv').config()
const withCSS = require('@zeit/next-css')

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd-mobile\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]
      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    }
    return config
  },
};

module.exports = withCSS(nextConfig);

const webpack = require('webpack')
const { parsed: localEnv } = require('dotenv').config()
const withPlugins = require('next-compose-plugins')
const css = require('@zeit/next-css')
const images = require('next-images')
const optimizedImages = require('next-optimized-images')
const offline = require('next-offline')

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd-mobile\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
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
    }
    return config
  }
}

module.exports = withPlugins([
  [css, {
    exclude: [/node_modules/]
  }], 
  [images], 
  [optimizedImages], 
  [offline, {
    target: 'serverless',
    transformManifest: manifest => ['/'].concat(manifest), 
    workboxOpts: {
      // generateInDevMode: true,
      swDest: 'static/service-worker.js',
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'https-calls',
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        }
      ]
    } 
  }]
], nextConfig)
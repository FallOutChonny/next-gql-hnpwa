// const path = require('path')
// const withOffline = require('next-offline')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// const resolveApp = relativePath => path.resolve(__dirname, relativePath)

const compose = (...funcs) => funcs.reduce((a, b) => (...args) => a(b(...args)))

module.exports = compose(
  withBundleAnalyzer,
  // withOffline,
)({
  // workboxOpts: {
  //   swDest: 'static/service-worker.js',
  // },
  // experimental: {
  //   reactMode: 'concurrent',
  // },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // Note: we provide webpack above so you should not `require` it
  //   // Perform customizations to webpack config
  //   // Important: return the modified config

  //   return {
  //     ...config,
  //     resolve: {
  //       ...config.resolve,
  //       alias: {
  //         ...config.resolve.alias,
  //         components: resolveApp('src/components'),
  //         // graphql: resolveApp('src/graphql'),
  //         pages: resolveApp('src/pages'),
  //         utils: resolveApp('src/utils'),
  //         constants: resolveApp('src/constants'),
  //       },
  //     },
  //   }
  // },
})

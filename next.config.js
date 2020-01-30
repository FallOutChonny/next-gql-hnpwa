const path = require('path')

const resolveApp = relativePath => path.resolve(__dirname, relativePath)

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          components: resolveApp('src/components'),
          pages: resolveApp('src/pages'),
          utils: resolveApp('src/utils'),
          constants: resolveApp('src/constants'),
        },
      },
    }
  },
}

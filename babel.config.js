module.exports = function(api) {
  const presets = []
  const plugins = []
  api.cache.using(() => process.env.NODE_ENV)
  console.info('aqui')

  if (api.env('dev')) {
    presets.push('@babel/preset-env')
  }

  if (process.env.ENV === 'prod') {
    presets.push([
      '@babel/preset-env',
      {
        modules: false,
      },
    ])

    plugins.push('@babel/plugin-external-helpers')
    plugins.push([
      '@babel/plugin-transform-runtime',
      {
        polyfill: false,
        regenerator: true,
      },
    ])
  }

  console.info(presets, plugins)

  return {
    presets,
    plugins,
  }
}

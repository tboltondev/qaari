module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    // plugins: ['@babel/plugin-transform-class-properties'], // TODO: why doesn't this work on web
  }
}

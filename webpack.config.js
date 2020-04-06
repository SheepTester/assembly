const production = process.env.NODE_ENV === 'production'

module.exports = {
  mode: production ? 'production' : 'development',
  entry: './src/index.js',
  devtool: production ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: '.'
  },
  output: {
    filename: 'bundle.min.js',
    path: __dirname
  }
}

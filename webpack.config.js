const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  mode: production ? 'production' : 'development',
  entry: './src/index.mjs',
  devtool: production ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: '.'
  },
  optimization: {
    minimize: production,
    minimizer: [
      new TerserPlugin({
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.min.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: !production
            }
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              esModule: true
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.min.js',
    path: __dirname
  }
}

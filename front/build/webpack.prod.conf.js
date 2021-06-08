const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const path = require("path");

module.exports = {
  mode: "production",
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].min.css",
      allChunks: false // 只包括初始化css, 不包括异步加载的CSS
    }),
    new MiniCssExtractPlugin({
      filename:  '[name].[hash].css' ,
      chunkFilename: '[id].[hash].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../"),
      verbose: true
    })
  ]
};

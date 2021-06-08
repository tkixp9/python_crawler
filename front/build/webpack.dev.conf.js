const webpack = require("webpack");

const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "../dist/"),
    host: 'localhost',
    port: 8000,
    hot: true,
    overlay: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};

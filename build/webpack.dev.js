const commonConfig = require("./webpack.common.js");
const webpackMerge = require("webpack-merge");
const webpack = require("webpack")
const path = require("path")
module.exports = webpackMerge(commonConfig, {
  mode: "development",
  // target: "web",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "js/[name].js"
  },
  devServer: {
    // inline:true,
    open: true,
    historyApiFallback: true,
    hot: true,
    port: 8000,
    stats: 'minimal',
    compress: true,
    openPage: "html/index.html",
    contentBase: path.resolve(__dirname, "../dist"),
    proxy: {
      '/api/*': {
        target: 'http://cloud.xiongmaozhanggui.com/',
        pathRewrite: {
          '/api': ''
        },
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})

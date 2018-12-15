const commonConfig = require("./webpack.common.js");
const webpackMerge = require("webpack-merge");
const webpack = require("webpack")
const path = require("path")
module.exports = webpackMerge(commonConfig, {
    mode: "development",
    output: {
        path:  path.resolve(__dirname, "../dist"),
        publicPath: "/",
        filename: "js/[name].js",
    },
    devServer: {
        // inline:true,
        open: true,
        historyApiFallback: true,
        hot: true,
        port: 8000,
        stats: 'minimal',
        compress: true,
        contentBase: path.resolve(__dirname, "../dist"),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
})

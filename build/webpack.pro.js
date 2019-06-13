const commonConfig = require("./webpack.common.js");
const webpackMerge = require("webpack-merge");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require("path")
module.exports = webpackMerge(commonConfig, {
    mode: "production",
    output: {
        path:  path.resolve(__dirname, "../dist"),
        publicPath: "./",
        filename: "js/[name].[chunkhash].js",
        chunkFilename: "js/[name].[chunkhash].js"
    },
    plugins: [
        new cleanWebpackPlugin(["./dist/"], {
            root: path.resolve(__dirname, "../")
        }),
        new MiniCssExtractPlugin({
            filename: "style/[name].[chunkhash].css"
        }),
    ],
})


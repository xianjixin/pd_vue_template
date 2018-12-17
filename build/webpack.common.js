const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const {
  getFileNameByPath
} = require("./webpack.utils");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');

let entrys = {};
let htmlViews = [];
/**
 *
 * @type 入口文件处理
 */
//entrys[ 'babel-polyfill' ] = 'babel-polyfill';
//获取入口文件
const entryFilePath = path.resolve(__dirname, "../src/entry");
const entryFileNames = getFileNameByPath(entryFilePath);

for (let i = 0; i < entryFileNames.length; i++) {
  /**
   *
   * main-html生成
   */
  htmlViews.push(new htmlWebpackPlugin({
    template: path.resolve(__dirname, `../src/html/${ entryFileNames[ i ] }.html`),
    minify: {
      removeAttributeQuotes: true,
      removeComments: true,
      removeTagWhitespace: true
    },
    chunks: [`${ entryFileNames[ i ] }`],
    filename: `./html/${ entryFileNames[ i ] }.html`,
    /**
     * 生成的页面加入第三方依赖库
     */
    chunksSortMode: 'dependency'
  }));
  /**
   * 入口js配置
   */
  entrys[entryFileNames[i]] = path.resolve(entryFilePath, entryFileNames[i] + ".js");
}
module.exports = {
  entry: entrys,
  resolve: {
    extensions: [".scss", ".js", ".vue"],
    alias: {
      //npm中安装vue默认为运行时构建，故不能使用template模板，此配置修改运行时构建。
      // "vue$": "vue/dist/vue.js",
      '@': path.resolve(__dirname, "../src"),
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) && !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter') // 默认的错误提示方式
          }
        },
      },
      {
        test: /\.scss$|.css$/,
        use: [
          process.env.NODE_ENV !== 'production' ?
          'vue-style-loader' :
          MiniCssExtractPlugin.loader,
          'css-loader',
          "postcss-loader",
          'sass-loader',
          // 'vue-style-loader',
          // 'css-loader',
          // "postcss-loader",
          // 'sass-loader',
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "fonts/[name].[hash:8].[ext]"
          }
        }]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10240,
            name: 'images/[name].[hash:8].[ext]',
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),

  ].concat(htmlViews)
};

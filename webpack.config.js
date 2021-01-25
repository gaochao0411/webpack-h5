const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');

const IS_DEV = process.env.NODE_ENV === 'dev';

const resolve = function (...args) {
  return path.join(__dirname, './', ...args);
};

const files = require('./config/pages');
let entry = {};
files.forEach((item) => {
  entry[item.name] = item.path;
});

const config = {
  entry, // 多入口文件
  output: {
    filename: 'js/[name].[hash].js', // js编译时间戳，解决缓存问题
    path: path.resolve(__dirname, 'dist'), //输出路径
  },
  resolve: {
    alias: {
      '@layout': resolve('src/layout/index.js'),
      '@utils': resolve('src/utils'),
      '@css': resolve('src/asset/scss'),
    },
    extensions: ['.js', '.json']
  },
  module: { //模板
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
            attr: ['img:src','img:data-src','audio:src']
        }
      },
      {
        test: /\.js$/, // 文件匹配规则
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.ejs$/,
        use: [{
          loader: "ejs-webpack-loader",
          options: {
            htmlmin: true
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {  // html的图片引入要另外解决
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'url-loader',
        query: {
          limit: 1,
          publicPath: '',
          name: `images/[name].[hash:8]`
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 清除文件
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new MiniCssExtractPlugin({ // css处理
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].css',
    }),
  
    new webpack.HashedModuleIdsPlugin(), // 解决 hash 频繁变动的问题 ,半覆盖式发布
    new CssUrlRelativePlugin(),
  ],
  devServer: {
    port: 8081,
    hot: true, // 热更新
    contentBase: path.resolve(__dirname, 'dist'), // 启动目录，默认index.html
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
    minimizer: [],
  },
}
if (!IS_DEV) {
  const TerserPlugin = require('terser-webpack-plugin'); // 压缩js
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css

  config.optimization.minimizer.push(
    new TerserPlugin(),
    new OptimizeCSSAssetsPlugin({})
  );
}

files.forEach(file => {
  config.plugins.push(
    new HtmlWebPackPlugin({
      filename: file.filename,
      template: file.template,
      favicon: path.resolve(__dirname, './favicon.ico'),
      chunks: ['manifest', 'vendor', 'app', 'common', file.name],
      hash: false,
      inject: 'body',
      xhtml: false,
      minify: !IS_DEV,
    })
  );
});

module.exports = config;

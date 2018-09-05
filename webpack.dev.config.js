const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production';
// // 分离css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require('cssnano');
// 引入favicon
const FaviconWebpackPlugin = require('favicons-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    // app入口文件
    main: ['babel-polyfill', 'webpack/hot/dev-server', './src/index'],

  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].bundle.js',
    // 公共路径, 根目录
    publicPath: '/'
  },
  // 绝对路径, 用于解析入口文件和loader的位置,而不依赖与CWD(current working directory)
  context: path.resolve(__dirname),
  // 启用source-map工具, 速度不是很快,eval的速度最快, 详情请参见: https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',
  // 需要解析的扩展名
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  module: {
    rules: [{
      use: ['babel-loader', 'ts-loader'],
      test: /\.(tsx|ts)$/,
      exclude: /node_modules/,
    }, {
      use: ['babel-loader'],
      test: /\.(jsx|js)$/,
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      // css-loader会遍历css文件，找到所有的url(...)并且处理。style-loader会把所有的样式插入到你页面的一个style tag中。
      use: [
        // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            importLoaders: 1,
          },
        },
        'sass-loader',
      ]
    }, {
      test: /\.(jpg|jpeg|gif|png)$/,
      use: {
        loader: 'file-loader'
      }
    }, {
      test: /\.css$/,
      // css-loader会遍历css文件，找到所有的url(...)并且处理。style-loader会把所有的样式插入到你页面的一个style tag中。
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        },
      }]
    }]
  },
  plugins: [
    //
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html'
    }),
    // // 开启全局HMR
    new webpack.HotModuleReplacementPlugin(),
    // // console输出更友好的模块名称,可以知道热重载时是哪个模块作出了变动
    // new webpack.NamedModulesPlugin(),
    new FaviconWebpackPlugin({
      logo: './favicon.png',
      background: '#fff',
      icons: {
        // condig no-need format
        android: false,
        appleStartup: false,
        appleIcon: false,
      }
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        safe: false,
      },
      canPrint: false,
    })
  ],
  node: {
    fs: "empty",
    tls: "empty"
  },
  devServer: {
    hot: true,
    // 开启HMR不刷新页面以避免有任何构建失败
    hotOnly: true,
    // 如果设置为true, webpack bundle的信息就不会显示了
    noInfo: false,
    // 404展示index.html页面
    historyApiFallback: true,
    // 是否gzip
    compress: true,
    port: 3001,
    open: true,
    // 为了开启pwa
    // https: true,
  }
}
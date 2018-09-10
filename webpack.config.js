const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// // 分离css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require('cssnano');
// 引入favicon
const FaviconWebpackPlugin = require('favicons-webpack-plugin');
const bundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

console.log(process.env.NODE_ARUG);

module.exports = {
  mode: 'production',
  entry: {
    // app入口文件
    main: ['@babel/polyfill', './src/index'],
  },
  output: {
    path: path.join(__dirname, process.env.NODE_ARUG === 'deploy' ? 'deploy/node-js-getting-started/public' : 'build'),
    filename: '[name].[chunkhash].bundle.js',
    // 公共路径, 根目录
    publicPath: './',
  },
  // 绝对路径, 用于解析入口文件和loader的位置,而不依赖与CWD(current working directory)
  context: path.resolve(__dirname),
  // 需要解析的扩展名
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  devtool: "source-map", 
  module: {
    rules: [{
      use: ['babel-loader', 'ts-loader'],
      test: /\.(tsx|ts)$/,
      exclude: /node_modules/,
      sideEffects: false,
    },{
      use: ['babel-loader'],
      test: /\.(jsx|js)$/,
      exclude: /node_modules/,
      sideEffects: false,
    },{
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
    },{
      test: /\.(jpg|jpeg|gif|png)$/,
      use: {loader: 'file-loader'}
    },{
      test: /\.css$/,
      // css-loader会遍历css文件，找到所有的url(...)并且处理。style-loader会把所有的样式插入到你页面的一个style tag中。
      use: ['style-loader',{
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        },
      }]
    }]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/img/icons',
        to: 'icons/'
      },
      {
        from: 'manifest.json',
        to: 'manifest.json'
      }, {
        from: 'src/service-worker.js',
        to: 'sw.js'
      },{
        from: 'src/component/current_bar/click.mp3',
        to: 'click.mp3'
      },
    ]),
    // if not production env need add following one plugin
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html'
    }),
    // // 开启全局HMR
    // devMode && (new webpack.HotModuleReplacementPlugin()),
    // // console输出更友好的模块名称,可以知道热重载时是哪个模块作出了变动
    // devMode && (new webpack.NamedModulesPlugin()),
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
    }),
    // 打包模块分析
    // new bundleAnalyzer(),
    // new OfflinePlugin(),
  ],
  node: {
    fs: "empty",
    tls:"empty"
 },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          sourceMap: true,
          compress: {
            // 去掉所有的console
            drop_console: true,
            // 对多次引用但没定义为变量的变量提取
            reduce_vars: true
          },
          output: {
            // 紧凑的输出
            beautify: false,
            // 去掉所有
            comments: false,
          }
        }
      })
    ],
    splitChunks: {
      // 对所有模块进行优化, 将业务代码和库代码区分, 设置最小20kb,没有最大限制, 可异步加载, 节省单个文件阻塞时间
      chunks: 'all',
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        // 单独抽离react
        react: {
          test: /[\\/]node_modules[\\/]react.*[\\/]/,
          priority: -9,
        },
        venders: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    },
  },
}
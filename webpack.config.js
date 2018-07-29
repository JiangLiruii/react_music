const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: [
    // 开启react代码的模块热替换（HMR）, 必不可少
    'react-hot-loader/patch',
    // 指定域名与端口
    'webpack-dev-server/client?http://localhost:3000',
    // 为HMR打包好运行代码, only表示只在更新成功后进行HMR
    'webpack/hot/only-dev-server',
    // app入口文件
    './src/index'

  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    // HMR中必须的,让webpack知道在哪里载入热更新的模块(chunk)
    publicPath: '/',
  },
  // 绝对路径, 用于解析入口文件和loader的位置,而不依赖与CWD(current working directory)
  context: path.resolve(__dirname),
  // 启用source-map工具, 速度不是很快,eval的速度最快, 详情请参见: https://webpack.js.org/configuration/devtool/
  devtool: 'inline-source-map',
  // 需要解析的扩展名
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  target: 'web',
  module: {
    rules: [{
      use: ['babel-loader', 'ts-loader'],
      test: /\.(tsx|ts)$/,
      exclude: /node_modules/,
    },{
      use: ['babel-loader'],
      test: /\.(jsx|js)$/,
      exclude: /node_modules/,
    },{
      test: /\.css$/,
      // css-loader会遍历css文件，找到所有的url(...)并且处理。style-loader会把所有的样式插入到你页面的一个style tag中。
      use: ['style-loader',{
        loader: 'css-loader',
        options: {
          module: true,
        },
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html'
    }),
    // 开启全局HMR
    new webpack.HotModuleReplacementPlugin(),
    // console输出更友好的模块名称,可以知道热重载时是哪个模块作出了变动
    new webpack.NamedModulesPlugin(),
  ],
}
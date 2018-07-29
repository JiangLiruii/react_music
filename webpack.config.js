const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: {
    index: [
      'webpack/hot/dev-server',
      './src/index.tsx'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  target: 'web',
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.tsx$/,
      exclude: /node_modules/,
      options: {
        presets: ['react', 'es2015', 'stage-0']
      }
    },{
      test: /\.css$/,
      use: ['css-loader']
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
}
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
var port = process.env.PORT || 3001
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: true,
  host:'0.0.0.0',
}).listen(port, function (err, result) {
  if (err) {
    console.log(err)
  }
  console.log(`Listening at localhost:${port}`)
})
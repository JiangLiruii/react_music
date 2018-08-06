var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('../webpack.config')
var port = process.env.PORT || 3001
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: true
}).listen(port, '127.0.0.1', function (err, result) {
  if (err) {
    console.log(err)
  }
  console.log(`Listening at localhost:${port}`)
})
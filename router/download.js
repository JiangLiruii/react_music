const request = require('superagent');
module.exports = (req, res) => {
  const url = req.query.url;
  const format = url.match(/.*\.(.*)/)[1];
  const name = req.query.name;
  console.log(url, format, name);
  res.writeHead(200,{
    'Content-type': 'application/octet-stream',
    'Content-disposition': `attachment; filename=${encodeURIComponent(name)}.${format}` ,
  });
  request.get(url).pipe(res);
}
const request = require('superagent');
const fs = require('fs');
module.exports = (req, res) => {
  const url = req.query.url;
  const new_req = request.get(url).set({
    'Connection': 'keep-alive'
  })
  new_req.pipe(fs.createWriteStream('download.mp3'));
}
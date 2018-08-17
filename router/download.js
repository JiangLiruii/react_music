const request = require('superagent');

module.exports = (req, res) => {
  const url = req.query.url;
  request(url).then(
    result => {
      res.send(result);
    },
    err => console.log(err)
  );
}
const request = require('superagent');

module.exports = (req, res) => {
  const keyword = req.query.keyword;
  console.log(keyword);
  request('http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword='+ encodeURIComponent(keyword) + '&page=1&pagesize=90&showtype=2').then(
    result => {
      const info = JSON.parse(result.text).data.info;
      res.send(info);
    },
    err => console.log(err)
  );
}

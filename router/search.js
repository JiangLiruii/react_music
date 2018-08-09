const request = require('superagent');

module.exports = (req, res) => {
  const {
    name,
    page,
    pagesize
  } = req.query;
  request(`http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${encodeURIComponent(name)}&page=${page}&pagesize=${pagesize}&showtype=2`).then(
    result => {
      const info = JSON.parse(result.text).data.info;
      res.send(info);
    },
    err => console.log(err)
  );
}

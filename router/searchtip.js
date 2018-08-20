// 为了提供搜索建议

const request = require('superagent');

module.exports = (req, res) => {
  const value = req.query.value
  request(`http://searchtip.kugou.com/getSearchTip?MusicTipCount=5&MVTipCount=2&albumcount=2&keyword=${encodeURI(value)}`).then(
    result => {
      res.send(JSON.parse(result.text).data[0].RecordDatas);
    },
    err => res.send(err)
  );
}
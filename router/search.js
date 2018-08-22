const request = require('superagent');

module.exports = (req, res) => {
  const {
    name,
    page,
    pagesize
  } = req.query;
  const url = `http://songsearch.kugou.com/song_search_v2?keyword=${encodeURIComponent(name)}&page=${page}&pagesize=${pagesize}&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0`;
  request(url).then(
    result => {
      const info = JSON.parse(result.text).data.lists;
      res.send(info);
    },
    err => res.send(err)
  );
}

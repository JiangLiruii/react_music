const request = require('superagent');

module.exports = (req, res) => {
  const hash = req.query.hash;
  request('http://www.kugou.com/yy/index.php?r=play/getdata&hash='+ encodeURIComponent(hash)).then(
    result => {
      const data = JSON.parse(result.text).data;
      res.send(JSON.parse(result.text).data);
      console.log(info);
    },
    err => console.log(err)
  );
}
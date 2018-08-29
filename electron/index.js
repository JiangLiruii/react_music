const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow 
const ipcMain = electron.ipcMain //EventEmitter class 事件触发类
const url = require('url')
const path = require('path')

// 启动server
const express = require("express");
const fs = require("fs");
const server = express();
const request = require('superagent')

// 跨域设置
server.all("*", function(req, res, next) {
  if (req.path !== "/" && !req.path.includes(".")) {
    res.header("Access-Control-Allow-Credentials", true);
    // 这里获取 origin 请求头 而不是用 *
    res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
  }
  next();
});

server.use(function(req, res, next) {
  const proxy = req.query.proxy;
  if (proxy) {
    req.headers.cookie = req.headers.cookie + `__proxy__${proxy}`;
  }
  next();
});

function download(req, res){
  const url = req.query.url;
  const format = url.match(/.*\.(.*)/)[1];
  const name = req.query.name;
  res.writeHead(200,{
    'Content-type': 'application/octet-stream',
    'Content-disposition': `attachment; filename=${encodeURIComponent(name)}.${format}` ,
  });
  request.get(url).pipe(res);
}

function music(req, res) {
  const hash = req.query.hash;
  request('http://www.kugou.com/yy/index.php?r=play/getdata&hash='+ encodeURIComponent(hash)).then(
    result => {
      const data = JSON.parse(result.text).data;
      res.send(data);
    },
    err => console.log(err)
  );
}

function search(req, res) {
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

function searchtip(req, res) {
  const value = req.query.value
  request(`http://searchtip.kugou.com/getSearchTip?MusicTipCount=5&MVTipCount=2&albumcount=2&keyword=${encodeURI(value)}`).then(
    result => {
      res.send(JSON.parse(result.text).data[0].RecordDatas);
    },
    err => res.send(err)
  );
}
server.use('/api/download', download)
server.use('/api/music', music)
server.use('/api/search', search)
server.use('/api/searchtip', searchtip)


const port = process.env.PORT || 3003;

server.listen(port, () => {
  console.log(`server running @ http://localhost:${port}`);
});


let mainWindow = null // 创建全局对象,不然当js对象被垃圾回收的时候窗口会自动关闭
// 创建浏览窗口,定义高宽
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
  })

  // 加载本地文件
  if (process.env.ELECTRON_IS_DEV) {
    mainWindow.loadURL(url.format({
      pathname: path.resolve(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(process.resourcesPath, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  // 打开调试工具
  // mainWindow.webContents.openDevTools()

  // 窗口关闭时触发
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// 实现单例,防止程序多开
const iShouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {    
  // 如果为已有窗口,调用focus,如果最小化,还会恢复窗口   
  if (mainWindow) {    
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});
// 多开退出程序
if (iShouldQuit) {    
  return app.quit();
}    
    
// 加载完成之后调用事件 
app.on('ready', createWindow)


// 只对windows有效,当所有窗口关闭后退出(OS X会强制一个窗口显示)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // 针对在OS X上的dock icon 点击时创建窗口
  if (mainWindow === null) {
    createWindow()
  }
})
// 开始响应渲染
ipcMain.on('response-render', (event, arg) => {
  event.sender.sender()
})
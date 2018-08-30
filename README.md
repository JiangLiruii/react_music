# react_music
This is my first music app based on react framework

# 1.0.0

## 新增

- electron打包成pc应用 
- mac: `yarn build:mac`[点此下载](https://github.com/JiangLiruii/react_music/raw/master/LorryMusic.dmg)
- win: `yarn build:win`

## 修复:

- 如果没有更多歌曲可以获取, 歌曲列表显示"我是有底线的"

## 待优化

- 利用cordova适配移动端
- 使用PWA

# 0.7.0

## 修复

- 歌曲列表中如果获取的是空白歌曲名占用空白行

## 优化

- 修改了配色和背景的blur属性
- 播放栏位置

# 0.6.0 --> 18.08.26

## 优化

- webpack打包过程, 将react库和其他第三方库单独打包, 业务代码单独打包, 可以优化浏览器缓存和加载速度
- favicon
- 使用webpack-dev-server proxy请求api

# 0.5.0 --> 18.08.22

## 新增

- 搜索框限制输入为空
- 搜索框限制输入为颜文字
- 搜索框错误输入时, 暗红色颜色提示
- 添加搜索框输入错误抖动动画

## 修复

- awesome-font icon海外cdn连接过慢的问题, 使用单独的 icon png

# 0.4.0 --> 18.08.21

## 新增
- 当前歌曲封面图片

## 修复
- 歌词播放延时及性能损耗
- 修复收藏和搜索列表播放时的上一曲和下一曲功能
- 修复下载功能

# 0.3.0 --> 18.08.20

## 新增
- 当前歌曲歌词显示, 居中动态显示当前句.
- 歌曲下载, 但是有bug, 如果是MP3格式的会打开新界面,而不是下载,其余格式可正常下载
- 播放模式, 包括顺序播放, 单曲循环, 随机播放, 列表循环
- 当前歌曲比特率显示
- 智能搜索提示, 智能提示歌手, 歌曲, 专辑

## 修复
- 正在播放icon串列表显示, 新增根据当前nav index筛选

# 0.2.0 --> 18.08.16

## 新增
- 播放列表功能, 可将搜索的歌曲放进播放列表中, 并本地保存.
- 下拉加载更多
- 加载动画
- 当前歌曲播放完毕, 自动播放播放列表中的下一首歌曲

## 修复
- 如果没有sq或320音质的歌曲自动降级为普通音质
- 移动端播放条位置错乱问题

## 待添加
- 当前歌曲歌词 --> finished
- 当前播放粒子动态效果
- 歌曲下载 --> defer 
- 播放模式的选择 --> finished
- 当前歌曲比特率的显示 --> finished
- 搜索智能提示 --> finished
- ~~已搜索列表 --> 与智能搜索提示功能点重复, 衡量之后决定砍掉此功能~~

## 优化: 可使用酷我音乐API, 音质较高, 以下是示例:
```js
// 搜索歌曲url, type可以为songname, artist, album, rn是获取多少条
`http://search.kuwo.cn/r.s?${type}=${encodeURIComponent(input_value)}&ft=music&rformat=json&encoding=utf8&rn=5&vipver=MUSIC_8.0.3.1`
// 拿到MUSIC_ID之后便可获取歌曲网址
`http://antiserver.kuwo.cn/anti.s?response=url&rid=${music_id}&format=mp3`
```


# 0.1.0 --> 18.08.07

## 第一版终于成型, 虽然功能还比较单一, 但至少也是可用了.

![](http://p799phkik.bkt.clouddn.com/first_music_version.png)

## 首先介绍这一版的功能, 可参见截图的数字索引

### 1 搜索栏, 可输入歌曲名和歌手名进行搜索, 现在还没有对list进行分页,默认搜索结果获取90项.
### 2 歌曲列表, 展示所有搜索到的歌曲, 已完成功能包括展示歌曲名,歌手名,以及以下
- 3 显示当前正在播放的歌曲
- 4 播放按钮, 点击播放以及切换歌曲
### 未完成功能有:
- 添加到个人播放列表 
- 添加到歌单 
- 播放MV(如果有的话)
### 播放Bar组件已实现功能
- 5 上一曲
- 6 暂停/继续播放
- 7 下一曲
- 8 进度条显示以及进度调节,当前歌曲名显示
- 9 音量调节

### 待实现的功能
- 当前歌曲比特率

## 使用方式:
1 克隆本项目
2 在终端中执行 `yarn` 安装依赖\
3 执行 `yarn start:dev` 运行项目.
4 打开 `http://localhost:3001` 即可
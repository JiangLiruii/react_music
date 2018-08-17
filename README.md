# react_music
This is my first music app based on react framework

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
- 当前歌曲歌词
- 当前播放粒子动态效果
- 歌曲下载
- 播放模式的选择
- 当前歌曲比特率的显示
- 搜索智能提示
- 已搜索列表

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
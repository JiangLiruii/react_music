import axios from 'axios';

import { handleActions } from 'redux-actions';

interface songListState {
  song_list:any[],
}

const FETCH_MUSICS = 'music/FETCH_MUSICS'

const initalState = {
  song_list: [],
}


export function fetchMusicsActionCreator(query:string) {
  /**
   * 接口说明
   * type: 
   *  1 song 后接歌曲id 码率 type=song&id=28012031&br=320000
   *  2 lyric 获取歌词
   *  3 comments 获取评论
   *  4 detail 基本信息, 歌手id, 封面图
   *  5 playlist 根据歌单链接获取歌单相关信息
   *  6 search search_type:
   *    1 单曲
   *    10 专辑
   *    100 歌手
   *    1000 歌单
   *    1002 用户
   *    1004 mv
   *    1006 歌词
   *    1009 主播电台
   *    后跟s=xxx表示关键字, offset第几页 limit一页返回多少首歌曲 type=search&s=helloworld&offset=2&limit=20
   *    e.g 
   */
  const url = `https://api.imjad.cn/cloudmusic/?type=search&s=${query}&offset=2&limit=20`;
  axios.get(url)
  .then(res => {
      console.log(res)
      // console.log(res.status,JSON.parse(res.text).data.info);
      // if(res.status === 200) {
      //     fn(JSON.parse(res.text).data.info);
      // }
    })
  return {
    type: FETCH_MUSICS,
  }
}
export function reducer() {
  return handleActions({
    [FETCH_MUSICS]: (state, action) => ({
      ...state,
    })
  }, initalState)
}
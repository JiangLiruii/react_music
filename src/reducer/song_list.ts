import { handleActions } from 'redux-actions';
import { songInfo } from './song_info';

export interface songState {
  songs_list:songInfo[],
}

const FETCH_MUSICS = 'music/FETCH_MUSICS'

const initalState:songState = {
  songs_list: [],
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
   */
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >- 200 && xhr.status < 304 || xhr.status == 304) {
        const res = JSON.parse(xhr.response);
        const songs_list = res.result.songs;
        return {
          type: FETCH_MUSICS,
          songs_list,
        }
      }
    }
  }
  const url = `https://api.imjad.cn/cloudmusic/?type=search&s=${query}&offset=2&limit=20`;
  console.log(url);
  xhr.open('get', url);
  xhr.send(null);
}
export function songStateReducer() {
  return handleActions({
    [FETCH_MUSICS]: (state, action) => ({
      ...state,
      songs_list: action.payload.songs_list
    })
  }, initalState)
}
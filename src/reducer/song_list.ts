import { handleActions } from 'redux-actions';
import { SongInfo } from './song_single';
import request from 'superagent';

export interface SongsState {
  songs_list:SongInfo[];
  currentMusicState:Query;
}

const FETCH_MUSICS = 'music/FETCH_MUSICS';
const CHANGE_STATE = 'music/CHANGE_STATE';
const initalState:SongsState = {
  songs_list: [],
  currentMusicState:{name:'', page:1, pagesize:20},
};

interface Query {
  name:string;
  page?:number;
  pagesize?:number;
}

export function fetchMusicsAsyncActionCreator(query:Query) {
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
  const {name, page, pagesize} = query;
  return (dispatch) => {
    dispatch(changeCurrentMusicState(query));
    request.get(`http://localhost:3003/search?name=${name}&page=${page}&pagesize=${pagesize}`)
  .then((res) => {
    dispatch(fetchMusicSyncActionCreator(res.body));
  });
  };
}
function changeCurrentMusicState(currentMusicState:Query) {
  return {
    type: CHANGE_STATE,
    payload: {currentMusicState},
  };
}
export function fetchMusicSyncActionCreator(songs_list) {
  return {
    type: FETCH_MUSICS,
    payload: {songs_list},
  };
}

export default handleActions({
  [FETCH_MUSICS]: (state, action) => {
    return {
      ...state,
      songs_list: action.payload.songs_list,
    };
  },
  [CHANGE_STATE]: (state, action) => ({
    ...state,
    currentMusicState: action.payload.currentMusicState,
  }),
}, initalState);
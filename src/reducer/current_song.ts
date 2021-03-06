import { handleActions, Action } from 'redux-actions';
import { SongInfo } from './song_single';
import request from 'superagent';
import { store } from '../index';

export interface CurrentSong {
  play_url:string;
  img:string;
  author_name:string;
  song_name:string;
  lyrics:string;
  author_id:string;
  video_id:number;
  bitrate:number;
  timelength:number;
  hash:string;
  index:number;
  nav_index:number;
}

const initalState = {
  play_url:'',
  img:'',
  author_name:'',
  song_name:'',
  lyrics:'',
  author_id:'',
  video_id:0,
  bitrate:0,
  timelength:100,
  hash:'',
  index:-1,
  nav_index:0,
};
const PLAY_MUSIC = 'music/PLAY_MUSIC';
function promise_wrap(hash) {
  return new Promise((resolve, reject) => {
    request.get('https://lorry-music-api.leanapp.cn/api/music')
    .query({
      hash,
    })
    .then((res) => {
      const data = res.body;
      if (data.play_url) {
        resolve(data);
      } else {
        reject('no_url');
      }
    });
  });
}
export function playAsyncMusic(data:SongInfo, index=-1, nav_index=0) {
  const is_quality = store.getState().is_quality.quality;
  const hqhash = data.HQFileHash;
  const hash = is_quality ? hqhash : data.FileHash;
  console.log(hash);
  return (dispatch) => {
    // index = -1 则为download, 否则为播放.
    const success = index === -1 ? (res) => {
      if (!res) {
        return;
      }
      const song_name = res.song_name;
      const a = document.createElement('a');
      a.href = `https://lorry-music-api.leanapp.cn/api/download?url=${res.play_url}&&name=${encodeURIComponent(song_name)}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } : (res) => {
      if (!res) {
        return;
      }
      dispatch(playMusic({
        ...res,
        index,
        nav_index,
      }));
    };
    promise_wrap(hash)
    .then(success, () => {
      dispatch({type: 'music/SWITCH_QUALITY', quality: false});
      promise_wrap(data.FileHash).then(success, (e) => console.log(e));
    });
  };
}

export function playMusic(data) {
  return {
    type: PLAY_MUSIC,
    payload: data,
  };
}
export default handleActions({
  [PLAY_MUSIC]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
}, initalState);
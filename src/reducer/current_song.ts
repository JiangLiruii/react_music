import { handleActions } from 'redux-actions';
import { SongInfo } from './song_single';
import request from 'superagent';

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
  index:0,
};
const PLAY_MUSIC = 'music/PLAY_MUSIC';
function promise_wrap(hash) {
  return new Promise((resolve, reject) => {
    request.get(`http://localhost:3003/music?hash=${hash}`)
    .then((res) => {
      const data = res.body;
      if (data.play_url) {
        resolve(data);
      }
    });
  });
}
export function playAsyncMusic(data:SongInfo, index) {
  const sqhash = data.sqhash;
  const hash320 = data['320hash'];
  const hash = data.hash;
  return (dispatch) => {
    Promise.race([promise_wrap(sqhash), promise_wrap(hash320), promise_wrap(hash)])
    .then((res) => {
      dispatch(playMusic({
        ...res,
        index,
      }));
    });
  };
}
export function playMusic(data) {
  return {
    type: PLAY_MUSIC,
    payload: {...data},
  };
}
export default handleActions({
  [PLAY_MUSIC]: (state, action) => {
    console.log(action);
    return {
      ...state,
      ...action.payload,
    };
  },
}, initalState);
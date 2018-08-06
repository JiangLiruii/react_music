import { handleActions } from 'redux-actions';

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
};
const PLAY_MUSIC = 'music/PLAY_MUSIC';
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
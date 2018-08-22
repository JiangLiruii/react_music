import { handleActions } from 'redux-actions';

export interface SongInfo {
  SongName:string;
  SingerName:string;
  SQFileHash?:string;
  HQFileHash?:string;
  FileHash:string;
}

const FETCH_MUSIC = 'music/FETCH_MUSIC';
export function fetchDetailMusicActionCreator(song_id:number) {
  return {
    type:FETCH_MUSIC,
    payload: {song_id},
  };
}

export default
handleActions({
  [FETCH_MUSIC]: (state, action) => ({
    ...state,
    song_id:action.payload.song_id,
  }),
}, {song_id:0});
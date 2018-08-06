import { handleActions } from 'redux-actions';

interface Artist {
  id:number;
  name:string;
}
interface Album {
  id:number;
  filename:string;
  '320hash':string;
  hash:string;
  pic:number;
}
interface SongRate {
  br:number;
  size:number;
}
export interface SongInfo {
  songname:string;
  singername:string;
  '320hash'?:string;
  hash:string;
}
interface SongDetail {
  id:number;
}
const FETCH_MUSIC = 'music/FETCH_MUSIC';
export function fetchDetailMusicActionCreator(song_id:number) {
  console.log(song_id);
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
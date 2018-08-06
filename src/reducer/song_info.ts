import { handleActions } from 'redux-actions';

interface artist {
  id:number,
  name:string,
}
interface album {
  id:number,
  filename:string,
  '320hash':string,
  hash:string,
  pic:number,
}
interface songRate {
  br:number,
  size:number,
}
export interface songInfo {
  songname:string,
  singername:string
  '320hash'?:string,
  hash:string,
}
interface songDetail {
  id:number;
}
const FETCH_MUSIC = 'music/FETCH_MUSIC'
export function fetchDetailMusicActionCreator(song_id:number) {
  console.log(song_id);
  return {
    type:FETCH_MUSIC,
    payload: {song_id},
  }
}

export const detailSongStateReducer = 
handleActions({
  [FETCH_MUSIC]: (state, action) => ({
    ...state,
    song_id:action.payload.song_id,
  })
}, {song_id:0});
import { combineReducers } from 'redux';
import songState from './song_list';
import detailSongState from './song_single';
import currentSong from './current_song';
import currentNavIndex from './navigator';
export default combineReducers({
  songState,
  detailSongState,
  currentSongState:currentSong,
  currentNavIndex,
});
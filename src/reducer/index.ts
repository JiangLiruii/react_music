import { combineReducers } from 'redux';
import songState from './song_list';
import detailSongState from './song_single';
import currentSong from './current_song';
import currentNavIndex from './navigator';
import searchTip from './search_tip';
import is_quality from './song_quality';
export default combineReducers({
  songState,
  detailSongState,
  currentSongState:currentSong,
  currentNavIndex,
  searchTip,
  is_quality,
});
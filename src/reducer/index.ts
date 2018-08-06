import { combineReducers } from 'redux';
import songStateReducer from './song_list'
import { detailSongStateReducer } from './song_info'
export default combineReducers({
  songStateReducer,
  detailSongStateReducer,
})
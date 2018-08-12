import { handleActions } from 'redux-actions';
import { SongInfo } from './song_single';
import request from 'superagent';

export interface SongsState {
  songs_list:SongInfo[];
  currentMusicState:Query;
  isLoading:boolean;
  favo_song_list:SongInfo[];
}

const FETCH_MUSICS = 'music/FETCH_MUSICS';
const CHANGE_STATE = 'music/CHANGE_STATE';
const CHANGE_LOAD_STATE = 'music/CHANGE_LOAD_STATE';
const ADD_FAVO_MUSIC_LIST = 'music/ADD_FAVO_MUSIC_LIST';
const initalState:SongsState = {
  songs_list: [],
  currentMusicState: {name:'', page:1, pagesize:20},
  isLoading: false,
  favo_song_list: [],
};

export interface Query {
  name:string;
  page?:number;
  pagesize?:number;
}

export function fetchMusicsAsyncActionCreator(query:Query, origin_songs_list:SongInfo[]=[]) {
  const {name, page, pagesize} = query;
  return (dispatch) => {
    dispatch(changeLoadState(true));
    request.get(`http://192.168.20.91:3003/search?name=${name}&page=${page}&pagesize=${pagesize}`).withCredentials()
    .then((res) => {
      if (origin_songs_list.length > 0) {
        dispatch(fetchMusicSyncActionCreator(origin_songs_list.concat(res.body)));
      } else {
        dispatch(fetchMusicSyncActionCreator(res.body));
      }
      dispatch(changeCurrentMusicState(query));
      dispatch(changeLoadState(false));
    }, (err) => {console.log(err); } );
  };
}
function changeLoadState(isLoading:boolean) {
  return {
    type: CHANGE_LOAD_STATE,
    payload: {isLoading},
  };
}
function changeCurrentMusicState(currentMusicState:Query) {
  return {
    type: CHANGE_STATE,
    payload: {currentMusicState},
  };
}
export function fetchMusicSyncActionCreator(songs_list:SongInfo[]) {
  return {
    type: FETCH_MUSICS,
    payload: {songs_list},
  };
}

export function addMusicToFavoList(song:SongInfo) {
  return {
    type: ADD_FAVO_MUSIC_LIST,
    payload: {song},
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
  [CHANGE_LOAD_STATE]: (state, action) => ({
    ...state,
    isLoading: action.payload.isLoading,
  }),
  [ADD_FAVO_MUSIC_LIST]: (state, action:any) => {
    const new_favo_list = state.favo_song_list;
    new_favo_list.push(action.payload.song);
    return {
      ...state,
      favo_song_list:new_favo_list,
    };
  },
}, initalState);
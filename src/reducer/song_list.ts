import { handleActions } from 'redux-actions';
import { SongInfo } from './song_single';
import request from 'superagent';

export interface SongsState {
  songs_list:SongInfo[];
  currentMusicState:Query;
  isLoading:boolean;
  favo_song_list:SongInfo[];
  end:boolean;
}

const FETCH_MUSICS = 'music/FETCH_MUSICS';
const CHANGE_STATE = 'music/CHANGE_STATE';
const CHANGE_LOAD_STATE = 'music/CHANGE_LOAD_STATE';
const ADD_FAVO_MUSIC_LIST = 'music/ADD_FAVO_MUSIC_LIST';
const DELETE_FROM_FAVO_MUSIC = 'music/DELETE_FROM_FAVO_MUSIC';
const CHANGE_END_STATE = 'music/CHANGE_END_STATE';
const initalState:SongsState = {
  songs_list: [],
  currentMusicState: {name:'', page:1, pagesize:20},
  isLoading: false,
  favo_song_list: JSON.parse(window.localStorage.getItem('favo_song_list')) || [],
  end: false,
};

export interface Query {
  name:string;
  page?:number;
  pagesize?:number;
}

export function fetchMusicsAsyncActionCreator(query:Query) {
  const {name, page, pagesize} = query;
  return (dispatch) => {
    dispatch(changeLoadState(true));
    request.get('http://localhost:3003/api/search')
    .query({
      name,
      page,
      pagesize,
    })
    .then((res) => {
      // 如果没有返回值
      if (res.text === '[]') {
        return dispatch(fetchMusicsAsyncActionCreator(query));
      } else if (res.text === '{}') {
        dispatch(changeLoadState(false));
        return dispatch(fetchSongEnd(true));
      }
      dispatch(fetchSongEnd(false));
      dispatch(fetchMusicSyncActionCreator({songs_list: res.body, page}));
      dispatch(changeCurrentMusicState(query));
      dispatch(changeLoadState(false));
    }, (err) => {console.log(err); } );
  };
}
function fetchSongEnd(end:boolean) {
  return {
    type: CHANGE_END_STATE,
    payload: end,
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
export function fetchMusicSyncActionCreator(payload:any) {
  return {
    type: FETCH_MUSICS,
    payload,
  };
}

export function addMusicToFavoList(song:SongInfo) {
  return {
    type: ADD_FAVO_MUSIC_LIST,
    payload: song,
  };
}
export function deleteMusicFromFavoList(index:number) {
  return {
    type: DELETE_FROM_FAVO_MUSIC,
    payload: index,
  };
}

export default handleActions({
  [FETCH_MUSICS]: (state, action:any) => {
    // when scroll more
    let origin = JSON.parse(JSON.stringify(state.songs_list));
    if (action.payload.page !== 1) {
      origin = origin.concat(action.payload.songs_list);
    } else {
      origin = action.payload.songs_list;
    }
    return {
      ...state,
      songs_list: origin,
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
    const new_favo_list = JSON.parse(JSON.stringify(state.favo_song_list));
    new_favo_list.push(action.payload);
    return {
      ...state,
      favo_song_list:new_favo_list,
    };
  },
  [DELETE_FROM_FAVO_MUSIC]: (state, action:any) => {
    const new_songs_list = JSON.parse(JSON.stringify(state.favo_song_list));
    new_songs_list.splice(action.payload, 1);
    return {
      ...state,
      favo_song_list: new_songs_list,
    };
  },
  [CHANGE_END_STATE]: (state, action:any) => ({
    ...state,
    end: action.payload,
  }),
}, initalState);
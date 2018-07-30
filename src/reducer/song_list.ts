import axios from 'axios';

import { handleActions } from 'redux-actions';

interface songListState {
  song_list:any[],
}

const FETCH_MUSICS = 'music/FETCH_MUSICS'

const initalState = {
  song_list: [],
}


export function fetchMusicsActionCreator(query:string) {
  const url = `http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${encodeURIComponent(query)}&page=1&pagesize=90&showtype=2`;
  console.log(url)
  axios.get(url, {withCredentials:true })
  .then(res => {
      console.log(res)
      // console.log(res.status,JSON.parse(res.text).data.info);
      // if(res.status === 200) {
      //     fn(JSON.parse(res.text).data.info);
      // }
    })
  return {
    type: FETCH_MUSICS,
  }
}
export function reducer() {
  return handleActions({
    [FETCH_MUSICS]: (state, action) => ({
      ...state,
    })
  }, initalState)
}
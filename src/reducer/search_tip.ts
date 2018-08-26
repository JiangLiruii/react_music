import { handleActions } from 'redux-actions';
import request from 'superagent';

export interface SearchTip {
  tips_list:any[];
}

const SET_SEARCHTIP = 'music/SET_SEARCHTIP';
export function getSearchTip(value:string) {
  return (dispatch) => {
    request.get('/api/searchtip')
      .query({
        value,
      }).then(
        (res) => dispatch(setSearchTip(res.body)), (err) => console.log(err),
    );
  };
}

export function setSearchTip(res_list:any[]) {
  return {
    type: SET_SEARCHTIP,
    payload: res_list,
  };
}
export default handleActions({
  [SET_SEARCHTIP]: (state, action:any) => {
    const list = action.payload;
    console.log(list);
    const tips_list = list.map((item) => item['HintInfo']);
    return {
      ...state,
      tips_list,
    };
  },
}, { tips_list: [''] });
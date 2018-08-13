import { handleActions } from 'redux-actions';

const CHANGE_INDEX = 'navigator/CHANGE_INDEX';
export interface CurrentNavIndex {
  index:number;
}
export function changeNavIndex(index:number) {
  return {
    type: CHANGE_INDEX,
    payload: index,
  };
}
export default handleActions({
  [CHANGE_INDEX]: (state, action:any) => ({
    ...state,
    index: action.payload,
  }),
}, {index: 0});
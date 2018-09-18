import { handleActions, Action } from 'redux-actions';

export interface MusicQuality {
  quality:boolean;
}

const initalState = {
  quality: false,
};

const SWITCH_QUALITY = 'music/SWITCH_QUALITY';

export function SwitchQuality(payload?:boolean) {
  return {
    type: SWITCH_QUALITY,
    payload,
  };
}

export default handleActions({
  [SWITCH_QUALITY]: (state:any, action:Action<boolean>) => {
    return {
      ...state,
      quality: action.payload !== undefined ? action.payload : !state.quality,
    };
  },
}, initalState);
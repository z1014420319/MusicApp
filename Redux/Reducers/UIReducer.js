import {
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_MUSIC,
  STOP_LOADING_MUSIC
} from '../Types';

const initialState = {
  loading: false,
  loadingmusic: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
      case LOADING_MUSIC:
      return {
        ...state,
        loadingmusic: true
      };
    case STOP_LOADING_MUSIC:
      return {
        ...state,
        loadingmusic: false
      };
    default:
      return state;
  }
}

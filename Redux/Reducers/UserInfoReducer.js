import {
    SET_USER_NAME,
    REMOVE_USER_NAME,
    SET_OFFLINE,
    SET_CURRENT_PLAYLIST,
    SET_CURRENT_PLAYING,
    SET_MUSIC_DURATION,
    
    SET_CURRENT_NAV,
    SET_USER_INFO,
    SET_PLAY_MODE
} from '../Types'

const initialState = {
    userName : '',
    online : true,
    currentPlayList : '最近播放',
    currentPlaying : {},
    musicDuration : 0,
    currentNav : '' ,//'' Is Required Invalid Initial Value
    currentPlayMode : 'loop' //loop random list
}

export default function (state = initialState, action) {
    switch(action.type){
        case SET_USER_NAME:
            return {
                ...state,
                userName : action.payload,
                online : true
            }
        case REMOVE_USER_NAME:
            return {
                ...state,
                userName : '',
            }
        case SET_OFFLINE:
            return {
                ...state,
                online : false
            }
        case SET_CURRENT_PLAYLIST:
            return {
                ...state,
                currentPlayList : action.payload
            }
        case SET_CURRENT_PLAYING:
            return {
                ...state,
                currentPlaying : action.payload
            }
        case SET_MUSIC_DURATION:
            return {
                ...state,
                musicDuration : action.payload
            }
        case SET_CURRENT_NAV:
            return {
                ...state,
                currentNav : action.payload
            }
        case SET_USER_INFO:
            if(action.payload){
                action.payload.online = true
                return action.payload
            }else{
                return {
                    ...initialState,
                    userName:state.userName
                }
            }
        case SET_PLAY_MODE:
            return {
                ...state,
                currentPlayMode : action.payload
            }
        default:
            return state;
    }
}
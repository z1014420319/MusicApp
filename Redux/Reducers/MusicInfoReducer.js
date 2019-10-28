import {
    LODING_PLAYLISTS,
    SET_PLAYLISTS,
    CREATE_PLAYLIST,
    DELETE_PLAYLIST,
    ADD_MUSIC_TO_PLAYLIST,
    DELETE_MUSIC_FROM_PLAYLIST,

    SET_COMMON_LISTS,
    SET_SEARCH_LIST,

    SET_MUSIC_INFO
} from '../Types'
const initialState = {
    myPlaylists : {'最近播放':[]},
    commonLists : {'搜索':[]},
    searchList : [],
    loding : false,
  }
export default function (state =initialState, action) {
    switch(action.type){
        case LODING_PLAYLISTS:
            return {
                ...state,
                loding : true
            }
        case SET_PLAYLISTS:
            return {
                ...state,
                loding : false,
                myPlaylists : [...state.myPlaylists,action.payload]
            }
        case CREATE_PLAYLIST:
            return {
                ...state,
                myPlaylists : {...state.myPlaylists,[action.payload]:[]}
            }
        case DELETE_PLAYLIST:
            const temp1 = JSON.parse(JSON.stringify(state))
            delete temp1.myPlaylists[action.payload]
            return temp1
        case ADD_MUSIC_TO_PLAYLIST:
            const temp2 = JSON.parse(JSON.stringify(state))
            temp2.myPlaylists[action.payload.playlistname].push(action.payload.musicObj)
            return temp2
        case DELETE_MUSIC_FROM_PLAYLIST:
            const temp3 = JSON.parse(JSON.stringify(state))
            const deleteIndex = temp3.myPlaylists[action.payload.playlistname].findIndex(item=>(
                item.url===action.payload.musicObj.url
            ))
            temp3.myPlaylists[action.payload.playlistname].splice(deleteIndex,1)
            return temp3
        case SET_COMMON_LISTS:
            return {
                ...state,
                commonLists : Object.assign({},state.commonLists,action.payload)
            }
        case SET_SEARCH_LIST:
            return {
                ...state,
                commonLists : Object.assign({},state.commonLists,action.payload)
            }
        case SET_MUSIC_INFO:
            if(action.payload){
                return action.payload
            }else{
                return initialState
            }
        default:
            return state;
    }
}
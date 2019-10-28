import {
    SET_COMMON_LISTS,
    SET_SEARCH_LIST,
    CREATE_PLAYLIST,
    DELETE_PLAYLIST,
    ADD_MUSIC_TO_PLAYLIST,
    DELETE_MUSIC_FROM_PLAYLIST,
    LOADING_UI,
    STOP_LOADING_MUSIC,
    LOADING_MUSIC
} from '../Types'

import axios from 'axios'

export const getPlaylists = () => (dispatch) => {

}

export const createPlaylist = (playlistname) => (dispatch) => {
    dispatch({
        type:CREATE_PLAYLIST,
        payload:playlistname
    })
}

export const deletePlaylist = (playlistname) => (dispatch) => {
    console.dir(playlistname)
    dispatch({
        type:DELETE_PLAYLIST,
        payload:playlistname
    })
}

export const addMusciToPlaylist = (musicObj,playlistname) => (dispatch) => {
    dispatch({
        type:ADD_MUSIC_TO_PLAYLIST,
        payload:{musicObj,playlistname}
    })
}

export const deleteMusicFromPlaylist = (musicObj,playlistname) => (dispatch) => {
    dispatch({
        type:DELETE_MUSIC_FROM_PLAYLIST,
        payload:{musicObj,playlistname}
    })
}

export const getCommonLists = (nav,noNeedForUpdate) => (dispatch) => {
    if(noNeedForUpdate || nav ==='搜索'){
        return
    }
    const response = [];
    const list = {[nav]:[]}
    dispatch({
        type:SET_COMMON_LISTS,
        payload:list
    })
    dispatch({
        type:LOADING_UI
    })
    dispatch({
        type:LOADING_MUSIC
    })
    for(var i = 0; i < 1; i++){
        response.push(axios.get('https://api.uomg.com/api/rand.music?sort='+nav+'&format=json'))
    }
    Promise.all(response).then(res=>{
        for(var item of res){
            list[nav].push(item.data.data)
        }
        dispatch({
            type:SET_COMMON_LISTS,
            payload:list
        })
        dispatch({
            type:STOP_LOADING_MUSIC,
        })
    }).catch(err=>(console.dir(err)))
}

export const getSearchList = (searchValue) => (dispatch) => {
    dispatch({
        type:LOADING_MUSIC
    })
    axios.get('https://api.apiopen.top/searchMusic?name='+searchValue).then(res=>{
        const result = res.data.result.map(item=>({
            artistsname : item.author,
            name : item.title,
            picurl : item.pic,
            url : item.url
        }))
        dispatch({
            type:SET_SEARCH_LIST,
            payload:{'搜索':result}
        })
        dispatch({
            type:STOP_LOADING_MUSIC,
        })
    })
}
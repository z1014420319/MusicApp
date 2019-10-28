import {
    SET_CURRENT_NAV,
    SET_USER_NAME,
    REMOVE_USER_NAME,
    SET_OFFLINE,
    SET_MUSIC_INFO,
    SET_USER_INFO,
    SET_CURRENT_PLAYLIST,
    SET_CURRENT_PLAYING,
    SET_PLAY_MODE,
    SET_MUSIC_DURATION
} from '../Types'
import WriteStateToStorage from '../../WriteStateToStorage'

export const checkLogin = () => (dispatch) => {
    
}

export const signup = () => (dispatch) => {

}

export const login = (mobile,userData={}) => (dispatch) => {
    WriteStateToStorage()
    dispatch({
        type:SET_USER_NAME,
        payload:mobile
    })
    dispatch({
        type:SET_MUSIC_INFO,
        payload:userData.MusicInfo
    })
    dispatch({
        type:SET_USER_INFO,
        payload:userData.UserInfo
    })
}

export const logout = (offlineData={}) => (dispatch) => {
    dispatch({
        type:SET_OFFLINE,
    })
    WriteStateToStorage()
    dispatch({
        type:REMOVE_USER_NAME,
    })
    dispatch({
        type:SET_MUSIC_INFO,
        payload:offlineData.MusicInfo
    })
    dispatch({
        type:SET_USER_INFO,
        payload:offlineData.UserInfo
    })
}

export const restoreInfo = () => (dispatch) => {

}

export const setCurrentPlayList = (playlistname) => (dispatch) => {
    dispatch({
        type:SET_CURRENT_PLAYLIST,
        payload:playlistname
    })
}

export const setCurrentPlaying = (musicObj) => (dispatch) => {
    dispatch({
        type:SET_CURRENT_PLAYING,
        payload:musicObj
    })
}

export const setMusicDuration = (duration) => (dispatch) => {
    dispatch({
        type:SET_MUSIC_DURATION,
        payload:duration
    })
}

export const setCurrentNav = (nav,sameNav) => (dispatch) => {
    if(sameNav){
        return
    }
    dispatch({
        type:SET_CURRENT_NAV,
        payload:nav
    })
}

export const setPlayMode = (mode) => (dispatch) => {
    dispatch({
        type:SET_PLAY_MODE,
        payload:mode
    })
}
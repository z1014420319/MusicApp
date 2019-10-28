import React, { Component } from 'react';
import {connect} from 'react-redux'
import MusiclistItemOpration from './MusiclistItemOpration'
import {withRouter} from 'react-router-dom'

import {setCurrentPlaying,setCurrentPlayList} from '../../Redux/Actions/UserInfoAction'
import {addMusciToPlaylist} from '../../Redux/Actions/MusicInfoAction'
import {imageLoadEnd} from '../../Redux/Actions/UIAction'

const mapDispatchToProps = {
    setCurrentPlaying,
    setCurrentPlayList,
    addMusciToPlaylist,
    imageLoadEnd
}

const mapStateToProps = (state) => ({
    currentPlayList: state.UserInfo.currentPlayList,
    currentPlaying : state.UserInfo.currentPlaying,
    myPlaylists : state.MusicInfo.myPlaylists
})
 
class MusiclistItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    listenMusic = (e) => {
        let playlistname = this.props.currentNav
        if(['热歌榜','新歌榜','抖音榜','电音榜','搜索'].includes(this.props.currentNav)){
            playlistname = '最近播放'
            !this.props.myPlaylists[playlistname].some(musicObj=>(
                musicObj.url === this.props.musicObj.url
            )) && this.props.addMusciToPlaylist(this.props.musicObj,playlistname)
        }
        playlistname !== this.props.currentPlayList && 
            this.props.setCurrentPlayList(playlistname);
        if(this.props.musicObj.url !== this.props.currentPlaying.url){
            this.props.setCurrentPlaying(this.props.musicObj)
        } else{
            const audio = document.querySelector('audio')
            if(audio.paused)audio.play()
        }
    }
    handleLoad = (e) => {
        this.props.imageLoadEnd()
    }
    render() {
        const localStyle = {}
        if(this.props.musicObj.url === this.props.currentPlaying.url){
            localStyle.color = 'red'
        }
        return (
            <li style={localStyle} onClick={this.listenMusic} data-access="item">
                
            <MusiclistItemOpration {...this.props}/>
                {this.props.listType==='display' && <img alt='' onLoad={this.handleLoad} src={this.props.musicObj.picurl}/>}
                <span data-access="item">{this.props.musicObj.name} - {this.props.musicObj.artistsname}</span>
            </li>
        );
    }
}
 
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MusiclistItem));
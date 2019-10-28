import React, { Component } from 'react';
import {connect} from 'react-redux'
import Musiclist from '../Music/Musiclist'
import Playlist from '../Music/Playlist'

import CircularProgress from '@material-ui/core/CircularProgress';

import {createPlaylist,addMusciToPlaylist,deleteMusicFromPlaylist,getCommonLists} from '../../Redux/Actions/MusicInfoAction'
import {setCurrentPlaying} from '../../Redux/Actions/UserInfoAction'

import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

const mapStateToProps = (state) => ({
    commonLists : state.MusicInfo.commonLists,
    currentNav : state.UserInfo.currentNav,
    myPlaylists : state.MusicInfo.myPlaylists,
    userName : state.UserInfo.userName,
    currentPlayList: state.UserInfo.currentPlayList,
    currentPlaying : state.UserInfo.currentPlaying,
    loading: state.UI.loading,
    loadingmusic: state.UI.loadingmusic,
})

const mapDispatchToProps = {
    createPlaylist,
    addMusciToPlaylist,
    deleteMusicFromPlaylist,
    getCommonLists,
    setCurrentPlaying,
}

class ListBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPlaylist : false,
            currentMusicUrl : '',
            currentNav:this.props.currentNav
        };
    }
    static getDerivedStateFromProps(props,state){
        if(props.currentNav!==state.currentNav){
            return {
                currentNav:props.currentNav,
                showPlaylist:false
            }
        }
        return null
    }
    handleCreatePlaylist =  (e) => {
        if(!this.props.userName){
            alert('请先登录')
            return
        }
        let playlistname = window.prompt('名称')
        if(this.props.myPlaylists.hasOwnProperty(playlistname)){
            alert('该列表名称已存在')
        }else if(!playlistname){
            return
        }else{
            this.props.createPlaylist(playlistname)
        }
    }
    handleShowPlaylist = (e) => {
        e.stopPropagation()
        this.setState({
            showPlaylist : true,
            currentMusicUrl : e.target.dataset.url
        })
    }
    handleHidePlaylist = (e) => {
        this.setState({
            showPlaylist : false,
            currentMusicUrl : ''
        })
    }
    handleCheckChange = (e) => {
        const currentMusic = this.props.commonLists[this.props.currentNav].find(music=>(
            music.url===this.state.currentMusicUrl
        ))
        if(e.target.checked){
            this.props.addMusciToPlaylist(currentMusic,e.target.parentElement.dataset.playlistname)
            if(this.props.myPlaylists[this.props.currentPlayList].length===0&&
                    Object.keys(this.props.currentPlaying).length===0){
                this.props.setCurrentPlaying(currentMusic)
            }
        }else{
            this.props.deleteMusicFromPlaylist(currentMusic,e.target.parentElement.dataset.playlistname)
        }
    }
    handlerReload = (e) => {
        if(this.props.loading){
            return
        }
        this.setState({
            showPlaylist:false
        })
        this.props.getCommonLists(this.props.currentNav,false)
    }
    clearSearchResult = (e) => {
        this.props.commonLists['搜索']=[]
        this.forceUpdate()
    }
    render() {
        return (<>
            <div className='title'>{this.props.currentNav}</div>
            {this.props.currentNav!=='搜索' ? 
                <div className='listbutton refreah' onClick={this.handlerReload}>
                    {this.props.loading?<CircularProgress size='1.5rem'/>:<CachedRoundedIcon />}
                </div>:
                <div className='listbutton clear' onClick={this.clearSearchResult}><HighlightOffRoundedIcon /></div>}
            {this.state.showPlaylist ?
            (<div>
                <div className='buttongroup'>
                    <button onClick = {this.handleHidePlaylist}>&lt;返回</button>
                    <button onClick = {this.handleCreatePlaylist}>创建播放列表</button>
                </div>
                <Playlist myPlaylists={this.props.myPlaylists} type={'OPRATE'} 
                    currentMusicUrl={this.state.currentMusicUrl}
                    handleCheckChange={this.handleCheckChange}/>
            </div>) :

            !this.props.loadingmusic?<Musiclist handleShowPlaylist={this.handleShowPlaylist} commonLists={this.props.commonLists} 
                currentNav={this.props.currentNav} type="OPRATE"/>:
                <div className='loadingmusic'><CircularProgress /></div>}
        </>)
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ListBody);
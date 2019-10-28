import React, { Component } from 'react';
import Playlist from '../Music/Playlist'
import Musiclist from '../Music/Musiclist'

import {logout} from '../../Redux/Actions/UserInfoAction'
import {createPlaylist,deletePlaylist,deleteMusicFromPlaylist} from '../../Redux/Actions/MusicInfoAction'
import {setCurrentPlayList} from '../../Redux/Actions/UserInfoAction'
import {connect} from 'react-redux'

import njwt from 'njwt'

const mapStateToProps = (state) => ({
    myPlaylists : state.MusicInfo.myPlaylists,
    userName : state.UserInfo.userName,
    currentPlayList:state.UserInfo.currentPlayList
})

const mapDispatchToProps = {
    logout,
    createPlaylist,
    deletePlaylist,
    deleteMusicFromPlaylist,
    setCurrentPlayList
}

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPlaylist : false,
            currentPlaylist : '最近播放',
            loggedout:false
        };
    }
    handleClidk = (e) => {
        let offlineData = null
        if(window.localStorage.MusicApp){
            try{
            offlineData = njwt.verify(window.localStorage.MusicApp,'MusicApp').body.stores['offline'] || {}
            }catch(err){
                console.dir(err)
            }
        }
        this.props.logout(offlineData)
        this.setState({
            loggedout:true
        })
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
    handleDeletePlaylist = (e) => {
        const playlistname = e.target.parentNode.dataset.playlistname
        if(!window.confirm('是否要删除列表'+playlistname)){
            return
        }
        if(!this.props.myPlaylists.hasOwnProperty(playlistname)){
            alert('删除失败')
            return
        }
        if(playlistname === '最近播放'){
            alert('无法删除默认列表')
            return
        }
        if(this.props.currentPlayList === playlistname){
            this.props.setCurrentPlayList('最近播放')
        }
        this.props.deletePlaylist(playlistname)
    }
    handleDeleteMusicFromPlaylist = (e) => {
        e.stopPropagation()
        const currentMusic = this.props.myPlaylists[this.state.currentPlaylist].find(music=>(
            music.url===e.target.dataset.url
        ))
        this.props.deleteMusicFromPlaylist(currentMusic,this.state.currentPlaylist)
    }
    handleViewPlaylist = (e) => {
        e.stopPropagation()
        this.setState({
            showPlaylist : true,
            currentPlaylist : e.target.textContent
        })
    }
    handleHidePlaylist = (e) => {
        this.setState({
            showPlaylist : false
        })
    }
    render() {
        return (<>
            {this.props.userName && <div className='accountopration'>
            <div>欢迎，{this.props.userName}</div><button onClick = {this.handleCreatePlaylist}>创建播放列表</button><button onClick = {this.handleClidk}>退出登陆</button>
            </div>}
            
            {this.state.showPlaylist ?
            <div style={{paddingTop:'20px'}}>
                <div className='buttongroup'>
                <button onClick={this.handleHidePlaylist}>&lt;返回</button>
                <div>{this.state.currentPlaylist}</div>
                </div>
                <Musiclist commonLists={this.props.myPlaylists} currentNav={this.state.currentPlaylist} 
                        type={'DELETE'} handleDeleteMusicFromPlaylist={this.handleDeleteMusicFromPlaylist}/>
            </div>:
            <Playlist myPlaylists={this.props.myPlaylists} handleDeletePlaylist={this.handleDeletePlaylist}
                handleViewPlaylist={this.handleViewPlaylist} type={'VIEW'}/>}
        </>);
    }
    componentDidUpdate(){
        if(this.state.loggedout){
            document.querySelector('audio').pause()
        }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Collection);
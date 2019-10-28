import React, { Component } from "react";
import MusiclistItemOpration from "../Components/Music/MusiclistItemOpration";
import Musiclist from '../Components/Music/Musiclist'
import Playlist from '../Components/Music/Playlist'
import {addMusciToPlaylist,deleteMusicFromPlaylist,createPlaylist} from '../Redux/Actions/MusicInfoAction'
import {setPlayMode,setCurrentPlaying} from '../Redux/Actions/UserInfoAction'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import QueueMusicRoundedIcon from '@material-ui/icons/QueueMusicRounded';
import RepeatOneRoundedIcon from '@material-ui/icons/RepeatOneRounded';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';

const mapStateToProps = (state) => ({
  currentPlayList: state.UserInfo.currentPlayList,
  currentPlaying : state.UserInfo.currentPlaying,
  currentPlayMode : state.UserInfo.currentPlayMode,
  myPlaylists : state.MusicInfo.myPlaylists,
  musicDuration : state.UserInfo.musicDuration,
  userName : state.UserInfo.userName
})
const mapDispatchToProps = {
  addMusciToPlaylist,
  deleteMusicFromPlaylist,
  setPlayMode,
  setCurrentPlaying,
  createPlaylist
}

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlaylist : false,
      showMusiclist:false,
      paused : true,
      currentTime : 0,
      pageX : 0,
      iniCurrentTime :0,
      noMusic : false,
      noMusicInPlaylist:false
    }
  }
  static getDerivedStateFromProps(props,state){
    if(Object.keys(props.currentPlaying).length===0){
      if(props.myPlaylists[props.currentPlayList].length===0){
        return{noMusic : true}
      }
    }else{
      if(props.myPlaylists[props.currentPlayList].length===0){
        return{noMusicInPlaylist : true}
      }
    }
    return null
  }
  handleClearInterval(){
    cancelAnimationFrame(this.interval)
  }
  handleSetInterval(){
    const fn = ()=>{
      this.setState({
        currentTime:this.props.audio.current.currentTime
      })
      this.interval = window.requestAnimationFrame(fn)
    }
    fn()
  }
  handleCheckChange = (e) => {
    if(this.state.noMusic)return
    if(e.target.checked){
        this.props.addMusciToPlaylist(this.props.currentPlaying,e.target.parentElement.dataset.playlistname)
    }else{
        this.props.deleteMusicFromPlaylist(this.props.currentPlaying,e.target.parentElement.dataset.playlistname)
    }
  }
  handleDeleteMusicFromPlaylist=(e) => {
    if(this.state.noMusic)return
    e.stopPropagation()
    const currentMusic = this.props.myPlaylists[this.props.currentPlayList].find(music=>(
      music.url===e.target.dataset.url
    ))
    this.props.deleteMusicFromPlaylist(currentMusic,this.props.currentPlayList)
  }
  handleShowPlaylist = (e) => {
    e.stopPropagation()
    this.setState({
      showPlaylist:!this.state.showPlaylist
    })
  }
  showMusiclist=(e)=>{
    this.setState({
      showMusiclist:!this.state.showMusiclist
    })
    this.setState({
      showPlaylist:false
    })
  }
  play = ()=>{
    if(this.state.noMusic)return
    this.setState({
      paused:false
    })
    this.props.audio.current.play()
    this.handleSetInterval()
  }
  pause = ()=>{
    if(this.state.noMusic)return
    this.setState({
      paused:true
    })
    this.props.audio.current.pause()
    this.handleClearInterval()
  }
  clickPlayer = ()=>{
    if(this.state.noMusic)return
    if(this.state.paused){
      this.play()
    }else{
      this.pause()
    }
  }
  setPlayMode = (e) => {
    let ele = e.target
    while(ele.tagName !=='DIV'){
      ele = ele.parentNode
    }
    this.props.setPlayMode(ele.dataset.changetomode)
  }
  previousMusic = (e) => {
    if(this.state.noMusic)return
    if(this.state.noMusicInPlaylist){
      this.props.audio.current.currentTime = 0
      this.play()
      return
    }
    this.handleClearInterval()
    let list=''
    let index=0
    switch(this.props.currentPlayMode){
      case 'random' :    
        list = this.props.myPlaylists[this.props.currentPlayList]
        index = Math.floor(Math.random()*list.length)
        this.props.setCurrentPlaying(list[index])
        this.props.audio.current.currentTime = 0
        this.play()
        break
      default :
        list = this.props.myPlaylists[this.props.currentPlayList]
        index = list.findIndex((item)=>(
            item.url === this.props.currentPlaying.url
        ))
        this.props.setCurrentPlaying(list[(index+list.length-1)%list.length])
        this.props.audio.current.currentTime = 0
        this.play()
    }
  }
  nextMusic = (e) => {
    if(this.state.noMusic)return
    if(this.state.noMusicInPlaylist){
      this.props.audio.current.currentTime = 0
      this.play()
      console.dir('???')
      return
    }
    this.handleClearInterval()
    let list=''
    let index=0
    switch(this.props.currentPlayMode){
      case 'random' :    
        list = this.props.myPlaylists[this.props.currentPlayList]
        index = Math.floor(Math.random()*list.length)
        this.props.setCurrentPlaying(list[index])
        this.props.audio.current.currentTime = 0
        this.play()
        break
      default :
        list = this.props.myPlaylists[this.props.currentPlayList]
        index = list.findIndex((item)=>(
            item.url === this.props.currentPlaying.url
        ))
        this.props.setCurrentPlaying(list[(index+1)%list.length])
        this.props.audio.current.currentTime = 0
          this.play()
    }
  }
  clickedMusicItem = (e) => {
    if(e.target.dataset.access==='item'){
      this.setState({
        paused:false
      })
      this.handleClearInterval()
      this.handleSetInterval()
    }
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
  convertSecond(second){
    let min = String(Math.floor(second/60))
    let left = String(Math.round(second%60))
    min < 10 && (min = '0'+min)
    left < 10 && (left = '0' + left)
    return min+':'+left
  }
  handleTouchStart = (e) => {
    e.target.style.transform='scale(1.5)'
    this.handleClearInterval()
    this.setState({
      pageX : e.targetTouches[0].pageX,
      iniCurrentTime : this.state.currentTime
    })
  }
  handleTouchMove = (e) => {
    if(this.state.noMusic)return
    const currentTime = 
    this.state.iniCurrentTime+(e.targetTouches[0].pageX-this.state.pageX)/300*this.props.musicDuration
    if(currentTime <= this.props.musicDuration && currentTime>=0){
      this.setState({
      currentTime
      })
    }
  }
  handleTouchEnd = (e) => {
    e.target.style.transform='scale(1)'
    if(this.state.noMusic)return
    this.setState({
      pageX : 0,
      iniCurrentTime:0
    })
    this.props.audio.current.currentTime = this.state.currentTime
    if(!this.state.paused)this.play()
  }
  render() {
    return (<>
          <div className='controller'>
            <div onClick={this.showMusiclist}><QueueMusicRoundedIcon /></div>
            <div onClick={this.previousMusic}><SkipPreviousRoundedIcon /></div>
            {this.state.paused ? <div onClick={this.play}><PlayArrowRoundedIcon /></div> :
            <div onClick={this.pause}><PauseRoundedIcon /></div>}
            <div onClick={this.nextMusic}><SkipNextRoundedIcon /></div>
            {this.props.currentPlayMode==='loop' &&<div data-changetomode='random' 
                                onClick={this.setPlayMode}><RepeatOneRoundedIcon /></div>}
            {this.props.currentPlayMode==='list' &&<div data-changetomode='loop' 
                                onClick={this.setPlayMode}><RepeatRoundedIcon /></div>}
            {this.props.currentPlayMode==='random' &&<div data-changetomode='list' 
                                onClick={this.setPlayMode}><ShuffleRoundedIcon /></div>}
          </div>
          <div className='title'>
            <div className='process'>
              <div className='currenttime' style={{
                width:this.state.currentTime/this.props.musicDuration*300 || 0
                }}>
                  <div className="circle" onTouchMove={this.handleTouchMove}
                        onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}></div>
              </div>
              <div className='digitaltime'>
                {this.convertSecond(this.state.currentTime)+'/'+this.convertSecond(this.props.musicDuration)}
              </div>
            </div>
          </div>
          
          {(!this.state.showMusiclist && !this.state.showPlaylist) && 
          <div className='player' onClick={this.clickPlayer}>
            <img alt='' src={this.props.currentPlaying.picurl}/>
            <span style={{color:'red'}}>{this.props.currentPlaying.name} - {this.props.currentPlaying.artistsname}</span>
            <MusiclistItemOpration type="OPRATE" musicObj={this.props.currentPlaying} 
                      handleShowPlaylist={this.handleShowPlaylist}/>
          </div>}
            
          {this.state.showMusiclist && 
          <div onClickCapture={this.clickedMusicItem}>
            <button style={{margin:'0 auto',display:'block'}} onClick={this.showMusiclist}>&lt;返回</button>
            <Musiclist type="DELETE" commonLists={this.props.myPlaylists} 
                currentNav={this.props.currentPlayList} 
                handleDeleteMusicFromPlaylist={this.handleDeleteMusicFromPlaylist}/>
          </div>}

          {this.state.showPlaylist && 
          <div>
            <div className='buttongroup'>
            <button onClick={this.handleShowPlaylist}>&lt;返回</button>
            <button onClick = {this.handleCreatePlaylist}>创建播放列表</button>
            </div>
            <Playlist myPlaylists={this.props.myPlaylists} type={'OPRATE'} 
                    currentMusicUrl={this.props.currentPlaying.url}
                    handleCheckChange={this.handleCheckChange}/>
          </div>}
    </>);
  }
  componentDidMount(){
    this.setState({
      paused:this.props.audio.current.paused,
      currentTime:this.props.audio.current.currentTime
    })
    if(!this.props.audio.current.paused){
      this.handleSetInterval()
    }
  }
  componentWillUnmount(){
    this.handleClearInterval();
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Play));
import React, { Component } from "react";
import {setCurrentPlaying,setCurrentPlayList} from '../../Redux/Actions/UserInfoAction'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  myPlaylists : state.MusicInfo.myPlaylists
})

const mapDispatchToProps = {
  setCurrentPlaying,
  setCurrentPlayList
}

class PlaylistItemOpration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handlePlay = (e) => {
    if(this.props.myPlaylists[e.target.parentNode.dataset.playlistname].length >0){
      this.props.setCurrentPlayList(e.target.parentNode.dataset.playlistname)
      this.props.setCurrentPlaying(this.props.myPlaylists[e.target.parentNode.dataset.playlistname][0])
      document.querySelector('audio').play()
    }else{
      alert('列表为空')
    }
  }
  render() {
    if(this.props.type === 'VIEW')
    return (
      <span className='playlistopration' data-playlistname={this.props.playlistname}>
        {this.props.playlistname !== "最近播放" && (
          <button onClick={this.props.handleDeletePlaylist}>删除</button>
          )}
        <button onClick={this.handlePlay}>播放</button>
      </span>
    )
    else
    return (
        <span className='playlistopration' data-playlistname={this.props.playlistname}>
          <input type="checkbox" checked={this.props.includes} onChange={this.props.handleCheckChange}/>
        </span>
      );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlaylistItemOpration);
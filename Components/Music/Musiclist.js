import React, { Component } from "react";
import MusiclistItem from './MusiclistItem'
import {withRouter} from 'react-router-dom'



class Musiclist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let className = ''
    if(/list/.test(this.props.location.pathname) && !/搜索/.test(this.props.location.pathname)){
      className += 'display'
    }else{
      className += 'list'
    }
    return (
      <ul className={className}>
          {this.props.commonLists[this.props.currentNav].map((musicObj,index)=>(
            <MusiclistItem listType={className} key={index} musicObj={musicObj} handleShowPlaylist={this.props.handleShowPlaylist}
            type={this.props.type} handleDeleteMusicFromPlaylist={this.props.handleDeleteMusicFromPlaylist}
            currentNav={this.props.currentNav}/>
          ))}
          {this.props.commonLists[this.props.currentNav].length===0&&<div className='empty'>列表为空</div>}
      </ul>
    )
  }
}

export default withRouter(Musiclist);

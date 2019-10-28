import React, { Component } from 'react';
import PlaylistItemOpration from './PlaylistItemOpration'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    currentPlayList : state.UserInfo.currentPlayList
})

class PlaylistItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const style = {}
        if(this.props.currentPlayList === this.props.playlistname){
            style.color = 'red'
        }
        return (
            <li>
                <PlaylistItemOpration playlistname={this.props.playlistname} 
                    handleDeletePlaylist={this.props.handleDeletePlaylist} type={this.props.type}
                    includes={this.props.includes} handleCheckChange={this.props.handleCheckChange}/>
                <span style={style} onClick={this.props.handleViewPlaylist}>{this.props.playlistname}</span>
            </li>
        );
    }
}
 
export default connect(mapStateToProps,null)(PlaylistItem);
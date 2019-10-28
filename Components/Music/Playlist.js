import React, { Component } from 'react';

import PlaylistItem from './PlaylistItem'

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (<>
            <ul className='playlist'>
                {Object.keys(this.props.myPlaylists).map((playlistname,index)=>(
                    <PlaylistItem key={index} playlistname={playlistname} 
                        handleDeletePlaylist={this.props.handleDeletePlaylist}
                        handleViewPlaylist={this.props.handleViewPlaylist} type={this.props.type}
                        includes={this.props.type==='OPRATE' && this.props.myPlaylists[playlistname].some(music=>(
                            music.url===this.props.currentMusicUrl))}
                        handleCheckChange={this.props.handleCheckChange}/>
                ))}
            </ul>
        </>);
    }
}
 
export default Playlist;
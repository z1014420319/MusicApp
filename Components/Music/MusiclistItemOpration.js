import React, { Component } from 'react';
 
class MusiclistItemOpration extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (<>
            {this.props.type==='OPRATE' ?
             <button className='opration' data-url={this.props.musicObj.url} onClick={this.props.handleShowPlaylist}>· · ·</button>:
             <button data-url={this.props.musicObj.url} onClick={this.props.handleDeleteMusicFromPlaylist}>X</button>
             }
        </>);
    }
}
 
export default MusiclistItemOpration;
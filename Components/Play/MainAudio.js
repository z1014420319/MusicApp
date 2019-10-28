import React, { Component } from 'react';
import {connect} from 'react-redux'
import {setCurrentPlaying,setMusicDuration} from '../../Redux/Actions/UserInfoAction'

const mapStateToProps = (state) => ({
    currentPlaying : state.UserInfo.currentPlaying,
    currentPlayMode : state.UserInfo.currentPlayMode,
    myPlaylists : state.MusicInfo.myPlaylists,
    currentPlayList : state.UserInfo.currentPlayList
})

const mapDispatchToProps = {
    setCurrentPlaying,
    setMusicDuration
}
 
class MainAudio extends Component {
    render() {
        return (
            <audio autoPlay onLoadedData={this.setMusicDuration} preload='true' 
                ref={this.props.forwardRef} src={this.props.currentPlaying.url}/>
        );
    }
    handleEnded = (e)=> {
        switch(this.props.currentPlayMode){
            case 'loop':
                this.props.forwardRef.current.currentTime = 0
                this.props.forwardRef.current.play()
                break
            case 'list':
                let list1 = this.props.myPlaylists[this.props.currentPlayList]
                let index1 = list1.findIndex((item)=>(
                    item.url === this.props.currentPlaying.url
                    ))
                this.props.setCurrentPlaying(list1[(index1+1)%list1.length])
                if(index1===(index1+1)%list1.length){
                    this.props.forwardRef.current.currentTime = 0
                    this.props.forwardRef.current.play()
                }
                break
            case 'random':
                let list2 = this.props.myPlaylists[this.props.currentPlayList]
                let index2 = Math.floor(Math.random()*list2.length)
                this.props.setCurrentPlaying(list2[index2])
                this.props.forwardRef.current.play()
                break
            default :
                break
        }
    }
    setMusicDuration = (e) => {
        this.props.setMusicDuration(e.target.duration)
    }
    componentDidMount(){
        this.props.forwardRef.current.pause()
        this.props.forwardRef.current.addEventListener('ended',this.handleEnded)
    }
}

const withRef = (Component) => (
    React.forwardRef((props,ref) => (
        <Component {...props} forwardRef={ref} />
    ))
)
 
export default withRef(connect(mapStateToProps,mapDispatchToProps)(MainAudio));
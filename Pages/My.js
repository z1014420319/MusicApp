import React, { Component } from 'react';
import {Route,NavLink,withRouter} from 'react-router-dom'
import Login from '../Components/My/Login'
import Collection from '../Components/My/Collection'
import Register from '../Components/My/Register'
import { connect } from 'react-redux';

import {createPlaylist} from '../Redux/Actions/MusicInfoAction'

const mapStataToPtops = (state) => ({
    myPlaylists : state.MusicInfo.myPlaylists,
    userName : state.UserInfo.userName
})

const mapDispatchToProps = {
    createPlaylist
}
 
class My extends Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    static getDerivedStateFromProps(props,state){
        if(props.userName){
            if(props.location.pathname === '/my' || props.location.pathname !== '/my/collection'){
                props.history.replace('/my/collection',null)
            }
        }else{
            if(props.location.pathname === '/my' ){
                props.history.replace('/my/collection',null)
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
    render() {
        return (
            <>
                {!this.props.userName && this.props.location.pathname==='/my/collection' &&
                <div className='accountopration'>
                <NavLink to="/my/login">登陆</NavLink>
                <NavLink to="/my/register">注册</NavLink>
                <button onClick = {this.handleCreatePlaylist}>创建播放列表</button>
                </div>
                }
                <Route path='/my/login' component={Login}/>
                <Route path='/my/register' component={Register}/>
                <Route path='/my/collection' component={Collection}/>
            </>
        );
    }
}
 
export default connect(mapStataToPtops,mapDispatchToProps)(withRouter(My));
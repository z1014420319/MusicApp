import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Album from '@material-ui/icons/Album';
import QueueMusic from '@material-ui/icons/QueueMusic'
import AccountCircle from '@material-ui/icons/AccountCircle'

import {Link} from 'react-router-dom'

const mapStateToProps = (state) => ({
    currentNav : state.UserInfo.currentNav || '热歌榜',
})

class BottomNav extends Component {
    constructor(props) {
        super(props);
        let path = this.props.location.pathname.match(/^\/(\w+)\/?/);
        this.state = {
            value : path ? path[1] : 'list',
        };
    }
    handleChange = (event,value)=>{
        this.setState({value})
    }
    render() {
        return (<div className='bottom-nav'>
            <BottomNavigation showLabels value={this.state.value} onChange={this.handleChange}>
                <BottomNavigationAction component={Link} to={'/list/'+this.props.currentNav} value='list' label="推荐" icon={<QueueMusic />} />
                <BottomNavigationAction component={Link} to='/play' value='play' label="播放" icon={<Album />} />
                <BottomNavigationAction component={Link} to='/my' value='my' label="收藏" icon={<AccountCircle />} />
            </BottomNavigation>
        </div>);
    }
}

export default connect(mapStateToProps,null)(withRouter(BottomNav));
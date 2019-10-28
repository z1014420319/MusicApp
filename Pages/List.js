import React, { Component } from 'react';
import ListNav from '../Components/List/ListNav'
import ListBody from '../Components/List/ListBody'

import {connect} from 'react-redux'
import {getSearchList,getCommonLists} from '../Redux/Actions/MusicInfoAction'
import {setCurrentNav} from '../Redux/Actions/UserInfoAction'
 
const mapStateToProps = (state) => ({
    commonLists : state.MusicInfo.commonLists,
    currentNav : state.UserInfo.currentNav
})
const mapDispatchToProps = {
    getSearchList,
    setCurrentNav,
    getCommonLists
}


class List extends Component {
    constructor(props) {
        super(props)
        this.count = 0;
        this.state = {}
    }
    static getDerivedStateFromProps(props,state){
        let nav = props.location.pathname.match(/^\/list\/([^?]+)/)
        nav = nav && ['热歌榜','新歌榜','抖音榜','电音榜','搜索'].includes(nav[1])? nav[1] : '热歌榜'
        props.getCommonLists(nav,props.currentNav===nav || props.commonLists.hasOwnProperty(nav))
        props.setCurrentNav(nav,props.currentNav===nav)
        return {}
    }
    shouldComponentUpdate(nextProps,nextState){
        // console.dir('shouldComponentUpdate')
        // console.dir('nextProps.commonLists !== this.props.commonLists '+(nextProps.commonLists !== this.props.commonLists))
        // console.dir('nextProps.currentNav !== this.props.currentNav '+(nextProps.currentNav !== this.props.currentNav))
        // console.dir(nextProps.commonLists !== this.props.commonLists || 
        //     nextProps.currentNav !== this.props.currentNav)
        // console.dir(nextProps)
        // console.dir(this.props)
        return  nextProps.commonLists !== this.props.commonLists && 
                nextProps.currentNav === this.props.currentNav
    }
    render() {
        return (<>
           <ListNav />
           <ListBody />
        </>);
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        return null
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        
    }
    componentDidMount(){
    }
    componentWillUnmount(){
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(List);
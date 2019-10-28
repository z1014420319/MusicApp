import React, { Component } from 'react';
import {NavLink,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSearchList} from '../../Redux/Actions/MusicInfoAction'

const mapDispatchToProps = {
    getSearchList
}

class ListNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue : ''
        };
        this.search = React.createRef()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.searchValue)return
        this.props.getSearchList(this.state.searchValue)
        this.props.history.push('/list/搜索?'+this.state.searchValue,null)
        this.setState({
            searchValue : ''
        })
    }
    handleChange = (e) => {
        this.setState({
            searchValue : e.target.value
        })
    }
    render() {
        let visibility = ''
        switch(/搜索/.test(this.props.location.pathname)){
            case false:
                visibility = 'hidden'
                break
            case true:
                visibility = 'visible'
                break
            default:
                break
        }
        return (<>
            <nav>
                <NavLink activeClassName='nav-selected' to="/list/热歌榜">热歌榜</NavLink>
                <NavLink activeClassName='nav-selected' to="/list/新歌榜">新歌榜</NavLink>
                <NavLink activeClassName='nav-selected' to="/list/抖音榜">抖音榜</NavLink>
                <NavLink activeClassName='nav-selected' to="/list/电音榜">电音榜</NavLink>
                <NavLink activeClassName='nav-selected' to="/list/搜索">搜索</NavLink>
            </nav>
            <form onSubmit={this.handleSubmit} style={{visibility}}>
                <input ref = {this.search} type='text' value={this.state.searchValue} onChange={this.handleChange}/>
            </form>
        </>);
    }
    componentDidUpdate(){
        this.search.current.focus()
    }
}
 
export default connect(null,mapDispatchToProps)(withRouter(ListNav));
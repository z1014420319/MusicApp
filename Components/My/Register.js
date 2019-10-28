import React from "react";
import axios from 'axios'
import { connect } from "react-redux";
import {login} from '../../Redux/Actions/UserInfoAction'
import {NavLink} from 'react-router-dom'

const mapDispatchToProps = {
  login
}

const mapStateToProps = (state) => ({
  loading:state.UI.loading,
  errors:state.UI.errors
})

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile : '',
      password : '',
      error_message:'',
      loading:false
    };
  }
   
  handleSubmit = (e) => {
    this.setState({loading:true})
    e.preventDefault()
    const fd = new FormData()
    fd.append('apikey','84fa40e600ae8a00c47eaf282d3bda46')
    fd.append('passwd',this.state.password)
    fd.append('name',this.state.mobile)
    axios.post('https://api.apiopen.top/registerUser',fd).then(res=>{
      if(res.data.code === 200){
        this.props.login(res.data.result.name)
      }else{
        this.setState({
          error_message:res.data.message,
          loading:false
        })
      }
    }).catch(err=>(
      console.dir(err)
    ))
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
      error_message:'',
    })
  }
  render() {
    return (<>
      <div className='accountopration'>
      <NavLink to="/my/collection">&lt;返回</NavLink>
      <div>注册</div>
      </div>
      <form onSubmit={this.handleSubmit} className='accountform'>
        <div className='errormessage'>{this.state.error_message}</div>
        <label>账 号　<input type="text" name="mobile" onChange={this.handleChange} autoFocus/></label>
        <label>密 码　<input type="password" name="password" onChange={this.handleChange}/></label>
        <input type="submit" value="注 册" className='accountbutton'/>
      </form>
    </>);
  }
  componentDidUpdate(){
    if(this.state.loading){
      for(var i of document.forms[0].elements){
        i.disabled = true
      }
    }else if(document.forms[0].elements[0].disabled){
      for(var j of document.forms[0].elements){
        j.disabled = false
      }
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)
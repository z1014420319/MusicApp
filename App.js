import React from "react";

import store from './Redux/Store'
import {Provider} from 'react-redux'

import List from './Pages/List'
import Play from './Pages/Play'
import My from './Pages/My'
import BottomNav from './Components/BottomNav'
import MainAudio from './Components/Play/MainAudio'

import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'

import WriteStateToStorage from './WriteStateToStorage'

class App extends React.Component {
  constructor(props) {
    super(props);
    window.onbeforeunload = function(){
      WriteStateToStorage()
    }
    this.audio = React.createRef()
  }
  render() {
    return (
    <Provider store={store}>
    <BrowserRouter>
      <MainAudio ref={this.audio}/>
      <Switch>
        <Route path='/list' component={List}/>
        <Route path='/play' render={()=><Play audio={this.audio}/>}/>
        <Route path='/my' component={My}/>
        <Redirect to="/list/热歌榜" />
      </Switch>
      <BottomNav/>
    </BrowserRouter>
    </Provider>
    );
  }
}

export default App;

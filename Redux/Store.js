import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'

import MusicInfoReducer from './Reducers/MusicInfoReducer'
import UserInfoRuducer from './Reducers/UserInfoReducer'
import UIReducer from './Reducers/UIReducer'

import njwt from 'njwt'

const reducer = combineReducers({
    UserInfo : UserInfoRuducer,
    MusicInfo : MusicInfoReducer,
    UI : UIReducer
})

let initialState ={}
if(window.localStorage.MusicApp){
  try{
    const stores = njwt.verify(window.localStorage.MusicApp,'MusicApp').body.stores
    initialState = stores['offline']
    for(var mobile in stores){
      if(mobile !== 'offline' && stores[mobile].UserInfo.online){
        initialState = stores[mobile]
        break
      }
    }
  }catch(err){
    console.dir(err)
  }
}

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
: compose

const middleware = [thunk]

const enhancer = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(reducer,initialState,enhancer);

export default store
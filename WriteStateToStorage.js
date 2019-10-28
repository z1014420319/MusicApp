import njwt from 'njwt'
import store from './Redux/Store'

export default ()=>{
    let stores = {}
      if(window.localStorage.MusicApp){
        try{
          stores = njwt.verify(window.localStorage.MusicApp,'MusicApp').body.stores
        }catch(err){

        }
      }
      stores[store.getState().UserInfo.userName || 'offline'] = {
        ...store.getState()
      }
      const claims = {
        stores
      }
      const jwt = njwt.create(claims,'MusicApp')
      jwt.setExpiration()
      const token = jwt.compact();
      window.localStorage.setItem('MusicApp',token)
}
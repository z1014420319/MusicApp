import {
    STOP_LOADING_UI
} from '../Types'

export const imageLoadEnd = () => (dispatch) => {
    dispatch({
        type:STOP_LOADING_UI
    })
}
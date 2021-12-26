
import axios from 'axios'

import {
    CLEAR_CAR_PARK_ERROR,
    LOADING_CAR_PARK_DATA,
    SET_SEARCH_CAR_PARK_DATA,
    SET_CAR_PARK_ERROR,
} from './search.types'


const setAuthorizationHeader = () => {
    if(localStorage.getItem('access_token') && localStorage.getItem('access_token') !== '') {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

    }
};

export const searchCarParks = (query,sort_by = 'created_at', page = 1, perPage = 100) => (dispatch) => {

    setAuthorizationHeader()
    dispatch({ type: LOADING_CAR_PARK_DATA })
    axios.get('search?query='+query+'&per_page='+perPage+'&page='+page+'&sort_by='+sort_by)
    .then((res)=>{
        
        dispatch({ type: CLEAR_CAR_PARK_ERROR})
        dispatch({
            type: SET_SEARCH_CAR_PARK_DATA,
            payload: res.data
        })


    })
    .catch((error)=> {
        
        dispatch({
            type: SET_CAR_PARK_ERROR,
            payload: error.response.data
        })
    })

}





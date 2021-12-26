
import axios from 'axios'

import {
    CLEAR_CAR_PARK_ERROR,
    LOADING_CAR_PARK_DATA,
    SET_CAR_PARK_DATA,
    SET_CAR_PARK_ERROR,
    SET_CAR_PARK_MESSAGE,
} from './carPark.types'


const setAuthorizationHeader = () => {
    if(localStorage.getItem('access_token') && localStorage.getItem('access_token') !== '') {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

    }
};

export const getAllCarParks = (sort_by = 'created_at', page = 1, perPage = 100) => (dispatch) => {

    setAuthorizationHeader()
    dispatch({ type: LOADING_CAR_PARK_DATA })
    axios.get('car-parks?per_page='+perPage+'&page='+page+'&sort_by='+sort_by)
    .then((res)=>{
        
        dispatch({ type: CLEAR_CAR_PARK_ERROR})
        dispatch({
            type: SET_CAR_PARK_DATA,
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


export const setNewCarPark = (newData, user_id, navigate) => (dispatch) => {

    setAuthorizationHeader()
    dispatch({ type: LOADING_CAR_PARK_DATA })
    axios.post('users/'+user_id+'/car-park', newData)
    .then((res)=>{
        
        dispatch({ type: CLEAR_CAR_PARK_ERROR})
        dispatch({
            type: SET_CAR_PARK_MESSAGE,
            payload: res.data.message
        })
        dispatch(getAllCarParks())

    })
    .catch((error)=> {
        dispatch({
            type: SET_CAR_PARK_ERROR,
            payload: error.response.data
        })
    })

}


export const updateCarPark = (newData, user_id,car_park_id) => (dispatch) => {

    setAuthorizationHeader()
    dispatch({ type: LOADING_CAR_PARK_DATA })
    axios.put('users/'+user_id+'/car-park/'+car_park_id, newData)
    .then((res)=>{
        
        dispatch({ type: CLEAR_CAR_PARK_ERROR})
        dispatch({
            type: SET_CAR_PARK_MESSAGE,
            payload: res.data.message
        })

        dispatch(getAllCarParks())

    })
    .catch((error)=> {
        dispatch({
            type: SET_CAR_PARK_ERROR,
            payload: error.response.data
        })
    })

}


export const deleteCarPark = (user_id, car_park_id) => (dispatch) => {
    console.log("del")
    setAuthorizationHeader()
    dispatch({ type: LOADING_CAR_PARK_DATA })
    axios.delete('users/'+parseInt(user_id)+'/car-park/'+parseInt(car_park_id))
    .then((res)=>{
        
        dispatch({ type: CLEAR_CAR_PARK_ERROR})
        dispatch({
            type: SET_CAR_PARK_MESSAGE,
            payload: res.data
        })
        dispatch(getAllCarParks())


    })
    .catch((error)=> {
        dispatch({
            type: SET_CAR_PARK_ERROR,
            payload: error.response.data
        })
    })

}




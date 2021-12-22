
import {
    CLEAR_CAR_PARK_ERROR,
    CLEAR_CAR_PARK_MESSAGE,
    LOADING_CAR_PARK_DATA,
    SET_CAR_PARK_DATA,
    SET_CAR_PARK_ERROR,
    SET_CAR_PARK_MESSAGE,
} from './carPark.types'


const initialState = {
    loading: false,
    data: {},
    errors: null,
    message: null,
  };
export const carParkReducer = (state = initialState, action)=> {

    switch (action.type) {
        case SET_CAR_PARK_DATA:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        
        
        case CLEAR_CAR_PARK_ERROR:
            return {
                ...state,
                error: null,
                loading: false,
            };

        
        
        case LOADING_CAR_PARK_DATA:
            return {
                ...state,
                loading: true,
            };

        
        case SET_CAR_PARK_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case SET_CAR_PARK_MESSAGE:
            return {
                ...state,
                message: action.payload,
                loading: false,
            };
        case CLEAR_CAR_PARK_MESSAGE:
            return {
                ...state,
                message: null,
                loading: false,
            };


        
        default:
            return state;
    }
}
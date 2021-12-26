
import {
    CLEAR_CAR_PARK_ERROR,
    LOADING_CAR_PARK_DATA,
    SET_SEARCH_CAR_PARK_DATA,
    SET_CAR_PARK_ERROR,
} from './search.types'


const initialState = {
    loading: false,
    searchData: {},
    errors: null,
    message: null,
  };
export const searchReducer = (state = initialState, action)=> {

    switch (action.type) {
        case SET_SEARCH_CAR_PARK_DATA:
            return {
                ...state,
                searchData: action.payload,
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

        
        default:
            return state;
    }
}
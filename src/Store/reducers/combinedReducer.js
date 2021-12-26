import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer'
import { carParkReducer } from './carPark/carPark.reducer'
import { searchReducer } from './searchReducer/search.reducer'


export default combineReducers({

    authReducer: authReducer,
    carParkReducer: carParkReducer,
    searchReducer: searchReducer,
});
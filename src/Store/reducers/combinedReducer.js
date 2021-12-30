import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer'
import { carParkReducer } from './carPark/carPark.reducer'


export default combineReducers({

    authReducer: authReducer,
    carParkReducer: carParkReducer,
});
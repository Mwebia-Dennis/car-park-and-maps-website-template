 import React from 'react'
 import Map from '../../Components/Map'
 import { useDispatch,useSelector } from 'react-redux';
 import { getAllCarParks } from '../../Store/reducers/carPark/carPark.actions';
import { CircularProgress } from '@mui/material';
 
 export default function Home(props) {

    const dispatch = useDispatch()
    const carParkState = useSelector((state) => state.carParkReducer)    
    React.useEffect(() => {
        
        dispatch(getAllCarParks())
    }, [])

    return (
        <div style={{width: '100%', height: '100%'}}>
            {
                carParkState.loading?<CircularProgress color="secondary" style={{margin: 10}} />
                :<Map locs = {("data" in carParkState.data)?carParkState.data.data:[]} />
            }
            
        </div>
    )

 }
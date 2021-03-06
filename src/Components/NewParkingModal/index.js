import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { LocalParking } from '@mui/icons-material';
import MainForm from '../Forms/MainForm'
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { setNewCarPark } from '../../Store/reducers/carPark/carPark.actions';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Close } from '@mui/icons-material';
import { CLEAR_CAR_PARK_ERROR, CLEAR_CAR_PARK_MESSAGE } from '../../Store/reducers/carPark/carPark.types';
import { IconButton } from '@mui/material';

export default function NewParkingModal() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const carParkState = useSelector((state) => state.carParkReducer)
  const authState = useSelector((state) => state.authReducer)

  const Fields = [
    
    {
      name: "PARK_NAME",
      label: "PARK_NAME"
  },
  {
      name: "LOCATION_NAME",
      label: "LOCATION_NAME"
  },
  {
      name: "PARK_TYPE_ID",
      label: "PARK_TYPE_ID"
  },
  {
      name: "PARK_TYPE_DESC",
      label: "PARK_TYPE_DESC"
  },
  {
      name: "CAPACITY_OF_PARK",
      label: "CAPACITY_OF_PARK", 
      type: "number",
  },
  {
      name: "WORKING_TIME",
      label: "WORKING_TIME"
  },
  {
      name: "COUNTY_NAME",
      label: "COUNTY_NAME"
  },
  {
      name: "LONGITUDE",
      label: "LONGITUDE", 
      type: "number",
  },
  {
      name: "LATITUDE",
      label: "LATITUDE", 
      type: "number",
  },
  ]

  
  const handleModalClickOpen = () => {
    // e.preventDefault()
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  
  if(carParkState.message) {
    showSnackBar(carParkState.message, 'success');
    dispatch({ type: CLEAR_CAR_PARK_MESSAGE})
}

if(carParkState.error) {
    if("errors" in carParkState.error) {
        for (const key in carParkState.error.errors) {

            showSnackBar(carParkState.error.errors[key]["0"], 'error');
            
        }
    }else if("error" in carParkState.error) {

        showSnackBar(carParkState.error.error, 'error');
    }
    dispatch({ type: CLEAR_CAR_PARK_ERROR})
}
const handleNewData = (data)=>{
    //handle login
    
    if (
        ('park_name' in data) && ('location_name' in data) && ('park_type_id' in data)
        && ('park_type_desc' in data) && ('capacity_of_park' in data) && ('working_time' in data)
        && ('county_name' in data) && ('longitude' in data) && ('latitude' in data)
    ){

        if('id' in authState.data) {
          dispatch(setNewCarPark(data, authState.data.id, navigate))
        }
    }else {
        showSnackBar("All fields are required", "error")
    }

}

function showSnackBar(msg, variant = 'info'){
    enqueueSnackbar(msg, {
        variant: variant,            
        action: (key) => (
            <IconButton style={{color: '#fff'}} size="small" onClick={() => closeSnackbar(key)}>
                <Close />
            </IconButton>
        ),
})}

  return (
    <div>
      <div >
            <ListItem button onClick={handleModalClickOpen} >
              <ListItemIcon>
                <LocalParking />
              </ListItemIcon>
              <ListItemText primary={"New Parking"} />
            </ListItem>
        </div>
      <Dialog open={modalOpen} onClose={handleModalClose} maxWidth={"xs"}>
        <DialogTitle>Add New Parking</DialogTitle>
        <DialogContent>
            <MainForm 
                Fields = {Fields}
                Header = {""}
                SubHeader = {""}
                handleData = {handleNewData}
                loading = {carParkState.loading}

            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

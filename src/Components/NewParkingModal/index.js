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

export default function NewParkingModal() {
  const [modalOpen, setModalOpen] = React.useState(false);

  const Fields = ["PARK_NAME","LOCATION_NAME", "PARK_TYPE_ID", "PARK_TYPE_DESC", "CAPACITY_OF_PARK",
    "WORKING_TIME", "COUNTY_NAME", "LONGITUDE", "LATITUDE"]
  const handleModalClickOpen = () => {
    // e.preventDefault()
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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

            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

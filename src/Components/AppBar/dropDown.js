import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { MapInstance } from '../../util/Constants';
// import { loadModules } from "esri-loader";

export default function DropDown(props){
    
    const { data } = props
    const [display, setDisplay] = useState('none')
    let _display = 'none'

    if(data.length !== 0) {
        _display = 'block'
    }

    const handleClick = (lat, long)=>{
        if(MapInstance.length >0) {
            MapInstance[MapInstance.length -1].goTo([parseFloat(long), parseFloat(lat)])
              .catch(function(error) {
                if (error.name !== "AbortError") {
                   console.error(error);
                }
              })
        }
        _display = 'none'
        setDisplay('none')
    }

    useEffect(() => {
        if(_display !== 'none') {
            setDisplay('block')
        }
    },[_display])

    const style = { 
        width: '100%',  
        bgcolor: 'background.paper',
        position: 'absolute',
        left: 0,
        top: '100%',
        borderRadius: '5px',
        marginTop: .2,
    }
    return (
        <Box sx={style} style={{display: display }}>
            <nav aria-label="Search Results">
                <List>

                {
                    
                    data.map((item, index) =>(

                        <ListItem disablePadding key={index} onClick={()=>handleClick(item['latitude'], item['longitude'])}>
                            <ListItemButton>
                                <ListItemText primary={item['park_name']} />
                            </ListItemButton>
                        </ListItem>
                    ))

                }
                </List>
            </nav>
        </Box>
    )

}

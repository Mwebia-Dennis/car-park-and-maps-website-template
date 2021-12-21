import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

export default function MainForm(props) {

    const [Data, setData] = React.useState({})
    const { Header, SubHeader, Fields, handleData } = props

    const handleChange = (e)=>{
        //key {name}: value {value}
        const data = Data
        data[e.target.name.toLowerCase()] = e.target.value
        setData(data)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        handleData(Data)
        
    }

  return (
    <div>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            onSubmit={handleSubmit}
            autoComplete="off"
        >
            <br/>
            <Typography variant="h4" style={{textAlign: 'center'}}>
                {Header}
            </Typography>
            <Typography variant="subtitle1" component="p" style={{textAlign: 'center'}}>
                {SubHeader}
            </Typography>
            <Grid container >

                {
                    Fields.map((item)=>(

                        <Grid item xs={12} key={item.name}>
                            <TextField
                                required
                                fullwidth="true"
                                size="small"
                                id={item.name}
                                name={item.name}
                                label={item.label.toLowerCase()}
                                // defaultValue={item.label.toLowerCase()}
                                onChange={handleChange}
                            />
                        </Grid> 
                        
                    ))
                }


                <Grid item xs={12} style={{margin: '10px'}}>
                    <Button variant="contained" size="small" type="submit" onClick={handleSubmit} > Submit</Button>
                </Grid> 
                
            </Grid> 
        </Box>
    </div>
  );
}

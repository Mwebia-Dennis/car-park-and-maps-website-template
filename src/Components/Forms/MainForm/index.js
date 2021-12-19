import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

export default function MainForm(props) {

    const { Header, SubHeader, Fields } = props

  return (
    <div>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
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

                        <Grid item xs={12} key={item}>
                            <TextField
                                required
                                fullwidth="true"
                                size="small"
                                id={item}
                                label={item.toLowerCase()}
                                // defaultValue={item.toLowerCase()}
                            />
                        </Grid> 
                        
                    ))
                }


                <Grid item xs={12} style={{margin: '10px'}}>
                    <Button variant="contained" size="small" > Submit</Button>
                </Grid> 
                
            </Grid>
        </Box>
    </div>
  );
}

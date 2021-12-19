import { Box } from '@mui/system'
import { Avatar, Grid, Link, Typography } from '@mui/material';
import React from 'react'
import NotfoundImage from '../../images/404.jpg'

export default function PageNotFound(props) {
    
    return (

        <Box style={{paddingTop: '10%'}}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                >

                    <Grid item xs={12}>
                        <Avatar alt="NotfoundImage" src={NotfoundImage} sx={{ width: 200, height: 200 }} />
                    </Grid>
                    <p />
                    <Grid item xs={12}>
                        <Typography variant="h6">Sorry could not find page</Typography>
                        <p style={{textAlign:'center'}}> <Link href="/">Visit Dashboard</Link> </p>
                    </Grid>   
                
                </Grid> 
            
        </Box>
    )
}
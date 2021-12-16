import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Grid, IconButton, Link, Typography } from '@mui/material';
import { AppName } from '../../util/Constants'
import { useStyles } from './style.js'
import { ArrowBackIosNew, Info, PhoneForwarded, Timeline } from '@mui/icons-material';

export default function TemporaryDrawer(props) {

    const {open, toggleDrawer} = props;
    const classes = useStyles()
    const navList = [
      {
        name: 'Dashboard',
        url: '/',
        icon: <Timeline />
      },
      {
        name: 'About Us',
        url: '/about',
        icon: <Info />
      },
      {
        name: 'Contact',
        url: '/contact',
        icon: <PhoneForwarded />
      }
    ]

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >

        <Grid container className={classes.drawerLogoBox}>

          <Grid item xs="9">
            <Typography 
                variant="h5"
                noWrap
                component="div"
                className={classes.drawerLogo}
            >
              {AppName}
            </Typography>


          </Grid>

          <Grid item="3">

            <IconButton
              color="inherit"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(false)}
            >
              <ArrowBackIosNew />
            </IconButton>

          </Grid>

          

        </Grid>
      <Divider />

      <List>
        {navList.map((item) => (

          <Link href={item.url} key={item.name} className={classes.links}>
            <ListItem button >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
            anchor={"left"}
            open={open}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
    </div>
  );
}

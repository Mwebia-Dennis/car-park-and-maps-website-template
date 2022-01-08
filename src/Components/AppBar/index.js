import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { StyledInputBase,  Search, useStyles } from './style.js'
import Drawer from './drawer'
import { LogoutRounded } from '@mui/icons-material';
import { logOut } from '../../Store/reducers/auth/auth.actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarParks, searchCarParks } from '../../Store/reducers/carPark/carPark.actions.js';
import { CircularProgress } from '@mui/material';



export default function PrimarySearchAppBar() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchState = useSelector((state) => state.carParkReducer)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open)
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = ()=>{
    dispatch(logOut(navigate))
  }

  const handleSearchChange = (e)=>{

    if(e.target.value !== '') {
      setQuery(e.target.value.toLowerCase())
    }else {
      dispatch(getAllCarParks())      
    }

  }

  const handleSearchSubmit = ()=>{

    if(query !== '') {
      dispatch(searchCarParks(query))
    }else {
      dispatch(getAllCarParks())
    }

  }

  const handleKeyUpSearch = (e)=>{
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }
  }


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutRounded />
        </IconButton>
        <p>Çıkış yap</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleLogout}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutRounded />
        </IconButton>
        <p>Çıkış yap</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}
      className={classes.container}
    >
      <AppBar position="static" className={ classes.appBar } >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Search  className={ classes.searchBar } onChange={handleSearchChange} onKeyUp={handleKeyUpSearch} >
            <StyledInputBase
              placeholder="ispark noktası ara.."
              inputProps={{ 'aria-label': 'search' }}
              className={classes.searchInput}
            />
            <IconButton onClick={handleSearchSubmit} size="small" style={{margin: 2,}}  aria-label="search" >
              {
                searchState.loading?<CircularProgress size={23} />:<SearchIcon />
              }
              
            </IconButton>
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} toggleDrawer = { toggleDrawer } />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

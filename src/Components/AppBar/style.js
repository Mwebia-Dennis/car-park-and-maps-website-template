
import { styled, alpha } from '@mui/material/styles';
import {createStyles, makeStyles} from '@mui/styles';
import InputBase from '@mui/material/InputBase';

export const useStyles = makeStyles((theme) => createStyles({

  appBar: {
    backgroundColor: '#fff !important',
    color: '#000 !important',
  }, 
  searchBar: {
    backgroundColor: '#f2f2f2 !important',
    width: '40% !important',

    // [theme.breakpoints.down('sm')]: {
    //   width: '100% !important',
    // },
  },
  
  drawerLogoBox: {
    padding: '12px 0 12px 10px',
    fontWeight: 'bold',
  },
  drawerLogo: {
    padding: '5px 10px',
    fontWeight: 'bold',
  }, 
  links: {
    textDecoration: 'none !important',
    color: '#000 !important'
  }

}))


export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
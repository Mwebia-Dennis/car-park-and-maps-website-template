import React, { useEffect } from 'react'
import {routes} from './Components/routes'
import { useRoutes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { getUserDetails } from './Store/reducers/auth/auth.actions';

const theme = createTheme();
function App() {
  
  
  const dispatch = useDispatch()

  const authReducer = useSelector((state) => state.authReducer)
  axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
  const element = useRoutes(routes(authReducer.authenticated))

  useEffect(() => {
    
    dispatch(getUserDetails())

  }, [])

  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </SnackbarProvider>
  )
}

export default App;

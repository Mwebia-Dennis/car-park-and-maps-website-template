import React from 'react'
import MainForm from '../../Components/Forms/MainForm'
import { useStyles } from '../Login/style';
import { useDispatch,useSelector } from 'react-redux';
import { signUpUser } from '../../Store/reducers/auth/auth.actions';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Close } from '@mui/icons-material';
import { CLEAR_ERROR, CLEAR_MESSAGE } from '../../Store/reducers/auth/auth.types';
import { IconButton } from '@mui/material';

export default function SignUp() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const authState = useSelector((state) => state.authReducer)
    const Fields = [
        
        {
            name: "NAME",
            label: "NAME"
        },
        {
            name: "EMAIL",
            label: "EMAIL"
        },
        {
            name: "PASSWORD",
            label: "PASSWORD"
        },
    ]

    
    if(authState.message) {
        showSnackBar(authState.message, 'success');
        dispatch({ type: CLEAR_MESSAGE})
        navigate('/')
    }
    
    if(authState.error) {
        if("errors" in authState.error) {
            for (const key in authState.error.errors) {

                showSnackBar(authState.error.errors[key]["0"], 'error');
                
            }
        }else if("error" in authState.error) {

            showSnackBar(authState.error.error, 'error');
        }
        dispatch({ type: CLEAR_ERROR})
    }
    const handleSignUp = (data)=>{
        //handle sign up
        
        if (
            ('name' in data) && ('email' in data) && ('password' in data)
        ){
            dispatch(signUpUser(data, navigate))
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
        <div className={classes.container}>
            <MainForm 
                Fields = {Fields}
                Header = {"Become A Member"}
                SubHeader = {"Sign Up to continue"}
                handleData = {handleSignUp}

            />
        </div>
     )
}
import React from 'react'
import MainForm from '../../Components/Forms/MainForm'
import { useStyles } from './style';
import { useDispatch,useSelector } from 'react-redux';
import { loginUser } from '../../Store/reducers/auth/auth.actions';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Close } from '@mui/icons-material';
import { CLEAR_ERROR, CLEAR_MESSAGE } from '../../Store/reducers/auth/auth.types';
import { IconButton, Link, Typography } from '@mui/material';

export default function Login() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const authState = useSelector((state) => state.authReducer)
    const Fields = [
        {
            name: "EMAIL",
            label: "e-posta", 
            type: "email",
        },
        {
            name: "PASSWORD",
            label: "Şifre", 
            type: "password",
        },
    ]

    
    if(authState.message) {
        showSnackBar("başarılı Giriş", 'success');
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
    const handleLogin = (data)=>{
        //handle login
        
        if (
            ('email' in data) && ('password' in data)
        ){
            dispatch(loginUser(data, navigate))
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
                Header = {"tekrar hoşgeldiniz".toUpperCase()}
                SubHeader = {"Devam etmek için giriş yapın"}
                handleData = {handleLogin}
                loading = {authState.loading}
            />

            <div>
                <Typography component="p" style={{textAlign: 'center'}}>Üye değil misin?</Typography>
                <Typography component="p" style={{textAlign: 'center'}}>
                    <Link href="/auth/signup">Kayıt ol</Link>
                </Typography>
            </div>
        </div>
     )
}
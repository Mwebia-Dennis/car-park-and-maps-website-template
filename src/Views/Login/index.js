import React from 'react'
import MainForm from '../../Components/Forms/MainForm'
import { useStyles } from './style';

export default function Login() {

    const classes = useStyles()
    const Fields = [
        "EMAIL", "PASSWORD"
    ]
    
    return ( 
        <div className={classes.container}>
            <MainForm 
                Fields = {Fields}
                Header = {"Welcome Back"}
                SubHeader = {"Login to continue"}

            />
        </div>
     )
}
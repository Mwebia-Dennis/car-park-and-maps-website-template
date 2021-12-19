import React from 'react'
import MainForm from '../../Components/Forms/MainForm'
import { useStyles } from '../Login/style';

export default function SignUp() {

    const classes = useStyles()
    const Fields = [
        "USER_NAME", "EMAIL", "PASSWORD"
    ]
    
    return ( 
        <div className={classes.container}>
            <MainForm 
                Fields = {Fields}
                Header = {"Become A Member"}
                SubHeader = {"Sign Up to continue"}

            />
        </div>
     )
}
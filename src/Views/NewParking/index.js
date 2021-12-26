import React from 'react'
import MainForm from '../../Components/Forms/MainForm'
import { _Fields } from '../../util/Constants'

export default function NewParking() {

    return ( 
        <MainForm 
            Fields = {_Fields}
            Header = {"Add New Parking"}
            SubHeader = {"All fields are required"}

        />
     )
}
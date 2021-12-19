import React from 'react'
import MainForm from '../../Components/Forms/MainForm'

export default function NewParking() {

    const Fields = [
        "PARK_NAME","LOCATION_NAME", "PARK_TYPE_ID", "PARK_TYPE_DESC", "CAPACITY_OF_PARK",
        "WORKING_TIME", "COUNTY_NAME", "LONGITUDE", "LATITUDE"
    ]
    
    return ( 
        <MainForm 
            Fields = {Fields}
            Header = {"Add New Parking"}
            SubHeader = {"All fields are required"}

        />
     )
}
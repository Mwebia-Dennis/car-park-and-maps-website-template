import React from 'react'
import MainForm from '../../Components/Forms/MainForm'

export default function NewParking() {

    const _Fields = [
        {
            name: "PARK_NAME",
            label: "PARK_NAME"
        },
        {
            name: "LOCATION_NAME",
            label: "LOCATION_NAME"
        },
        {
            name: "PARK_TYPE_ID",
            label: "PARK_TYPE_ID"
        },
        {
            name: "PARK_TYPE_DESC",
            label: "PARK_TYPE_DESC"
        },
        {
            name: "CAPACITY_OF_PARK",
            label: "CAPACITY_OF_PARK"
        },
        {
            name: "WORKING_TIME",
            label: "WORKING_TIME"
        },
        {
            name: "COUNTY_NAME",
            label: "COUNTY_NAME"
        },
        {
            name: "LONGITUDE",
            label: "LONGITUDE"
        },
        {
            name: "LATITUDE",
            label: "LATITUDE"
        },
    ]
    return ( 
        <MainForm 
            Fields = {_Fields}
            Header = {"Add New Parking"}
            SubHeader = {"All fields are required"}

        />
     )
}
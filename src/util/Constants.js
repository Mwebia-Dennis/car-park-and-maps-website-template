export const AppName = "Car Park"
export const ApiKey = "AAPKa304e67b63ca459eaa83d08d97a22a30I01gAqMLIyeAkga5g48ytAteYG3E62Cv94ZkxfgCy8V1h8gs-fcF7b6g58yo0RHP"
export const MapInstance = [];// will allow us to access map from a different component

export const _Fields = [
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

const additionalInfo = [
    
    {
        name: "ADDED_BY",
        label: "ADDED_BY"
    },
    {
        name: "CREATED_AT",
        label: "CREATED_AT"
    },
    {
        name: "UPDATED_AT",
        label: "UPDATED_AT"
    },
]

export const translate = (value) => {

    const result = _Fields.filter(item=>item['label'] === value.toUpperCase())
    const result2 = additionalInfo.filter(item=>item['label'] === value.toUpperCase())
    if(result.length > 0) {
        return result[0]['name'].toLowerCase()
    }else if(result2.length > 0) {
        return result2[0]['name'].toLowerCase()
    }else {
        return value
    }

}
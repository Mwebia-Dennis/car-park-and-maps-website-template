export const AppName = "İSPARK A.Ş"
export const ApiKey = "AAPKa304e67b63ca459eaa83d08d97a22a30I01gAqMLIyeAkga5g48ytAteYG3E62Cv94ZkxfgCy8V1h8gs-fcF7b6g58yo0RHP"
export const MapInstance = [];// will allow us to access map from a different component

export const _Fields = [
    {
        name: "PARK_NAME",
        label: "Otopark adı"
    },
    {
        name: "LOCATION_NAME",
        label: "Lokasyon"
    },
    {
        name: "PARK_TYPE_ID",
        label: "İspark ID"
    },
    {
        name: "PARK_TYPE_DESC",
        label: "Açıklama"
    },
    {
        name: "CAPACITY_OF_PARK",
        label: "Otopark Kapasitesi",
        type: "number",
    },
    {
        name: "WORKING_TIME",
        label: "Çalışma saatleri"
    },
    {
        name: "COUNTY_NAME",
        label: "İlçe adı"
    },
    {
        name: "LONGITUDE",
        label: "Enlem",
        type: "number",
    },
    {
        name: "LATITUDE",
        label: "Boylam",
        type: "number",
    },
]

const additionalInfo = [
    
    {
        name: "ADDED_BY",
        label: "Ekleyen"
    },
    {
        name: "CREATED_AT",
        label: "Oluşturulma tarihi"
    },
    {
        name: "UPDATED_AT",
        label: "Güncellendigi tarih"
    },
]

export const getAllFields = ()=>{
    const fields = _Fields.concat(additionalInfo)
    // additionalInfo.forEach((item)=>{fields.push(item)})
    console.log(fields)
    return fields
}

export const translate = (value) => {

    const result = _Fields.filter(item=>item['name'] === value.toUpperCase())
    const result2 = additionalInfo.filter(item=>item['name'] === value.toUpperCase())
    if(result.length > 0) {
        return result[0]['label'].toLowerCase()
    }else if(result2.length > 0) {
        return result2[0]['label'].toLowerCase()
    }else {
        return value
    }

}


export const getTableHeaders = ()=> {
    const headers = _Fields.map(item=>item.label.toLowerCase())
    additionalInfo.forEach(item=>{
        headers.push(item.label.toLowerCase())
    })
   
    return headers
}
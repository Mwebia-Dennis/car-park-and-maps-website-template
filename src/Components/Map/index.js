import React, { useEffect, useRef } from 'react'
import { loadModules } from "esri-loader";
import { ApiKey } from '../../util/Constants';

export default function Map(props) {

    const { locs } = props
    const MapEl = useRef(null)    

    useEffect(() => {
        let view;

        loadModules([
            "esri/config",
            "esri/widgets/Popup",
            "esri/Map",
            "esri/views/MapView",
            "esri/geometry/Point",
            "esri/symbols/WebStyleSymbol",
            "esri/Graphic",
            "esri/PopupTemplate",
            "esri/widgets/Zoom"
        ], {
            css: true
        }).then(
            ([
                esriConfig,
                Popup,
                ArcGISMap,
                MapView,
                Point,
                WebStyleSymbol,
                Graphic,
                PopupTemplate,
                Zoom
            ]) => {

                esriConfig.apiKey = ApiKey
                const map = new ArcGISMap({
                    basemap: "osm-streets",
                })


                let view = new MapView({
                    container: MapEl.current,
                    map: map,
                    center: [28.9778, 41.0079],
                    zoom: 13,
                    ui: {
                        components: [ "attribution" ] //hide the default zoom slider
                    }
                })

                let zoom = new Zoom({
                    view: view
                });

                view.ui.add(zoom, {
                    'position': 'bottom-right'
                })

                for (let i = 0; i < locs.length; i++) {
                    
                    const point = new Point(parseFloat(locs[i]["longitude"]), parseFloat(locs[i]["latitude"]))
        
                    const symbol = {
                        type: 'simple-marker',
                        color : "red",
                        outline: {
                            color: "white", // white
                            width: 1
                        }
                    }
                    // const symbol = new WebStyleSymbol({
                    //     name: "parking",
                    //     styleName: "Esri2DPointSymbolsStyle"
                    //   });
            
                    const attributes = {
                        Name: locs[i]['park_name'], // The name of the
                        id: locs[i]['park_name'], // The name of the
                        Location: locs[i]['location_name'] // The owner of the
                    };
                    
                    // const EditAction = {
                    //     title: "Edit",
                    //     id: "edit-btn",
                    //     className: 'esri-icon-edit'
                    // }
                    const DeleteAction = {
                        title: "Delete",
                        id: "delete-btn",
                        className: "esri-icon-trash"
                    }
                    // Create popup template
                    let popupContent = "<table>"
                    for (let key in locs[i]) {
                        if (locs[i].hasOwnProperty(key)) {
                            if(key !== 'id' && key !== 'user_id') {
                                if(key === 'added_by'){
                                    popupContent += "<tr><td><strong>"+key+"</strong></td><td> "+locs[i][key]['name'] +"</td></tr>"
                                }else if (key === 'created_at' || key === 'updated_at') {
                                    popupContent += "<tr><td><strong>"+key+"</strong></td><td> "+new Date(locs[i][key]).toString() +"</td></tr>"
                                }else {
                                    popupContent += "<tr><td><strong>"+key+"</strong></td><td> "+locs[i][key] +"</td></tr>"
                                }
                            }
                        }
                    }
                    const popupTemplate = new PopupTemplate({
                        title: "{Name}",
                        content: popupContent + "</table>",
                        actions: [DeleteAction]
                    });
                    
            
                    // view.popup = popup;
            
                    const graphic = new Graphic({
                        geometry: point,
                        symbol: symbol,
                        attributes: attributes,
                        popupTemplate: popupTemplate
                    });
                    
                    view.popup.autoOpenEnabled = false;
                    view.popup.collapseEnabled = false;
                    
                    view.popup.on("trigger-action", function(event){
                        if(event.action.id === "edit-btn"){
                            console.log("edit-btn")
                        }else if(event.action.id === "delete-btn"){
                            console.log("delete-btn")
                        }
                    });

            
                    view.popup.autoOpenEnabled = true;
                    view.graphics.add(graphic);
            
                }
                

            }
        )
        return () => {
            if (!!view) {
                view.destroy()
                view = null
            }  
        }
    })

    return (
        <div style={{width: '100%', height: '100vh'}} ref={MapEl} />
    )
}
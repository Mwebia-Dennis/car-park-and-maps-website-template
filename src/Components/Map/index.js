import React, { useEffect, useRef } from 'react'
import { loadModules } from "esri-loader";
import { ApiKey } from '../../util/Constants';

export default function Map(props) {

    const { locs } = props
    const MapEl = useRef(null)    

    useEffect(() => {
        let view;

        console.log(locs)
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
        
                    let symbol = {
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
            
                    var attributes = {
                        Name: "My point", // The name of the
                        Location: " Point Dume State Beach" // The owner of the
                    };
                    // Create popup template
                    var popupTemplate = new PopupTemplate({
                        title: "{Name}",
                        content: [
                            {
                            type: "fields",
                            fieldInfos: [
                                {
                                fieldName: "B12001_calc_pctMarriedE",
                                label: "Married %"
                                },
                                {
                                fieldName: "B12001_calc_numMarriedE",
                                label: "People Married",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                                }
                            ]
                            }
                        ]
                    });
            
                    const graphic = new Graphic({
                        geometry: point,
                        symbol: symbol,
                        attributes: attributes,
                        popupTemplate: popupTemplate
                    });
            
                    view.popup.autoOpenEnabled = false;
                    view.on("click", function(event) {
                        // Get the coordinates of the click on the view
                        // let lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
                        // let lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
                        const popup = new Popup({
                            title:
                            "<div><img src='https://www.w3schools.com/images/w3schools_green.jpg' height='15px' width='15px' align='center'/> point</div>",
                            location: event.mapPoint,
                            content:
                            "<p> name: "+
                            locs[i]["location_name"]+
                            "</p> <p> latitude: " +
                            event.mapPoint.latitude.toFixed(12) +
                            " </p> <p> lognitude " +
                            event.mapPoint.longitude.toFixed(12) +
                            "</p>" ,
                            dockOptions: {
                                buttonEnabled: false
                            }
                        });

                        const EditAction = {
                            title: "Edit",
                            id: "edit-btn",
                            className: 'esri-icon-edit'
                        }
                        const DeleteAction = {
                            title: "Delete",
                            id: "delete-btn",
                            className: "esri-icon-trash"
                        }
                
                        view.popup = popup;
                        view.popup.viewModel.actions.push(EditAction)
                        view.popup.viewModel.actions.push(DeleteAction)
                        view.popup.collapseEnabled = false;
                        
                        view.popup.on("trigger-action", function(event){
                            if(event.action.id === "edit-btn"){
                                console.log("edit-btn")
                            }else if(event.action.id === "delete-btn"){
                                console.log("delete-btn")
                            }
                        });
                        view.popup.open();
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
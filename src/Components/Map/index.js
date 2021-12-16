import React, { useEffect, useRef } from 'react'
import { loadModules } from "esri-loader";
import { ApiKey } from '../../util/Constants';

export default function Map(props) {

    const MapEl = useRef(null)
    const locs = [
        "-1.0850, 36.8259", "-1.0920, 36.9279", "-1.0903, 36.6239",
        "-1.1903, 36.6239", "1.1906, 36.6239", "-1.2593, 36.6239",
        "-1.0650, 36.8459", "-2.0920, 36.9279", "-1.2213, 36.7312",
        "-1.1203, 36.6730", "1.3006, 36.8939", "-2.0, 35.0000"
    ]
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
            "esri/PopupTemplate"
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
                PopupTemplate
            ]) => {

                esriConfig.apiKey = ApiKey
                const map = new ArcGISMap({
                    basemap: "osm-streets"
                })

                let view = new MapView({
                    container: MapEl.current,
                    map: map,
                    center: [36.8259, -1.0850],
                    zoom: 9
                })

                for (let i = 0; i < locs.length; i++) {
                    
                    const point = new Point(parseFloat(locs[i].split(",")[1]), parseFloat(locs[i].split(",")[0]))
        
                    // let symbol = {
                    //     type: 'simple-marker',
                    //     color : [255, 0,0],
                    //     outline: {
                    //         color: [255, 255, 255], // white
                    //         width: 1
                    //     }
                    // }
                    const symbol = new WebStyleSymbol({
                        name: "parking",
                        styleName: "Esri2DPointSymbolsStyle"
                      });
            
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
                            "<p> latitude: " +
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
        <div style={{width: '100%', height: '550px'}} ref={MapEl} />
    )
}
import React, {useEffect, useRef} from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import CircleStyle from "ol/style/Circle";
import {Fill, Stroke, Style} from "ol/style";
import {Feature} from "ol";
import {Point} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Overlay from "ol/Overlay";
import {useSelector} from "react-redux";
import {getAccident, getColorByPriority, getPriority} from "../utils/getName";
import {useParams} from "react-router-dom";

const MapPage = (props) => {
    const mapRef = useRef(null);
    const {statements} = useSelector(state => state.statement)
    const param = useParams()
    console.log(param)

    useEffect(() => {
        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([param.x || 39.7198, param.y || 47.2357]),
                zoom: param.zoom || 12,
            }),
        });

        statements.map(({priority, location, accidentType, phoneNumber, applicant, address}) => {
            if (location == null) return null;
            const markerStyle = new Style({
                image: new CircleStyle({
                    radius: 8,
                    fill: new Fill({color: getColorByPriority(priority)}),
                    stroke: new Stroke({
                        color: '#fff',
                        width: 2,
                    }),
                }),
            });

            const markerFeature = new Feature({
                geometry: new Point(fromLonLat([location[0], location[1]])),
            });

            markerFeature.setStyle(markerStyle);
            markerFeature.set('accident', accidentType);
            markerFeature.set('priority', priority);
            markerFeature.set('phoneNumber', phoneNumber);
            markerFeature.set('applicant', applicant);
            markerFeature.set('address', address);

            map.addLayer(new VectorLayer({source: new VectorSource({features: [markerFeature]})}));

            return markerFeature;
        });

        const overlay = new Overlay({
            element: document.getElementById("marker"),
        });
        map.addOverlay(overlay);

        const addressElem = document.getElementById("address");
        const nameElem = document.getElementById("name");
        const avariaElem = document.getElementById("avaria");
        const phoneElem = document.getElementById("phone");
        const priorityElem = document.getElementById("priority");

        map.on('pointermove', (e) => {
            overlay.setPosition(undefined);
            map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
                let clickCoordinate = e.coordinate;
                let accidentName = getAccident(feature.get('accident'));
                let priorityName = getPriority(feature.get('priority'));

                overlay.setPosition(clickCoordinate);

                addressElem.textContent = feature.get("address") || "Не указан";
                nameElem.textContent = feature.get("applicant") || "Не указан";
                avariaElem.textContent = accidentName || "Не указан";
                phoneElem.textContent = feature.get("phoneNumber") || "Не указан";
                priorityElem.textContent = priorityName;
            })
        })

        return () => {
            map.setTarget(null);
        };
    }, []);

    var domDivElement = document.createElement('div');

    return (
        <>
            <div ref={mapRef} className="map"/>

            <div >
                <div
                    id="marker"
                    title="Marker"
                    className="marker"
                    style={{

                    }}
                >
                    <div className="marker__info">
                        <div>Адрес: </div>
                        <p id="address">  </p>
                    </div>
                    <div className="marker__info">
                        <div>Заявитель: </div>
                        <p id="name">  </p>
                    </div>
                    <div className="marker__info">
                        <div>Тип Аварии: </div>
                        <p id="avaria">  </p>
                    </div>
                    <div className="marker__info">
                        <div>Приоритет: </div>
                        <p id="priority">  </p>
                    </div>
                    <div className="marker__info">
                        <div>Номер телефона: </div>
                        <p id="phone">  </p>
                    </div>
                </div>
            </div>
        </>
    );
};


export default MapPage;
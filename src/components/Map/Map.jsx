import React from 'react'
import { render } from 'react-dom'
import { Map, TileLayer, Marker } from 'react-leaflet'

const position = [51.505, -0.09]

const ForecastMap = ({lat = 51.505, long = -0.09, className}) => {
    const position = [lat, long];
    return (
        <div className={className}>
            <Map center={position} zoom={10}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
                <Marker position={position}></Marker>
            </Map>
        </div>
    );
};

export default ForecastMap;
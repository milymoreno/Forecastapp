import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { withRouter } from "react-router-dom";
import Layout from "./Layout";
import ForecastMap from "../components/Map/Map";

const LastChecked = () => { 
    const [data, setData] = useState({
        name: "",
        main:{
            temp: "",
            pressure: "",
            temp_max: "",
            temp_min: "",
        },
        coord:{
            lat: 51.505,
            lon: -0.09
        }
    });
    const initialList = JSON.parse(window.localStorage.getItem('cachedList')) || [];
    const[cachedList, setCachedList] = useState(initialList);

    const getMinsFromLastUpdate = ( lastTime ) => {
        console.log((Date.now() - lastTime));
        return lastTime ? "Last update " + Math.floor((Date.now() - lastTime) / 60000) + " mins" : "";
    };

    useEffect(() => {
    }, [])
    
    return (
        <div className="card-group">
        {cachedList.length > 0 ? cachedList.map((val,idx)=>{
            return (
                <div key={`id${idx}`} className="card">
                    <div className="card-body">
                        <h4 className="card-title">{`City: ${val.name}`}</h4>
                        <p className="card-text">
                            <b>Temperature: </b>{val.main.temp} <br />
                            <b>Pressure: </b>{val.main.pressure} <br />
                            <b>Humidity: </b>{val.main.humidity} <br />
                            <b>Max temperature: </b>{val.main.temp_max} <br />
                            <b>Min temperature: </b>{val.main.temp_min} <br />
                            <b>Lat: </b>{val.coord.lat} <br />
                            <b>Long: </b>{val.coord.lon} <br />
                            <small>{getMinsFromLastUpdate(val.lastUpdate)}</small>
                        </p>
                    </div>
                </div>
            );
        }) : <div className="col-md-12 text-center"><h4>Nothing to show...</h4></div>}
        </div>
    );
};

export default LastChecked;
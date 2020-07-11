import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { withRouter } from "react-router-dom";
import Layout from "./Layout";
import ForecastMap from "../components/Map/Map";
import { getForecastByCityId } from "../services/Forecast.service"; 
import "../css/detail.css";

const Detail = ({history}) => { 
    const [layoutParams, setLayoutParams] = useState({
        title: "Cargando...",
        description: ""
    });
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
    let {id} = useParams();

    const showDetail = () => {
        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{`City: ${data.name}`}</h4>
                    <p className="card-text">
                        <b>Temperature: </b>{data.main.temp} <br />
                        <b>Pressure: </b>{data.main.pressure} <br />
                        <b>Humidity: </b>{data.main.humidity} <br />
                        <b>Max temperature: </b>{data.main.temp_max} <br />
                        <b>Min temperature: </b>{data.main.temp_min} <br />
                        <b>Lat: </b>{data.coord.lat} <br />
                        <b>Long: </b>{data.coord.lon} <br />
                    </p>
                </div>
            </div>
        );
    };

    const onUrlChange = (location) =>  {
        if(location.pathname.split('/')[2]){
            getForecastByCityId(location.pathname.split('/')[2])
            .then( res => {
                setData(res);
                setLayoutParams({title: res.name, description: "Weather updated" });
                cacheWeather(res);
            });
        }
    };

    const cacheWeather = (data) => {
        data.lastUpdate = Date.now();
        if( data.id && !cachedList.find( o=>o.id == data.id ) ) {
            if( cachedList.length < 5 ){
                cachedList.push(data);
                setCachedList(cachedList);
                window.localStorage.setItem('cachedList', JSON.stringify(cachedList));
            }
            else {
                cachedList.shift();
                cachedList.push(data);
                setCachedList(cachedList);
                window.localStorage.setItem('cachedList', JSON.stringify(cachedList));
            }
        }
        else if( data.id ) {
            cachedList.splice(cachedList.findIndex((o) => o.id == data.id), 1, data);
            setCachedList(cachedList);
            window.localStorage.setItem('cachedList', JSON.stringify(cachedList));
        }
    };

    useEffect(() => {
        history.listen((location) => { onUrlChange(location) });
        getForecastByCityId(id)
        .then( res => {
            setData(res);
            setLayoutParams({title: res.name, description: "Weather updated" });
            cacheWeather(res);
        })
        .catch( err => {
            console.log(err);
            let cached = cachedList.find( o=>o.id == data.id );
            if( cached ){
                setData(cached);
                setLayoutParams({title: cached.name, description: "Weather updated" });
            }
        });
    }, [])
    
    return (
        <Layout title={layoutParams["title"]} description={layoutParams["description"]} className="description-container">
            {showDetail()}
            <ForecastMap className="forecastMap-container" long={data.coord.lon} lat={data.coord.lat} />
        </Layout>
    );
};

export default withRouter(Detail);
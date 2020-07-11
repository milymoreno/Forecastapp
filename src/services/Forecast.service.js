import { FORECAST_API, FORECAST_API_KEY } from '../config';
import data from "../data/city.list.json";

export const getForecastByCityId = id => {
    return fetch( `${FORECAST_API + id + FORECAST_API_KEY}`, {
        method: "GET",
        //headers: { Accept: "application/json", "Content-Type": "application/json" }
    })
    .then( response => response.json() )
    .catch( err => { return { error: err.toString() }; } );
};

export const getCities = data.map( o => o );
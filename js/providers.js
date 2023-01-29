'use strict'

import { config } from './config';

const ipInfoGeolocation = () => {
    return fetch(`https://ipinfo.io/?token=${config.ipInfo}`)
        .then( response => {
            if(response.ok) {
                return response.json();
            }

            throw new Error(response.status.toString());
        })
        .then(data => {
            return new Promise(resolve => resolve(data));
        })
}

const openStreetMapForwardGeocoding = input => {
    return fetch(`https://nominatim.openstreetmap.org?format=json&limit=1&addressdetails=1&q=${input}&accept-language=${config.lang}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error(response.statusText);
        })
        .then(data => {
            if(!data.length) {
                throw new Error('NO_DATA');
            }

            return new Promise(resolve => resolve(data));
        })
}

const openStreetMapReverseGeocoding = (latitude, longitude) => {
    return fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${config.lang}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error.toString())
            }

            return new Promise(resolve => resolve(data));
        })
}

const openWeatherMapGetData = (latitude, longitude) => {
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?&lat=${latitude}&lon=${longitude}&appid=${config.openWeatherMap}&units=${config.units}&lang=${config.lang}&exclude=minutely,alerts`)
        .then( response => {
            if(response.ok) {
                return response.json();
            }

            throw new Error(response.statusText);
        })
        .then(data => {
            return new Promise(resolve => resolve(data));
        })
}

export {
    ipInfoGeolocation,
    openStreetMapForwardGeocoding,
    openStreetMapReverseGeocoding,
    openWeatherMapGetData
};

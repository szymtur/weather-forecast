'use strict';

import { config } from './config.js';
import { ERROR } from './consts.js';

const { openWeatherMap, ipInfo, lang, unitSystem } = config;


const ipInfoGeolocation = () => {
    return fetch(`https://ipinfo.io/?token=${ipInfo}`)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.status.toString());
            }

            return response.json();
        });
};

const openStreetMapForwardGeocoding = input => {
    return fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${input}&accept-language=${lang}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(ERROR.badRequest);
            }

            return response.json();
        })
        .then(data => {
            if(!data.length) {
                throw new Error(ERROR.noData);
            }

            return data;
        });
};

const openStreetMapReverseGeocoding = (latitude, longitude) => {
    return fetch(`https://nominatim.openstreetmap.org/reverse?format=json&zoom=14&lat=${latitude}&lon=${longitude}&accept-language=${lang}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(ERROR.badRequest);
            }

            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error.toString());
            }

            return data;
        });
};

const openWeatherMapGetData = (latitude, longitude) => {
    return fetch(`https://api.openweathermap.org/data/3.0/onecall?&lat=${latitude}&lon=${longitude}&appid=${openWeatherMap}&units=${unitSystem}&lang=${lang}&exclude=minutely,alerts`)
        .then( response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json();
        });
};

export {
    ipInfoGeolocation,
    openStreetMapForwardGeocoding,
    openStreetMapReverseGeocoding,
    openWeatherMapGetData
};

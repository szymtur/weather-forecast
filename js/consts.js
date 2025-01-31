'use strict';

const BUTTON = {
    nextDaysForecast: 'next days forecast',
    currentDayForecast: 'current forecast'
};

const ERROR = {
    badRequest: 'BAD_REQUEST',
    noData: 'NO_DATA',
    unableToGeocode: 'UNABLE_TO_GEOCODE'
};

const MESSAGE = {
    loadingData: 'loading data...',
    enterManually: 'enter your location manually',
    wrongCityName: 'wrong city name',
    connectionError: 'connection error'
};

const UNIT_SYSTEM = {
    metric: 'metric',
    imperial: 'imperial',
    scientific: 'scientific'
};

const WEATHER_UNITS = {
    metric: {
        temperature: '\u00b0C',
        pressure: 'hPa',
        humidity: '%',
        wind: 'km/h'
    },
    imperial: {
        temperature: '\u00b0F',
        pressure: 'hPa',
        humidity: '%',
        wind: 'mph'
    },
    scientific: {
        temperature: '\u00b0K',
        pressure: 'hPa',
        humidity: '%',
        wind: 'm/s'
    }
};


export {
    BUTTON,
    ERROR,
    MESSAGE,
    UNIT_SYSTEM,
    WEATHER_UNITS
};

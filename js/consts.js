'use strict';

const BUTTON = {
    nextDaysForecast: 'next days forecast',
    currentDayForecast: 'current forecast'
};

const ERROR = {
    badRequest: 'BAD_REQUEST',
    noData: 'NO_DATA',
    unableToGeocode: 'UNABLE_TO_GEOCODE',
    unableToGeolocation: 'UNABLE_TO_GEOLOCATION'
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

const WEATHER_ICON_MAP = {
    '01d': { className: 'wi wi-day-sunny', code: '\uf00d' },
    '01n': { className: 'wi wi-night-clear', code: '\uf02e' },
    '02d': { className: 'wi wi-day-cloudy', code: '\uf002' },
    '02n': { className: 'wi wi-night-cloudy', code: '\uf031' },
    '03d': { className: 'wi wi-day-cloudy', code: '\uf002' },
    '03n': { className: 'wi wi-night-cloudy', code: '\uf031' },
    '04d': { className: 'wi wi-day-cloudy', code: '\uf002' },
    '04n': { className: 'wi wi-night-cloudy-high', code: '\uf080' },
    '09d': { className: 'wi wi-day-showers', code: '\uf009' },
    '09n': { className: 'wi wi-night-showers', code: '\uf037' },
    '10d': { className: 'wi wi-day-rain', code: '\uf008' },
    '10n': { className: 'wi wi-night-rain', code: '\uf036' },
    '11d': { className: 'wi wi-day-thunderstorm', code: '\uf010' },
    '11n': { className: 'wi wi-night-thunderstorm', code: '\uf03b' },
    '13d': { className: 'wi wi-day-snow', code: '\uf00a' },
    '13n': { className: 'wi wi-night-snow', code: '\uf038' },
    '50d': { className: 'wi wi-day-fog', code: '\uf003' },
    '50n': { className: 'wi wi-night-fog', code: '\uf04a' }
};


export {
    BUTTON,
    ERROR,
    MESSAGE,
    UNIT_SYSTEM,
    WEATHER_UNITS,
    WEATHER_ICON_MAP
};

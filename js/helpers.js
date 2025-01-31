'use strict';

import { UNIT_SYSTEM } from './consts.js';


const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.substring(1);

const appendLeadingZero = (number) => (number.toString().length < 2 ? `0${number}` : number.toString());

const timestampToDate = (timestamp, offset) => {
    // timestamp - seconds
    // offset - seconds

    const dateTime = new Date((timestamp + offset) * 1000).toISOString();

    return {
        time: `${dateTime.slice(11, 16)}`,
        date: `${dateTime.slice(0,10).split('-').reverse().join('-')}`,
        timezone: (offset > 0 ? `(GMT+${offset/3600})` : `(GMT${offset/3600})`)
    };
};

const prepareChartData = (hourlyData, timezoneOffset) => {
    const chartData = { time: [], temperature: [], pressure: [] };

    hourlyData.forEach((hourData) => {
        chartData.time.push(timestampToDate(hourData.dt, timezoneOffset).time);
        chartData.temperature.push(hourData.temp);
        chartData.pressure.push(hourData.pressure);
    });

    return chartData;
};

const speedRecalculate = (unitSystem, value) => {
    return unitSystem === (UNIT_SYSTEM.metric ? Math.round(Number(value) * 3.6) : Number(value).toFixed(2));
};

const placeNameChooser = (address) => {
    const placeAndAreaNames = [
        'building',
        'public_building',
        'museum',
        'theatre',
        'arts_centre',
        'cinema',
        'castle',
        'attraction',
        'industrial',
        'hotel',
        'mall',
        'stadium',
        'station',
        'address29',
        'golf_course',
        'park',
        'zoo',
        'peak',
        'river',
        'pedestrian',
        'quarter',
        'neighbourhood',
        'suburb',
        'district',
        'city_district'
    ];

    const cityNames = [
        'island',
        'croft',
        'hamlet',
        'village',
        'city',
        'town',
        'municipality',
        'county',
        'locality',
        'local_administrative_area',
        'administrative',
        'state',
        'province',
        'country',
        'country_name'
    ];

    const placeName = placeAndAreaNames.map(key => address[key]).find(Boolean);
    const cityName = cityNames.map(key => address[key]).find(Boolean);

    return [...new Set([placeName, cityName])].join(' ');
};

export {
    capitalizeFirstLetter,
    appendLeadingZero,
    timestampToDate,
    prepareChartData,
    placeNameChooser,
    speedRecalculate
};

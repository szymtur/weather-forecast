'use strict';

import { UNIT, WEATHER } from './consts.js'


const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.substring(1);

const appendLeadingZero = number => {
    if (number.toString().length < 2) {
        return `0${number}`;
    }

    return number.toString();
}

const timestampToDate = (timestamp, offset) => {
    // timestamp - seconds
    // offset - seconds

    const dateTime = new Date((timestamp + offset) * 1000).toISOString();

    return {
        time: `${dateTime.substr(11,5)}`,
        date: `${dateTime.slice(0,10).split('-').reverse().join('-')}`,
        timezone: offset > 0 ? `(GMT+${offset/3600})` : `(GMT${offset/3600})`
    };
}

const prepareChartData = (hourlyData, timezoneOffset) => {
    const chartData = { time: [], temperature: [], pressure: [] };

    hourlyData.forEach( hourData => {
        chartData.time.push(timestampToDate(hourData.dt, timezoneOffset).time);
        chartData.temperature.push(hourData.temp);
        chartData.pressure.push(hourData.pressure);
    })

    return chartData;
}

const unitsChanger = (unitsSystem, category, value) => {
    if (unitsSystem === UNIT.metric) {
        if (category === WEATHER.temperature) {
            return `${Math.round(value)} \u00b0C`;
        }

        if (category === WEATHER.wind) {
            return `${Math.round(Number(value) * 3.6)} km/h`;
        }

        if (category === WEATHER.pressure) {
            return `${Math.round(value)} hPa`;
        }

        if (category === WEATHER.humidity) {
            return `${Math.round(value * 100) / 100} %`;
        }

        return { temperature: '\u00b0C', pressure: 'hPa' };
    }

    if (unitsSystem === UNIT.imperial) {
        if (category === WEATHER.temperature) {
            return `${Math.round(value)} \u00b0F`;
        }

        if (category === WEATHER.wind) {
            return `${Number(value).toFixed(2)} mph`;
        }

        if (category === WEATHER.pressure) {
            return `${Math.round(value)} hPa`;
        }

        if (category === WEATHER.humidity) {
            return `${Math.round(value * 100) / 100} %`;
        }

        return { temperature: '\u00b0F', pressure: 'hPa' };
    }

    if (unitsSystem === UNIT.scientific) {
        if (category === WEATHER.temperature) {
            return `${Math.round(value)} \u00b0K`;
        }

        if (category === WEATHER.wind) {
            return `${Number(value).toFixed(2)} m/s`;
        }

        if (category === WEATHER.pressure) {
            return `${Math.round(value)} hPa`;
        }

        if (category === WEATHER.humidity) {
            return `${Math.round(value * 100) / 100} %`;
        }

        return { temperature: '\u00b0K', pressure: 'hPa' };
    }
}

const placeNameChooser = (data) => {
    const placeAndAreaNames = [
        data['address']['building'],
        data['address']['public_building'],
        data['address']['museum'],
        data['address']['theatre'],
        data['address']['arts_centre'],
        data['address']['cinema'],
        data['address']['castle'],
        data['address']['attraction'],
        data['address']['industrial'],
        data['address']['hotel'],
        data['address']['mall'],
        data['address']['stadium'],
        data['address']['station'],
        data['address']['address29'],
        data['address']['golf_course'],
        data['address']['park'],
        data['address']['zoo'],
        data['address']['peak'],
        data['address']['river'],
        data['address']['pedestrian'],
        data['address']['quarter'],
        data['address']['neighbourhood'],
        data['address']['suburb'],
        data['address']['district'],
        data['address']['city_district']
    ];

    const cityNames = [
        data['address']['island'],
        data['address']['croft'],
        data['address']['hamlet'],
        data['address']['village'],
        data['address']['city'],
        data['address']['town'],
        data['address']['municipality'],
        data['address']['county'],
        data['address']['locality'],
        data['address']['local_administrative_area'],
        data['address']['state'],
        data['address']['province'],
        data['address']['country'],
        data['address']['country_name']
    ];

    const resultArray = [];
    const romanNumeral = new RegExp('^(?:M*(?:LD|LM|CM|CD|D?C{0,3})(?:VL|VC|XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3}))$', 'i');

    for (let i=0; i<placeAndAreaNames.length; i++) {
        if (placeAndAreaNames[i] && !romanNumeral.test(placeAndAreaNames[i])) {
            resultArray.push(placeAndAreaNames[i]);
            break;
        }
    }

    for (let i=0; i<cityNames.length; i++) {
        if (cityNames[i]) {
            resultArray.push(cityNames[i]);
            break;
        }
    }

    if (!resultArray[0].indexOf(resultArray[resultArray.length-1])) {
        return resultArray[0];
    }

    return resultArray.join(' ');
}

export {
    capitalizeFirstLetter,
    appendLeadingZero,
    timestampToDate,
    prepareChartData,
    unitsChanger,
    placeNameChooser
};

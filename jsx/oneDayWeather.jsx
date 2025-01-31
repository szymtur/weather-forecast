'use strict';

import React from 'react';
import CurrentIcon from './currentIcon.jsx';

import { WEATHER_UNITS } from "../js/consts";

class OneDayWeather extends React.Component {
    render() {
        const { date, temp, pressure, humidity, wind, description, icon, id } = this.props.nextDay;
        const { temperature: tempUnit, pressure: pressureUnit, humidity: humidityUnit, wind: windUnit } = WEATHER_UNITS[this.props.unitSystem];

        return (
            <div className='day-container'>
                <div className='row date'>
                    <h5>{date.date}</h5>
                </div>
                <div className='row icon'>
                    <CurrentIcon icon={icon} id={id}/>
                </div>
                <div className='row description'>
                    <h6>{description}</h6>
                </div>
                <div className='row weather-data'>
                    <div className='row'>
                        <p><i className='wi wi-thermometer'/></p><h5>{temp} {tempUnit}</h5>
                    </div>
                    <div className='row'>
                        <p><i className='wi wi-barometer'/></p><h5>{pressure} {pressureUnit}</h5>
                    </div>
                    <div className='row'>
                        <p><i className='wi wi-humidity'/></p><h5>{humidity} {humidityUnit}</h5>
                    </div>
                    <div className='row'>
                        <p><i className='wi wi-strong-wind'/></p><h5>{wind} {windUnit}</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default OneDayWeather;

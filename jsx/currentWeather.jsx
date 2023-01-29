'use strict';

import React from 'react';

import CurrentIcon from './currentIcon.jsx';
import MainPreloader from './mainPreloader.jsx';

class CurrentWeather extends React.Component {

    render() {
        const { temp, temp_app, pressure, humidity, wind, description, icon, id } = this.props.currentDay;
        const { time, date, timezone } = this.props.localTime;
        const { city, country } = this.props.location;

        if(!this.props.displayComponent) {
            return (
                <MainPreloader
                    preloaderInfo = {this.props.preloaderInfo}
                    preloaderAlert = {this.props.preloaderAlert}
                />
            )
        }

        return (
            <div className = 'current-weather'>
                <div className = 'local-info'>
                    <div className = 'city'>
                        <h3 style = {{ fontSize: String(city).length >= 20 ? '1em' : null }}>
                            {city} {country}
                        </h3>
                    </div>
                    <div className='date-time'>
                        <h6>{date} {timezone} {time}</h6>
                    </div>
                </div>

                <div className = 'left-col'>
                    <div className='left-rows'>
                        <p><i className='wi wi-thermometer'/></p><h3>{temp}<span> / {temp_app}</span></h3>
                    </div>
                    <div className='left-rows'>
                        <p><i className='wi wi-barometer'/></p><h3>{pressure}</h3>
                    </div>
                    <div className='left-rows'>
                        <p><i className='wi wi-humidity'/></p><h3>{humidity}</h3>
                    </div>
                    <div className='left-rows'>
                        <p><i className='wi wi-strong-wind'/></p><h3>{wind}</h3>
                    </div>
                </div>

                <div className = 'right-col'>
                    <div className = 'col-60'>
                        <h5>{description}</h5>
                    </div>
                    <div className = 'col-40'>
                        <CurrentIcon icon={icon} id={id}/>
                    </div>
                    <div className='right-bottom'>
                        <button onClick={this.props.displayNextDays}>
                            {this.props.buttonText}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CurrentWeather;

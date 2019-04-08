import React from 'react';
import CurrentIcon from './currentIcon.jsx';

class OneDayWeather extends React.Component {

    render() {
        //Destructuring object with weather data
        const {date, temp, pressure, humidity, wind, description, icon, id} = this.props.nextDay;

        return (
            <div className="day-container">
                <div className="row date">
                    <h5>{date}</h5>
                </div>
                <div className="row icon">
                    <CurrentIcon icon={icon} id={id}/> 
                </div>
                <div className="row description">
                    <h6>{description}</h6>
                </div>
                <div className="row">
                    <p><i className="wi wi-thermometer"></i></p><h5>{temp}</h5>
                </div>
                <div className="row">
                    <p><i className="wi wi-barometer"></i></p><h5>{pressure}</h5>
                </div>
                <div className="row">
                    <p><i className="wi wi-humidity"></i></p><h5>{humidity}</h5>
                </div>
                <div className="row">
                    <p><i className="wi wi-strong-wind"></i></p><h5>{wind}</h5>
                </div>
            </div>
        )
    }
}

export default OneDayWeather;
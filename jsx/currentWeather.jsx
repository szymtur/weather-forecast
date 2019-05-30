import React from 'react';
import CurrentIcon from './currentIcon.jsx';
import MainPreloader from './mainPreloader.jsx';
import DotsPreloader from './dotsPreloader.jsx';

class CurrentWeather extends React.Component {

    render() {
        /* Destructuring object with weather data */
        const {temp, pressure, humidity, wind, description, icon, id} = this.props.currentDay;
        const {time, date, gmt} = this.props.localTime;
        const {city, country} = this.props.location;

        const dotsPreloader = ( 
            <DotsPreloader /> 
        )

        const localTime = (
            <div className="date-time">
                <h6>{date} {gmt} {time}</h6>
            </div>
        )

        if(!this.props.displayComponent) {
            return (
                <MainPreloader
                    preloaderInfo = {this.props.preloaderInfo}
                    preloaderAlert = {this.props.preloaderAlert}
                />
            )
        }
        else {
            return (
                <div className = "current-weather">
                    <div className = "local-info">
                        <div className = "city">
                            <h3 style = {{fontSize: String(city).length >= 20 ? "1em" : null }}>
                                {city} {country}
                            </h3>
                        </div>
                        {Object.keys(this.props.localTime).length ? localTime : dotsPreloader}
                    </div>

                    <div className = "left-col">
                        <div className="left-rows">
                            <p><i className="wi wi-thermometer"></i></p><h3>{temp}</h3>
                        </div>
                        <div className="left-rows">
                            <p><i className="wi wi-barometer"></i></p><h3>{pressure}</h3>
                        </div>
                        <div className="left-rows">
                            <p><i className="wi wi-humidity"></i></p><h3>{humidity}</h3>
                        </div>
                        <div className="left-rows">
                            <p><i className="wi wi-strong-wind"></i></p><h3>{wind}</h3>
                        </div>
                    </div>

                    <div className = "right-col">
                        <div className = "col-60">
                            <h5>{description}</h5>
                        </div>
                        <div className = "col-40">    
                            <CurrentIcon icon={icon} id={id}/>
                        </div>
                        <div className="right-bottom">
                            <button
                                onClick={this.props.displayNextDays}
                                disabled={this.props.btnDisabled}
                            >
                                next days forecast
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default CurrentWeather;
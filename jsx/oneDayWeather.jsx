import React from 'react';
import CurrentIcon from './currentIcon.jsx';

class OneDayWeather extends React.Component {
    render() {

        //Destructuring object with weather data
        let {date, temp, pressure, humidity, description, icon, id} = this.props.nextDay;
        let units = this.props.units;

        //Function that adds the right temperature unit
        let tempWithUnit = (units, temp) => {
            let data;
            if (units == 'metric'){
                return data = `${temp} \u00b0C`
            }
            else if (units == 'imperial') {
                return data = `${temp} \u00b0F`
            }
            else {
                return data = `${temp} \u00b0K`
            }
        } 
        
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
                    <p><i className="wi wi-thermometer"></i></p><h5>{tempWithUnit(units, temp)}</h5>
                </div>
                
                <div className="row">
                    <p><i className="wi wi-barometer"></i></p><h5>{pressure}</h5>
                </div>
                
                <div className="row">
                    <p><i className="wi wi-humidity"></i></p><h5>{humidity}</h5>
                </div>  
                
            </div>
        )
    }
}

export default OneDayWeather;
import React from 'react';
import CurrentIcon from './currentIcon.jsx';

class CurrentWeather extends React.Component{
    render(){

        //Destructuring object with weather data
        let {city, country, temp, pressure, humidity, description, icon, id} = this.props.currentDay;
        let {time, date, gmt} = this.props.localtime;

        //Function that adds the right temperature unit
        let tempWithUnit = (units) => {
            let data;
            if(units == 'metric'){
                return data = `${temp} \u00b0C`
            }
            else if(units == 'imperial'){
                return data = `${temp} \u00b0F`
            }
            else{
                return data = `${temp} \u00b0K`
            }
        }

        return(
            <div className = "current-weather" style={{display: city === "" ? 'none' : 'flex'}}>

                <div className="local-info">
                    <div className="city">
                        <h3>{city} {country}</h3>
                    </div>
                    <div className="date-time">
                        <h6>{date}  {gmt}  {time}</h6>
                    </div>
                </div>

                <div className = "left-col">
                    <div className="left-rows">
                        <p><i className="wi wi-thermometer"></i></p><h3>{tempWithUnit(this.props.units)}</h3>
                    </div>
                    <div className="left-rows">
                        <p><i className="wi wi-barometer"></i></p><h3>{pressure}</h3>
                    </div>
                    <div className="left-rows">
                        <p><i className="wi wi-humidity"></i></p><h3>{humidity}</h3>
                    </div>
                </div>

                <div className = "right-col">
                    <div className="col-60">
                        <h5>{description}</h5>
                    </div>
                    <div className = "col-40">    
                        <CurrentIcon icon ={icon} id={id}/>
                    </div>
                    <div className="right-bottom">
                        <button
                            onClick={this.props.displayNextDays}
                            disabled={this.props.btnDisabled}>
                            5 day forecast
                        </button>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default CurrentWeather;

import React from 'react';
import CurrentIcon from './currentIcon.jsx';

class CurrentWeather extends React.Component{
    render(){

        //Destructuring object with weather data
        let {city, temp, pressure, humidity, description, icon, id} = this.props.currentDay;

        return(
            <div className = "current-weather">

                <div className = "left-col">
                    <div className="left-rows">
                        <h3>{city}</h3>
                    </div>
                    <div className="left-rows">
                        <p><i className="wi wi-thermometer"></i></p><h3>{temp}</h3>
                    </div>
                    <div className="left-rows">
                        <p><i className="wi wi-barometer"></i></p><h3>{pressure}</h3>
                    </div>
                    <div className="left-rows">
                        <p><i className="wi wi-humidity"></i></p><h3>{humidity}</h3>
                    </div>
                </div>

                <div className = "right-col">
                    <div className="col-70">
                        <h5>{description}</h5>
                    </div>
                    <div className = "col-30">    
                        <CurrentIcon icon ={icon} id={id}/>
                    </div>
                    <div className="right-bottom"><button onClick={this.props.displayNextDays}>5 day forecast</button></div>
                </div>
                
            </div>
        )
    }
}

export default CurrentWeather;

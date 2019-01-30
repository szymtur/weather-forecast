import React from 'react';
import OneDayWeather from './oneDayWeather.jsx';

class NextDaysWeather extends React.Component {

    render(){
        let nexDaysComponentsArray = this.props.nextDays.map( (element, index) => {
            return (
                <OneDayWeather 
                    nextDay = {element} 
                    units = {this.props.units} 
                    key = {index}  
                />
            )
        });

        if(!this.props.nextDays.length) {
            return null
        }
        else {
            return(
                <div 
                    className = "next-days-weather" 
                    style = {{display: this.props.display ? "flex" : "none"}}
                >
                    {nexDaysComponentsArray}
                </div>
            )
        }
    }
}

export default NextDaysWeather;
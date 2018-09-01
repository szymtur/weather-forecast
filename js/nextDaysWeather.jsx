import React from 'react';
import OneDayWeather from './oneDayWeather.jsx';

class NextDaysWeather extends React.Component {

    render(){
        return(
            <div className="next-days-weather" style={{display: this.props.display}}>
                <OneDayWeather nextDay = {this.props.nextDay1} units = {this.props.units} />
                <OneDayWeather nextDay = {this.props.nextDay2} units = {this.props.units} />
                <OneDayWeather nextDay = {this.props.nextDay3} units = {this.props.units} />
                <OneDayWeather nextDay = {this.props.nextDay4} units = {this.props.units} />
                <OneDayWeather nextDay = {this.props.nextDay5} units = {this.props.units}/>
            </div>
        )
    }
}

export default NextDaysWeather;
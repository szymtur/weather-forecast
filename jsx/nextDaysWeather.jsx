'use strict';

import React from 'react';
import OneDayWeather from './oneDayWeather.jsx';

class NextDaysWeather extends React.Component {

    render() {
        const nexDaysComponentsArray = this.props.nextDays.map((element, index) => {

            return (
                <OneDayWeather
                    nextDay = {element}
                    unitSystem = {this.props.unitSystem}
                    key = {index}
                />
            )
        });

        if(!this.props.switchComponent) {
            return null;
        }

        return (
            <div className = 'next-days-weather'>
                {nexDaysComponentsArray.slice(1,7)}
            </div>
        )
    }
}

export default NextDaysWeather;

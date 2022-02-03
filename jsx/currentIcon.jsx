import React from 'react';

class CurrentIcon extends React.Component {

    render() {
        /* function for selecting icons based on weather id and icon id */
        const selectIcon = (id, icon) => {

            if(id === 800 && icon[3] === 'd') {
                return <i className="wi wi-day-sunny"/>
            }
            if(id === 800 && icon[3] === 'n') {
                return <i className="wi wi-night-clear"/>
            }
            if(id === 801 && icon[3] === 'd') {
                return <i className="wi wi-day-cloudy"/>
            }
            if(id === 801 && icon[3] === 'n') {
                return <i className="wi wi-night-cloudy"/>
            }
            if(id === 802 && icon[3] === 'd') {
                return <i className="wi wi-day-cloudy"/>
            }
            if(id === 802 && icon[3] === 'n') {
                return <i className="wi wi-night-cloudy"/>
            }
            if(id === 803 && icon[3] === 'd') {
                return <i className="wi wi-day-cloudy-high"/>
            }
            if(id === 803 && icon[3] === 'n') {
                return <i className="wi wi-night-cloudy-high"/>
            }
            if(id === 804 && icon[3] === 'd') {
                return <i className="wi wi-day-cloudy-high"/>
            }
            if(id === 804 && icon[3] === 'n') {
                return <i className="wi wi-night-cloudy-high"/>
            }
            if(id === 900 && icon[3] === 'd') {
                return <i className="wi wi-day-rain"/>
            }
            if(id === 900 && icon[3] === 'n') {
                return <i className="wi wi-night-rain"/>
            }
            if(id >= 701 && id <= 781 && icon[3] === 'd') {
                return <i className="wi wi-day-fog"/>
            }
            if(id >= 701 && id <= 781 && icon[3] === 'n') {
                return <i className="wi wi-night-fog"/>
            }
            if(id >= 600 && id <= 622 && icon[3] === 'd') {
                return <i className="wi wi-day-snow"/>
            }
            if(id >= 600 && id <= 622 && icon[3] === 'n') {
                return <i className="wi wi-night-snow"/>
            }
            if(id === 511 && icon[3] === 'd') {
                return <i className="wi wi-day-snow"/>
            }
            if(id === 511 && icon[3] === 'n') {
                return <i className="wi wi-night-snow"/>
            }
            if(id >= 500 && id <= 504 && icon[3] === 'd') {
                return <i className="wi wi-day-rain"/>
            }
            if(id >= 500 && id <= 504 && icon[3] === 'n') {
                return <i className="wi wi-night-rain"/>
            }
            if(id >= 520 && id <= 531 && icon[3] === 'd') {
                return <i className="wi wi-day-rain"/>
            }
            if(id >= 520 && id <= 531 && icon[3] === 'n') {
                return <i className="wi wi-night-rain"/>
            }
            if(id >= 300 && id <= 321 && icon[3] ==='d') {
                return <i className="wi wi-day-showers"/>
            }
            if(id >= 300 && id <= 321 && icon[3] === 'n') {
                return <i className="wi wi-night-showers"/>
            }
            if(id >= 200 && id <= 233 && icon[3] === 'd') {
                return <i className="wi wi-day-thunderstorm"/>
            }
            if(id >= 200 && id <= 233 && icon[3] === 'n') {
                return <i className="wi wi-night-thunderstorm"/>
            }
        }

        return (
            <div className="current-icon">
                { selectIcon(this.props.id, this.props.icon) }
            </div>
        )
    }
}

export default CurrentIcon;
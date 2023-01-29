'use strict';

import React from 'react';

class CurrentIcon extends React.Component {
    /* function for selecting icons based on weather id and icon id */
    selectIcon = (id, icon) => {
        switch (true) {
            case id >= 200 && id <= 233 && icon[2] === 'd':
                return <i className="wi wi-day-thunderstorm"/>;

            case id >= 200 && id <= 233 && icon[2] === 'n':
                return <i className="wi wi-night-thunderstorm"/>;

            case id >= 300 && id <= 321 && icon[2] ==='d':
                return <i className="wi wi-day-showers"/>;

            case id >= 300 && id <= 321 && icon[2] === 'n':
                return <i className="wi wi-night-showers"/>;

            case id >= 500 && id <= 504 && icon[2] === 'd':
                return <i className="wi wi-day-rain"/>;

            case id >= 500 && id <= 504 && icon[2] === 'n':
                return <i className="wi wi-night-rain"/>;

            case id === 511 && icon[2] === 'd':
                return <i className="wi wi-day-snow"/>;

            case id === 511 && icon[2] === 'n':
                return <i className="wi wi-night-snow"/>;

            case id >= 520 && id <= 531 && icon[2] === 'd':
                return <i className="wi wi-day-rain"/>;

            case id >= 520 && id <= 531 && icon[2] === 'n':
                return <i className="wi wi-night-rain"/>;

            case id >= 600 && id <= 622 && icon[2] === 'd':
                return <i className="wi wi-day-snow"/>;

            case id >= 600 && id <= 622 && icon[2] === 'n':
                return <i className="wi wi-night-snow"/>;

            case id >= 701 && id <= 781 && icon[2] === 'd':
                return <i className="wi wi-day-fog"/>;

            case id >= 701 && id <= 781 && icon[2] === 'n':
                return <i className="wi wi-night-fog"/>;

            case id === 800 && icon[2] === 'd':
                return <i className="wi wi-day-sunny"/>;

            case id === 800 && icon[2] === 'n':
                return <i className="wi wi-night-clear"/>;

            case id === 801 && icon[2] === 'd':
                return <i className="wi wi-day-cloudy"/>;

            case id === 801 && icon[2] === 'n':
                return <i className="wi wi-night-cloudy"/>;

            case id === 802 && icon[2] === 'd':
                return <i className="wi wi-day-cloudy"/>;

            case id === 802 && icon[2] === 'n':
                return <i className="wi wi-night-cloudy"/>;

            case id === 803 && icon[2] === 'd':
                return <i className="wi wi-day-cloudy-high"/>;

            case id === 803 && icon[2] === 'n':
                return <i className="wi wi-night-cloudy-high"/>;

            case id === 804 && icon[2] === 'd':
                return <i className="wi wi-day-cloudy-high"/>;

            case id === 804 && icon[2] === 'n':
                return <i className="wi wi-night-cloudy-high"/>;
        }
    }

    render() {
        return (
            <div className="current-icon">
                {this.selectIcon(this.props.id, this.props.icon)}
            </div>
        )
    }
}

export default CurrentIcon;

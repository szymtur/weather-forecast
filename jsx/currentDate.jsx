'use strict';

import React from 'react';
import { appendLeadingZero } from '../js/helpers.js';

class CurrentDateHeader extends React.Component {
    state = { timezone: null, time: null, date: null };

    currentTime() {
        const date = new Date();
        const timezoneOffset = -date.getTimezoneOffset() / 60;

        this.setState({
            timezone: `(GMT${timezoneOffset >= 0 ? `+${timezoneOffset}` : timezoneOffset})`,
            time: `${appendLeadingZero(date.getHours())}:${appendLeadingZero(date.getMinutes())}:${appendLeadingZero(date.getSeconds())}`,
            date: `${appendLeadingZero(date.getDate())}-${appendLeadingZero(date.getMonth() + 1)}-${date.getFullYear()}`
        });
    }

    componentDidMount() {
        this.currentTime();
        this.interval = setInterval(() => this.currentTime(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="header">
                <div className="current-date">
                    <h4>{this.state.date} {this.state.timezone} {this.state.time}</h4>
                </div>
                <div className="caption">
                    <h2>Weather Forecast</h2>
                </div>
            </div>
        );
    }
}

export default CurrentDateHeader;

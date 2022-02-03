import React from 'react';

class CurrentDateHeader extends React.Component {

    state = { timezone: null, time: null, date: null }

    currentTime = () => {
        let date = new Date();

        let appendLeadingZero = (number) => {
            if(number.toString().length === 1) { return `0${number}` }
            else { return number.toString() }
        }

        this.setState({
            timezone: date.getTimezoneOffset() < 0 ? `(GMT+${date.getTimezoneOffset()/-60})` : `(GMT${date.getTimezoneOffset()/-60})`,
            time: `${appendLeadingZero(date.getHours())}:${appendLeadingZero(date.getMinutes())}:${appendLeadingZero(date.getSeconds())}`,
            date: `${appendLeadingZero(date.getDate())}-${appendLeadingZero(date.getMonth()+1)}-${date.getFullYear()}`
        })
    }

    UNSAFE_componentWillMount() {
        this.currentTime();
    }

    componentDidMount() {
        this.interval = setInterval( () => this.currentTime(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
            <div className="header">
                <div className="current-date">
                    <h4>{this.state.date} {this.state.timezone} {this.state.time}</h4>
                </div>
                <div className="caption">
                    <h2>Weather Forecast</h2>
                </div>
            </div>
        )
    }
}

export default CurrentDateHeader;
import React from 'react';

class CurrentDateHeader extends React.Component {
	
	date = new Date();
	
	state = {
        timezone: this.date.getTimezoneOffset() < 0 ? ` (GMT+${this.date.getTimezoneOffset()/-60}) ` : ` (GMT${this.date.getTimezoneOffset()/-60}) `,
        hours:    this.date.getHours().toString().length == 1 ? `0${this.date.getHours()}` : `${this.date.getHours()}`,
        minutes:  this.date.getMinutes().toString().length == 1 ? `:0${this.date.getMinutes()}` : `:${this.date.getMinutes()}`,
        seconds:  this.date.getSeconds().toString().length == 1 ? `:0${this.date.getSeconds()}` : `:${this.date.getSeconds()}`,
        day:      this.date.getDate().toString().length == 1 ? `0${this.date.getDate()}` : `${this.date.getDate()}`,
        month:    this.date.getMonth().toString().length == 1 ? `-0${this.date.getMonth()+1}-` : `-${this.date.getMonth()+1}-`,
        year:     this.date.getFullYear(),
    }

    currentTime = () => {
        let date = new Date();
        this.setState({
            timezone: date.getTimezoneOffset() < 0 ? ` (GMT+${date.getTimezoneOffset()/-60}) ` : ` (GMT${date.getTimezoneOffset()/-60}) `,
            hours:    date.getHours().toString().length == 1 ? `0${date.getHours()}` : `${date.getHours()}`,
            minutes:  date.getMinutes().toString().length == 1 ? `:0${date.getMinutes()}` : `:${date.getMinutes()}`,
            seconds:  date.getSeconds().toString().length == 1 ? `:0${date.getSeconds()}` : `:${date.getSeconds()}`,
            day:      date.getDate().toString().length == 1 ? `0${date.getDate()}` : `${date.getDate()}`,
            month:    date.getMonth().toString().length == 1 ? `-0${date.getMonth()+1}-` : `-${date.getMonth()+1}-`,
            year:     date.getFullYear()
        })
    }

    componentDidMount() {
        this.interval = setInterval( () => {
            this.currentTime()
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
			<div className="header">
	            <div className="current-date">
    	            <h4>
        	            {this.state.day}{this.state.month}{this.state.year}
            	        {this.state.timezone}{this.state.hours}{this.state.minutes}{this.state.seconds}
                	</h4>
            	</div>
				<div className="caption"><h2>Weather Forecast</h2></div>
			</div>		
        )
    }
}

export default CurrentDateHeader;
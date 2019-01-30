import React from 'react';

class CurrentDate extends React.Component {
    state = {
        timezone: new Date().getTimezoneOffset() < 0 ? ` (GMT+${new Date().getTimezoneOffset()/-60}) ` : ` (GMT${new Date().getTimezoneOffset()/-60}) `,
        hours:    new Date().getHours().toString().length == 1 ? `0${new Date().getHours()}` : `${new Date().getHours()}`,
        minutes:  new Date().getMinutes().toString().length == 1 ? `:0${new Date().getMinutes()}` : `:${new Date().getMinutes()}`,
        seconds:  new Date().getSeconds().toString().length == 1 ? `:0${new Date().getSeconds()}` : `:${new Date().getSeconds()}`,
        day:      new Date().getDate().toString().length == 1 ? `0${new Date().getDate()}` : `${new Date().getDate()}`,
        month:    new Date().getMonth().toString().length == 1 ? `-0${new Date().getMonth()+1}-` : `-${new Date().getMonth()+1}-`,
        year:     new Date().getFullYear(),
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

    render(){
        return(
            <div className={"current-date"}>
                <h4>
                    {this.state.day}{this.state.month}{this.state.year}
                    {this.state.timezone}{this.state.hours}{this.state.minutes}{this.state.seconds}
                </h4>
            </div>
        )
    }
}

export default CurrentDate;

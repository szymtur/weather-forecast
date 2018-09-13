import React from 'react';
import ReactDOM from 'react-dom';
import CurrentDate from './currentDate.jsx';
import CurrentWeather from './currentWeather.jsx';
import NextDaysWeather from './nextDaysWeather.jsx';
import apiConfig from './apiConfig.js';
import '../css/styles.css';
import '../css/responsive.css';

document.addEventListener('DOMContentLoaded', function(){

    class Main extends React.Component{
        state = {
            owmAppid: apiConfig.owmAppid,
            wbitAppid: apiConfig.wbitAppid,
            tzdbAppid: apiConfig.tzdbAppid,
            units: apiConfig.units,
            lang: apiConfig.lang,
            input: "",
            latitude:"",
            longitude: "",
            placeholder: 'city',
            fiveDaysBtnDisabled: true,
            displayNextDaysWeather: 'none',
            nextDaysList: this.props.nextDays,
            localtime: {time: '', date: '', gmt: ''},
            currentDay: {city: '', country: '', temp: '', pressure: '', humidity: '', description: '', icon: '', id: ''},
            nextDay__1: {date: '', temp: '', pressure: '', humidity: '', description: '', icon: '', id: ''},
            nextDay__2: {date: '', temp: '', pressure: '', humidity: '', description: '', icon: '', id: ''},
            nextDay__3: {date: '', temp: '', pressure: '', humidity: '', description: '', icon: '', id: ''},
            nextDay__4: {date: '', temp: '', pressure: '', humidity: '', description: '', icon: '', id: ''},
            nextDay__5: {date: '', temp: '', pressure: '', humidity: '', description: '', icon: '', id: ''},
        }


        //'get weather' button handling
        handleSubmit = (event) => {
            event.preventDefault();
            this.getData();
            this.blurSearchField();
            this.setState({
                input: "",
            });
        }


        //input field handling
        handleInput = (event) => {
            this.setState({
                input: event.target.value,
            })
        }


        //'5 day forecast' button function to show or hide 'nextDaysWeather' component
        displayNextDays = () => {
            if(this.state.displayNextDaysWeather === 'none'){
                this.setState({
                    displayNextDaysWeather: 'flex'
                })
            }
            else{
                this.setState({
                    displayNextDaysWeather: 'none'
                }) 
            }
        }


        //remove focus from search field
        blurSearchField = () => {
            ReactDOM.findDOMNode(this).querySelector('input[type="search"]').blur();
        }


        //get current weather info from api
        getData () {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.input.trim()}&units=${this.state.units}&lang=${this.state.lang}&appid=${this.state.owmAppid}`)
            .then(resp => {
                if(resp.ok) {
                    this.setState({ placeholder: 'city' });
                    return resp.json();
                } 
                else {
                    //errors handling
                    if(resp.status == 400 || resp.status == 404){
                        this.setState({
                           placeholder: 'wrong city name'
                        })
                    }    
                    else if(resp.status == 401){
                        this.setState({
                            placeholder: 'unauthorized'
                        })
                    }
                    throw new Error(resp.statusText);
                }
            })
            .then(data => {
                this.setState({
                    currentDay: {
                        city: data.name,
                        country: data.sys.country, 
                        temp: `${Math.round(data.main.temp)}`, 
                        pressure: `${Math.round(data.main.pressure)} hPa`, 
                        humidity: `${data.main.humidity} %`, 
                        description: data.weather[0].description, 
                        icon: data.weather[0].icon,
                        id: data.weather[0].id
                    },
                    latitude: data.coord.lat,
                    longitude: data.coord.lon
                })
            })
            .then( ()=> {
                this.getLocalTime();
                this.getNextDaysData();
            })
            .catch(error => {
                console.log(error)
            });
        }


        //get local time for schearched city
        getLocalTime() {
            fetch(`https://api.timezonedb.com/v2.1/get-time-zone?format=json&by=position&lat=${this.state.latitude}&lng=${this.state.longitude}&key=${this.state.tzdbAppid}`)
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then(data => {
                this.setState({
                    localtime: {
                        time: data.formatted.substring(11,16),
                        date: data.formatted.substring(0,10).split('-').reverse().join('-'),
                        gmt: data.gmtOffset > 0 ? `(GMT+${data.gmtOffset/3600})` : `(GMT${data.gmtOffset/3600})`,
                    }
                })
            })
            .catch(error => {
                console.log(error)
            });
        }


        //get five days weather info from api
        getNextDaysData () {
            fetch(`https://api.weatherbit.io/v2.0/forecast/daily?days=6&&lat=${this.state.latitude}&lon=${this.state.longitude}&units=${this.state.units.charAt(0)}&lang=${this.state.lang}&key=${this.state.wbitAppid}`)
            .then(resp => {
                if(resp.ok) {
                    this.setState({
                        fiveDaysBtnDisabled: false,
                    })
                    return resp.json();
                }
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then(data => {
                updateStateDay__1(data, this.state.nextDaysList[0]);
                updateStateDay__2(data, this.state.nextDaysList[1]);
                updateStateDay__3(data, this.state.nextDaysList[2]);
                updateStateDay__4(data, this.state.nextDaysList[3]);
                updateStateDay__5(data, this.state.nextDaysList[4]);
            })
            .catch(error => {
                console.log(error)
            });

            let updateStateDay__1 = (data, a) => {
                this.setState({
                    nextDay__1: {
                        temp: `${Math.round(data.data[a].temp)}`,
                        date: `${data.data[a].valid_date.split('-').reverse().join('-')}`,
                        pressure: `${Math.round(data.data[a].pres)} hPa`,
                        humidity: `${data.data[a].rh} %`,
                        description: data.data[a].weather.description.toLowerCase(),
                        icon: data.data[a].weather.icon,
                        id: data.data[a].weather.code
                    }
                })
            }

            let updateStateDay__2 = (data, a) => {
                this.setState({
                    nextDay__2: {
                        temp: `${Math.round(data.data[a].temp)}`,
                        date: `${data.data[a].valid_date.split('-').reverse().join('-')}`,
                        pressure: `${Math.round(data.data[a].pres)} hPa`,
                        humidity: `${data.data[a].rh} %`,
                        description: data.data[a].weather.description.toLowerCase(),
                        icon: data.data[a].weather.icon,
                        id: data.data[a].weather.code
                    }
                })
            }

            let updateStateDay__3 = (data, a, d) => {
                this.setState({
                    nextDay__3: {
                        temp: `${Math.round(data.data[a].temp)}`,
                        date: `${data.data[a].valid_date.split('-').reverse().join('-')}`,
                        pressure: `${Math.round(data.data[a].pres)} hPa`,
                        humidity: `${data.data[a].rh} %`,
                        description: data.data[a].weather.description.toLowerCase(),
                        icon: data.data[a].weather.icon,
                        id: data.data[a].weather.code
                    }
                })
            }

            let updateStateDay__4 = (data, a) => {
                this.setState({
                    nextDay__4: {
                        temp: `${Math.round(data.data[a].temp)}`,
                        date: `${data.data[a].valid_date.split('-').reverse().join('-')}`,
                        pressure: `${Math.round(data.data[a].pres)} hPa`,
                        humidity: `${data.data[a].rh} %`,
                        description: data.data[a].weather.description.toLowerCase(),
                        icon: data.data[a].weather.icon,
                        id: data.data[a].weather.code
                    }
                })
            }

            let updateStateDay__5 = (data, a) => {
                this.setState({
                    nextDay__5: {
                        temp: `${Math.round(data.data[a].temp)}`,
                        date: `${data.data[a].valid_date.split('-').reverse().join('-')}`,
                        pressure: `${Math.round(data.data[a].pres)} hPa`,
                        humidity: `${data.data[a].rh} %`,
                        description: data.data[a].weather.description.toLowerCase(),
                        icon: data.data[a].weather.icon,
                        id: data.data[a].weather.code
                    }
                })
            }            
        }


        componentDidMount(){
            //add background color and blur event on search input in mobile devices 
            if (/iphone|ipod|ipad|blackberry|Android|webOS|IEMobile/i.test(navigator.userAgent)){
                ReactDOM.findDOMNode(this).querySelector('input[type="search"]').blur();
                ReactDOM.findDOMNode(this).querySelector('.current-date').style.marginTop ='0';
                document.querySelector("body").style.background = "#e0e0e0";
            }
        }


        render(){
            return(
                <div>
                    <div className="header">
                        <CurrentDate />
                        <div className="caption"><h2>Weather Forecast</h2></div>
                    </div>

                    <div  className="search">
                        <form onSubmit={this.handleSubmit}>
                                <input 
                                    type="search" 
                                    onChange={this.handleInput} 
                                    value={this.state.input} 
                                    placeholder={this.state.placeholder} 
                                    className={this.state.placeholder === 'city' ? 'normal' : 'warning'}
                                    autoFocus="true"
                                />
                                <input 
                                    type="submit" 
                                    value="get weather" 
                                    disabled={!this.state.input}
                                />
                        </form>
                    </div>

                    <CurrentWeather
                        units = {this.state.units}
                        localtime = {this.state.localtime}
                        currentDay = {this.state.currentDay}
                        btnDisabled =  {this.state.fiveDaysBtnDisabled}
                        displayNextDays = {this.displayNextDays}
                    />

                    <NextDaysWeather
                        units = {this.state.units}
                        display = {this.state.displayNextDaysWeather}
                        nextDay1 = {this.state.nextDay__1}
                        nextDay2 = {this.state.nextDay__2}
                        nextDay3 = {this.state.nextDay__3}
                        nextDay4 = {this.state.nextDay__4}
                        nextDay5 = {this.state.nextDay__5}
                    />
                </div>    
            )
        }
    }

    
    class App extends React.Component{
        render(){
            return <Main nextDays = {[1, 2, 3, 4, 5]}/>
        }
    }
    

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
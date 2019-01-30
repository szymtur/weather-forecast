import React from 'react';
import ReactDOM from 'react-dom';
import CurrentDate from './currentDate.jsx';
import CurrentWeather from './currentWeather.jsx';
import NextDaysWeather from './nextDaysWeather.jsx';
import apiConfig from '../js/apiConfig.js';
import '../js/styles.js';
import '../css/styles.css';
import '../css/responsive.css';

document.addEventListener('DOMContentLoaded', function() {

    class Main extends React.Component {

        strings = {
            input: '',
            loading_data: 'loading data ...',
            enter_manually: 'enter your location manually',
            wrong_city: 'wrong city name',
            connection_error: 'connection error'
        }

        state = {
            wbitAppid: apiConfig.wbitAppid,
            tzdbAppid: apiConfig.tzdbAppid,
            units: apiConfig.units,
            lang: apiConfig.lang,
            input: this.strings.input,
            latitude: null,
            longitude: null,
            preloaderInfo: this.strings.loading_data,
            preloaderAlert: false,
            fiveDaysBtnDisabled: true,
            displayNextDaysWeather: false,
            displayCurrentDayWeather: false,
            location: {},
            localTime: {},
            currentDayWeatherData: {},
            nextDaysWeatherData: [],
        }




        /* 'get weather' button handling */
        handleSubmit = (event) => {
            event.preventDefault();
            this.getCoordinates();
            this.blurSearchField();
            this.setState({
                input: "",
                displayNextDaysWeather: false,
                displayCurrentDayWeather: false,
                preloaderAlert: false,
                preloaderInfo: this.strings.loading_data
            });
        }


        /* input field handling */
        handleInput = (event) => {
            this.setState({
                input: event.target.value,
            });
        }


        /* '5 days forecast' button function to showing or hiding 'nextDaysWeather' component */
        displayNextDays = () => {
            if(this.state.displayNextDaysWeather) {
                this.setState({ displayNextDaysWeather: false });
            }
            else {
                this.setState({ displayNextDaysWeather: true });
            }
        }


        /* removing focus from search field */
        blurSearchField = () => {
            ReactDOM.findDOMNode(this).querySelector('input[type="search"]').blur();
        }


        /* geolocation - getting current position by ip address from geoip2 database */
        getCurrentPosition() {
            return new Promise( (resolve, reject) => {
                let onSuccess = (resp) => {
                    resolve(resp);
                }
                let onError = (resp) => {
                    this.setState({
                        preloaderAlert: true,
                        preloaderInfo: this.strings.enter_manually
                    });
                    reject(resp);
                }
                geoip2.city(onSuccess, onError);
            })
            .then( data => {
                document.write(data.city.names.en);
                this.setState({
                    latitude: data.location.latitude,
                    longitude: data.location.longitude,
                    location: {
                        city: data.city.names.en, 
                        country: data.country.iso_code.toUpperCase()
                    }
                });
            })
            .then( () => {
                this.getData();
            })
            .catch( function(error){
                console.error(error.code + "::" + error.error)
            });
        }


        /* geocoding - getting latitude and longitude from city name */
        getCoordinates() {
            fetch(`https://nominatim.openstreetmap.org/?format=json&limit=1&addressdetails=1&city=${this.state.input.trim()}`)
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then(data => {
                if(!data.length){
                    throw new Error('NO_DATA')
                }
                else{
                    this.setState({
                        latitude: parseFloat(data[0].lat).toFixed(4),
                        longitude: parseFloat(data[0].lon).toFixed(4),
                        location: {
                            city: data[0].display_name.split(',')[0],
                            country: data[0].address.country_code.toUpperCase()
                        }
                    });
                }
            })
            .then( () => {
                this.getData();
            })
            .catch(error => {
                if(error == 'Error: NO_DATA') {
                    this.setState({
                        preloaderAlert: true,
                        preloaderInfo: this.strings.wrong_city
                    });
                }
                else {
                    this.setState({
                        preloaderAlert: true,
                        preloaderInfo: this.strings.connection_error
                    });
                }
                console.error(error)
            });
        }


        /* getting weather forecast from Weatherbit Api and local time from TimezoneDb Api */
        getData() {
            fetch(`https://api.weatherbit.io/v2.0/current?lat=${this.state.latitude}&lon=${this.state.longitude}&units=${this.state.units.charAt(0)}&lang=${this.state.lang}&key=${this.state.wbitAppid}`)
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                } 
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then(weather_data => {
                let data = weather_data.data[0];
                if(!this.state.location.city) {
                    this.setState({
                        location: {
                            city: data.city_name, 
                            country: data.country_code.toUpperCase()
                        }
                    });
                }
                this.setState({
                    currentDayWeatherData: {
                        temp: `${Math.round(data.app_temp)}`, 
                        pressure: `${Math.round(data.pres)} hPa`, 
                        humidity: `${data.rh} %`, 
                        description: data.weather.description, 
                        icon: data.weather.icon,
                        id: data.weather.code
                    },
                    displayCurrentDayWeather: true
                });
            })
            .then( () => {
                this.getLocalTime(`https://api.timezonedb.com/v2.1/get-time-zone?format=json&by=position&lat=${this.state.latitude}&lng=${this.state.longitude}&key=${this.state.tzdbAppid}`);
            })
            .then( () => {
                this.getNextDaysData(`https://api.weatherbit.io/v2.0/forecast/daily?days=6&&lat=${this.state.latitude}&lon=${this.state.longitude}&units=${this.state.units.charAt(0)}&lang=${this.state.lang}&key=${this.state.wbitAppid}`);            
            })
            .catch(error => {
                this.setState({
                    preloaderAlert: true,
                    preloaderInfo: this.strings.connection_error
                });
                console.error(error)
            });
        }


        /* getting next days weather info from Weatherbit Api */
        getNextDaysData(weather_api_url) {
            fetch(weather_api_url)
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
            .then(weather_data => {
                let data = weather_data.data;
                let nextDays = [];

                for (let i=1; i<data.length; i++){
                    nextDays[i-1] = {
                        temp: `${Math.round(data[i].temp)}`,
                        date: `${data[i].valid_date.split('-').reverse().join('-')}`,
                        pressure: `${Math.round(data[i].pres)} hPa`,
                        humidity: `${data[i].rh} %`,
                        description: data[i].weather.description.toLowerCase(),
                        icon: data[i].weather.icon,
                        id: data[i].weather.code
                    }
                }
                this.setState({
                    nextDaysWeatherData: nextDays
                });
            })
            .catch(error => {
                console.error(error)
            });
        }


        /* getting local time for schearched city */
        getLocalTime(time_db_api_url) {
            fetch(time_db_api_url)
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then(data => {
                if (data.status === 'FAILED') return
                else {
                    this.setState({
                        localTime: {
                            time: data.formatted.substring(11,16),
                            date: data.formatted.substring(0,10).split('-').reverse().join('-'),
                            gmt: data.gmtOffset > 0 ? `(GMT+${data.gmtOffset/3600})` : `(GMT${data.gmtOffset/3600})`,
                        }
                    })
                }
            })
            .catch(error => {
                console.error(error)
            });
        }


        componentWillMount(){
            this.getCurrentPosition()
        }


        componentDidMount() {
            /* adding background color and blur event on search input in mobile devices */ 
            if (/iphone|ipod|ipad|blackberry|Android|webOS|IEMobile/i.test(navigator.userAgent)){
                ReactDOM.findDOMNode(this).querySelector('input[type="search"]').blur();
            }
        }


        render() {
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
                                    placeholder="city" 
                                    className="normal"
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
                        localTime = {this.state.localTime}
                        location = {this.state.location}
                        currentDay = {this.state.currentDayWeatherData}
                        btnDisabled =  {this.state.fiveDaysBtnDisabled}
                        displayNextDays = {this.displayNextDays}
                        displayComponent = {this.state.displayCurrentDayWeather}
                        preloaderInfo = {this.state.preloaderInfo}
                        preloaderAlert = {this.state.preloaderAlert}
                    />

                    <NextDaysWeather
                        units = {this.state.units}
                        display = {this.state.displayNextDaysWeather}
                        nextDays = {this.state.nextDaysWeatherData}
                    />
                </div>    
            )
        }
    }

    
    class App extends React.Component {
        render(){
            return <Main />
        }
    }
    

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
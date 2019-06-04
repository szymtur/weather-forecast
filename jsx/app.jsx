import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise-polyfill';
import 'isomorphic-fetch';

import apiConfig from '../js/apiConfig.js';
import SearchSection from './searchSection.jsx';
import CurrentDateHeader from './currentDate.jsx';
import CurrentWeather from './currentWeather.jsx';
import NextDaysWeather from './nextDaysWeather.jsx';
import {unitsChanger, nameChooser, isMobile} from './appHandler.jsx';

import '../css/styles.css';
import '../css/responsive.css';
// import '../jsx/mobileStyles.jsx';

if (!window.Promise) { window.Promise = Promise };


document.addEventListener('DOMContentLoaded', function() {

    class Main extends React.Component {

        strings = {
            input: '',
            loading_data: 'loading data...',
            enter_manually: 'enter your location manually',
            wrong_city: 'wrong city name',
            connection_error: 'connection error',
            temperature: 'temperature',
            pressure: 'pressure',
            humidity: 'humidity',
            wind: 'wind'
        }

        state = {
            weatherBitApiKey: apiConfig.weatherBit,
            timeZoneDbApiKey: apiConfig.timeZoneDb,
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
            inputOnFocus: false,
            inputOnBlur: true
        }


        /* input field handling */
        handleInput = (event) => {
            this.setState({
                input: event.target.value,
            });
        }


        /* 'get weather' button handling */
        handleSubmit = (event) => {
            event.preventDefault();
            this.getCoordinates();
            this.blurSearchField();
            this.setState({
                input: "",
                localTime: {},
                displayNextDaysWeather: false,
                displayCurrentDayWeather: false,
                preloaderAlert: false,
                preloaderInfo: this.strings.loading_data
            });
        }


        handleInputOnFocus = () => {
            this.setState({
                inputOnFocus: true,
                inputOnBlur: false
            })


            // let input =  ReactDOM.findDOMNode(this).querySelector('input[type="search"]');
            let viewport = document.querySelector("meta[name=viewport]");


            if(window.innerHeight > window.innerWidth) {
                console.log('pion')
                viewport.setAttribute('content', `width=device-width, height=810, initial-scale=1, maximum-scale=1, shrink-to-fit=yes`);
            }
            if (window.innerHeight < window.innerWidth){
                console.log('poziom')
                viewport.setAttribute('content', 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, shrink-to-fit=yes');
            }

            window.onorientationchange = () => {

                if(window.innerHeight < window.innerWidth) {
                    console.log('pion pion')
                    viewport.setAttribute('content', `width=device-width, height=810, initial-scale=1, maximum-scale=1, shrink-to-fit=yes`);
                }
                if (window.innerHeight > window.innerWidth) {
                    console.log('poziom poziom')
                    viewport.setAttribute('content', 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, shrink-to-fit=yes');
                }
            }

        }


        handleInputOnBlur = () => {
            this.setState({
                inputOnFocus: false,
                inputOnBlur: true
            })

            // let viewport = document.querySelector("meta[name=viewport]");
            // viewport.setAttribute('content', 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, shrink-to-fit=yes');
        }

        detectActive = () => {
            let input =  ReactDOM.findDOMNode(this).querySelector('input[type="search"]');
            console.log(document.activeElement === input)

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


        /* geolocation - getting current position by ip address from geoip-db.com */
        getCurrentPosition() {
            fetch(`https://geoip-db.com/json/`)
            .then( resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then( data => {
                this.setState({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    location: {
                        city: data.city,
                        country: data.country_code.toUpperCase()
                    }
                });
            })
            .then( () => {
                this.getWeatherData();
            })
            .catch( error => {
                this.setState({
                    preloaderAlert: true,
                    preloaderInfo: this.strings.enter_manually
                });
                console.error(error);
            });
        }


        /* geocoding - getting latitude and longitude from city name using openstreetmap.org */
        getCoordinates() {
            fetch(`https://nominatim.openstreetmap.org?format=json&limit=1&addressdetails=1&q=${this.state.input.trim()}`)
            .then( resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then( data => {
                if(!data.length) {
                    throw new Error('NO_DATA')
                }
                else {
                    this.setState({
                        latitude: parseFloat(data[0].lat).toFixed(4),
                        longitude: parseFloat(data[0].lon).toFixed(4),
                        location: {
                            city: nameChooser(data),
                            country: data[0].address.country_code.toUpperCase()
                        }
                    });
                }
            })
            .then( () => {
                this.getWeatherData();
            })
            .catch( error => {
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
                console.error(error);
            });
        }


        /* getting weather forecast from weatherbit.io and local time from timezonedb.com */
        getWeatherData() {
            fetch(`https://api.weatherbit.io/v2.0/current` +
                  `?lat=${this.state.latitude}&lon=${this.state.longitude}` +
                  `&units=${this.state.units.charAt(0)}&lang=${this.state.lang}` +
                  `&key=${this.state.weatherBitApiKey}`)
            .then( resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then( weather_data => {
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
                        temp: unitsChanger(this.state.units, this.strings.temperature, data.app_temp),
                        pressure: unitsChanger(this.state.units, this.strings.pressure, data.pres), 
                        humidity: unitsChanger(this.state.units, this.strings.humidity, data.rh),
                        wind: unitsChanger(this.state.units, this.strings.wind, data.wind_spd),
                        description: data.weather.description, 
                        icon: data.weather.icon,
                        id: Number(data.weather.code)
                    },
                    displayCurrentDayWeather: true
                });
            })
            .then( () => {
                this.getLocalTime();
            })
            .then( () => {
                this.getNextDaysData();
            })
            .catch( error => {
                this.setState({
                    preloaderAlert: true,
                    preloaderInfo: this.strings.connection_error
                });
                console.error(error)
            });
        }


        /* getting next five days weather info from weatherbit.io */
        getNextDaysData() {
            fetch(`https://api.weatherbit.io/v2.0/forecast/daily?days=7` +
                  `&lat=${this.state.latitude}&lon=${this.state.longitude}` +
                  `&units=${this.state.units.charAt(0)}&lang=${this.state.lang}` +
                  `&key=${this.state.weatherBitApiKey}`)
            .then( resp => {
                if( resp.ok) {
                    this.setState({
                        fiveDaysBtnDisabled: false,
                    })
                    return resp.json();
                }
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then( weather_data => {
                let data = weather_data.data;
                let nextDays = [];

                for (let i=1; i<data.length; i++){
                    nextDays[i-1] = {
                        temp: unitsChanger(this.state.units, this.strings.temperature, data[i].temp),
                        pressure: unitsChanger(this.state.units, this.strings.pressure, data[i].pres), 
                        humidity: unitsChanger(this.state.units, this.strings.humidity, data[i].rh),
                        wind: unitsChanger(this.state.units, this.strings.wind, data[i].wind_spd),
                        description: data[i].weather.description.toLowerCase(),
                        date: `${data[i].valid_date.split('-').reverse().join('-')}`,
                        icon: data[i].weather.icon,
                        id: data[i].weather.code
                    }
                }
                this.setState({
                    nextDaysWeatherData: nextDays
                });
            })
            .catch( error => {
                console.error(error)
            });
        }


        /* getting local time for schearched city from timezonedb.com */
        getLocalTime() {
            fetch(`https://api.timezonedb.com/v2.1/get-time-zone?format=json&by=position` +
                  `&lat=${this.state.latitude}&lng=${this.state.longitude}&key=${this.state.timeZoneDbApiKey}`)
            .then( resp => {
                if( resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then( data => {
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
            .catch( error => {
                console.error(error)
            });
        }


        componentWillMount() {
            this.getCurrentPosition();
        }


        componentDidMount() {
            /* adding blur event on search input on mobile devices */ 
            if (isMobile()) {
                // ReactDOM.findDOMNode(this).querySelector('input[type="search"]').blur();
            }
            let viewport = document.querySelector("meta[name=viewport]");

            if(window.innerHeight > window.innerWidth) {
                viewport.setAttribute('content', `width=device-width, height=810, initial-scale=1, maximum-scale=1, shrink-to-fit=yes`);
            }



        }


        render() {

            // let focus = this.state.inputOnFocus;

            // window.onorientationchange = () => {
            // console.log(this.state.inputOnBlur)
                
            //     // console.log(this.state.inputOnFocus)
            //     let viewport = document.querySelector("meta[name=viewport]");
                

            //         if(window.innerHeight < window.innerWidth && this.state.inputOnFocus) {
            //             this.setState({
            //                 input: 'pion + focus'
            //             })

            //             viewport.setAttribute('content', `width=device-width, height=810, initial-scale=1, maximum-scale=1, shrink-to-fit=yes`);
            //         }
            //         else if (window.innerHeight > window.innerWidth && this.state.inputOnFocus) {
            //             this.setState({
            //                 input: 'poziom + focus'
            //             })
            //             viewport.setAttribute('content', 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, shrink-to-fit=yes');

            //         }
            //         else {
            //             console.log('poziomo' + focus)
            //             viewport.setAttribute('content', 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, shrink-to-fit=yes');
            //         }
            //     }








            return (
                <div className='app-wrapper'>
                    <CurrentDateHeader />
                    <SearchSection 
                        handleInput = {this.handleInput}
                        handleSubmit = {this.handleSubmit}
                        input = {this.state.input}
                        inputOnFocus = {this.handleInputOnFocus}
                        inputOnBlur = {this.handleInputOnBlur}
                    />
                    <CurrentWeather
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
                        display = {this.state.displayNextDaysWeather}
                        nextDays = {this.state.nextDaysWeatherData}
                    />
                </div>
            )
        }
    }


    class App extends React.Component {
        render() {
            return <Main />
        }
    }


    ReactDOM.render (
        <App />, document.getElementById('app')
    );
});
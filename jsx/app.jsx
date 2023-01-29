'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import SearchSection from './searchSection.jsx';
import CurrentDateHeader from './currentDate.jsx';
import CurrentWeather from './currentWeather.jsx';
import WeatherChart from './weatherChart.jsx';
import NextDaysWeather from './nextDaysWeather.jsx';

import { config } from '../js/config.js';
import { WEATHER, MESSAGE, BUTTON } from '../js/consts.js';

import { isMobile, viewportSettingsChanger, mobileStyles } from '../js/mobile.js';
import { capitalizeFirstLetter, placeNameChooser, prepareChartData, timestampToDate, unitsChanger } from '../js/helpers.js';
import { ipInfoGeolocation, openStreetMapForwardGeocoding, openStreetMapReverseGeocoding, openWeatherMapGetData }  from '../js/providers.js';

import '../css/styles.css';
import '../css/responsive.css';

if (!window.Promise) { window.Promise = Promise }


document.addEventListener('DOMContentLoaded', function() {

    class Main extends React.Component {
        state = {
            input: '',
            latitude: null,
            longitude: null,
            preloaderInfo: MESSAGE.loadingData,
            preloaderAlert: false,
            displayCurrentDayWeather: false,
            displayNextDaysWeather: false,
            screenLandscapeOrientation: window.innerHeight <= window.innerWidth,
            location: {},
            localTime: {},
            currentDayWeatherData: {},
            currentDayChartData: {},
            nextDaysWeatherData: [],
            units: config.units
        }


        /* geolocation - getting current position by ip address from ipinfo.io */
        getCurrentPosition = () => {
            ipInfoGeolocation()
            .then( data => {
                const [latitude, longitude] = data.loc.split(',');

                this.setState({
                    latitude,
                    longitude,
                    location: { city: data.city, country: data.country.toUpperCase() }
                });
            })
            .then(() => {
                this.getLocationName();
                this.getWeatherData();  // TODO ???????????

            })
            .catch( error => {
                this.setState({
                    preloaderAlert: true,
                    preloaderInfo: MESSAGE.enterManually
                });
                console.error(error);
            });
        }


        /* reverse geocoding - getting city name from latitude and longitude using openstreetmap.org */
        getLocationName = () => {
            openStreetMapReverseGeocoding(this.state.latitude, this.state.longitude)
            .then(data => {
                this.setState({
                    location: {
                        city: placeNameChooser(data),
                        country: data.address.country_code.toUpperCase()
                    },
                });
            }).then(() => {
                // this.getWeatherData();
            })
            .catch( error => {
                // this.setState({
                //     preloaderAlert: true,
                //     preloaderInfo: MESSAGE.connectionError
                // });
                console.error(error);
            });
        }


        /* forward geocoding - getting latitude and longitude from city name using openstreetmap.org */
        getCoordinates = () => {
            openStreetMapForwardGeocoding(this.state.input)
            .then(data => {
                this.setState({
                    latitude: parseFloat(data[0].lat).toFixed(4),
                    longitude: parseFloat(data[0].lon).toFixed(4),
                    location: { city: placeNameChooser(data[0]), country: data[0].address.country_code.toUpperCase() }
                });
            })
            .then(() => {
                this.getWeatherData();
            })
            .catch(error => {
                if(error.message === 'NO_DATA') {
                    this.setState({
                        preloaderAlert: true,
                        preloaderInfo: MESSAGE.wrongCity
                    });
                }
                else {
                    this.setState({
                        preloaderAlert: true,
                        preloaderInfo: MESSAGE.connectionError
                    });
                }
                console.error(error);
            });
        }


        getWeatherData = () => {
            openWeatherMapGetData(this.state.latitude, this.state.longitude)
            .then( data => {
                this.setState({
                    currentDayWeatherData: {
                        temp: unitsChanger(this.state.units, WEATHER.temperature, data.current.temp),
                        temp_app: unitsChanger(this.state.units, WEATHER.temperature, data.current.feels_like),
                        pressure: unitsChanger(this.state.units, WEATHER.pressure, data.current.pressure),
                        humidity: unitsChanger(this.state.units, WEATHER.humidity, data.current.humidity),
                        wind: unitsChanger(this.state.units, WEATHER.wind, data.current.wind_speed),
                        description: capitalizeFirstLetter(data.current.weather[0].description),
                        icon: data.current.weather[0].icon,
                        id: data.current.weather[0].id
                    },
                    nextDaysWeatherData: data.daily.map( next_day => ({
                        temp: unitsChanger(this.state.units, WEATHER.temperature, next_day.temp.day),
                        pressure: unitsChanger(this.state.units, WEATHER.pressure, next_day.pressure),
                        humidity: unitsChanger(this.state.units, WEATHER.humidity, next_day.humidity),
                        wind: unitsChanger(this.state.units, WEATHER.wind, next_day.wind_speed),
                        date: timestampToDate(next_day.dt, data.timezone_offset),
                        description: next_day.weather[0].description.toLowerCase(),
                        icon: next_day.weather[0].icon,
                        id: next_day.weather[0].id
                    })),
                    localTime: timestampToDate(data.current.dt, data.timezone_offset),
                    currentDayChartData: prepareChartData(data.hourly, data.timezone_offset),
                    displayCurrentDayWeather: true
                });
            })
            .catch( error => {
                this.setState({
                    preloaderAlert: true,
                    preloaderInfo: MESSAGE.connectionError
                });
                console.error(error)
            });
        }


        /* removing focus from search field */
        blurSearchField = () => {
            ReactDOM.findDOMNode(this).querySelector('input[type="search"]').blur();
        }


        /* 'next days forecast' button handling */
        displayNextDays = () => {
            this.setState({
                displayNextDaysWeather: !this.state.displayNextDaysWeather
            })
        }


        /* 'get weather' button handling */
        handleSubmit = event => {
            event.preventDefault();

            this.getCoordinates();
            this.blurSearchField();

            this.setState({
                input: '',
                localTime: {},
                displayCurrentDayWeather: false,
                displayNextDaysWeather: false,
                preloaderAlert: false,
                preloaderInfo: MESSAGE.loadingData
            });
        }


        /* input field on change handling */
        handleInputOnChange = event => {
            this.setState({ input: event.target.value });
        }


        /* input field on focus handling */
        handleInputOnFocus = () => {
            isMobile() && viewportSettingsChanger.call(this);
        }


        UNSAFE_componentWillMount = () => {
            this.getCurrentPosition();
        }


        componentDidMount = () => {
            window.onload = () => {
                isMobile() && mobileStyles.call(this);
            };

            window.onresize = () => {
                isMobile() && mobileStyles.call(this);
            };

            window.screen.orientation.onchange = () => {
                this.setState({ screenLandscapeOrientation: !this.state.screenLandscapeOrientation });

                if (isMobile()) {
                    mobileStyles.call(this);
                    viewportSettingsChanger.call(this);
                }
            };
        }


        render = () => {
            return (
                <div className='app-wrapper'>
                    <CurrentDateHeader />
                    <SearchSection
                        input = {this.state.input}
                        handleSubmit = {this.handleSubmit}
                        handleInputOnFocus = {this.handleInputOnFocus}
                        handleInputOnChange = {this.handleInputOnChange}
                    />
                    <CurrentWeather
                        localTime = {this.state.localTime}
                        location = {this.state.location}
                        currentDay = {this.state.currentDayWeatherData}
                        buttonText =  {this.state.displayNextDaysWeather ? BUTTON.currentDayForecast : BUTTON.nextDaysForecast}
                        displayNextDays = {this.displayNextDays}
                        preloaderInfo = {this.state.preloaderInfo}
                        preloaderAlert = {this.state.preloaderAlert}
                        displayComponent = {this.state.displayCurrentDayWeather}
                    />
                    <WeatherChart
                        hourlyForecast = {this.state.currentDayChartData}
                        units = {unitsChanger(this.state.units)}
                        displayComponent = {this.state.displayCurrentDayWeather}
                        switchComponent = {this.state.displayNextDaysWeather}
                    />
                    <NextDaysWeather
                        nextDays = {this.state.nextDaysWeatherData}
                        switchComponent = {this.state.displayNextDaysWeather}
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

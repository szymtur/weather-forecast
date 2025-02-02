'use strict';

import React from 'react';
import ReactDOM from 'react-dom/client';

import SearchSection from './searchSection.jsx';
import CurrentDateHeader from './currentDate.jsx';
import CurrentWeather from './currentWeather.jsx';
import WeatherChart from './weatherChart.jsx';
import NextDaysWeather from './nextDaysWeather.jsx';

import { config } from '../js/config.js';
import { BUTTON, ERROR, MESSAGE } from '../js/consts.js';

import { isMobile, viewportSettingsChanger, mobileStyles } from '../js/mobile.js';
import { capitalizeFirstLetter, placeNameChooser, prepareChartData, speedRecalculate, timestampToDate } from '../js/helpers.js';
import { ipInfoGeolocation, openStreetMapForwardGeocoding, openStreetMapReverseGeocoding, openWeatherMapGetData }  from '../js/providers.js';

import '../css/styles.css';
import '../css/responsive.css';

if (!window.Promise) { window.Promise = Promise }


document.addEventListener('DOMContentLoaded', function() {

    class Main extends React.Component {
        state = {
            currentDayChartData: {},
            currentDayWeatherData: {},
            displayCurrentDayWeather: false,
            displayNextDaysWeather: false,
            input: '',
            inputRef: React.createRef(),
            latitude: null,
            longitude: null,
            location: {},
            localTime: {},
            nextDaysWeatherData: [],
            preloaderAlert: false,
            preloaderInfo: MESSAGE.loadingData,
            screenLandscapeOrientation: window.innerHeight <= window.innerWidth,
            unitSystem: config.unitSystem
        }


        /* geolocation - getting current position by ip address from ipinfo.io */
        getCurrentPosition = async () => {
            try {
                const data = await ipInfoGeolocation();

                const [latitude, longitude] = data.loc.split(',');

                await new Promise((resolve) => {
                    this.setState({
                        latitude,
                        longitude,
                        location: { city: data.city, country: data.country.toUpperCase() }
                    }, resolve)
                });

            } catch (error) {
                console.error(`getCurrentPosition ${error}`)
                throw error;
            }

            await this.getLocationName();
            await this.getWeatherData();
        };


        /* reverse geocoding - getting city name from latitude and longitude using openstreetmap.org */
        getLocationName = async () => {
            try {
                const data = await openStreetMapReverseGeocoding(this.state.latitude, this.state.longitude);

                this.setState({
                    location: {
                        city: placeNameChooser(data.address),
                        country: data.address.country_code.toUpperCase(),
                    },
                });
            } catch (error) {
                console.error(`getLocationName ${error}`);
                throw new Error(ERROR.unableToGeocode);
            }
        };


        /* forward geocoding - getting latitude and longitude from city name using openstreetmap.org */
        getCoordinates = async () => {
            try {
                const data = await openStreetMapForwardGeocoding(this.state.input);

                this.setState({
                    latitude: parseFloat(data[0].lat).toFixed(4),
                    longitude: parseFloat(data[0].lon).toFixed(4),
                    location: { city: placeNameChooser(data[0].address), country: data[0].address.country_code.toUpperCase() },
                });
            } catch (error) {
                console.error(`getCoordinates ${error}`);
                throw error;
            }
        };


        getWeatherData = async () => {
            try {
                const data = await openWeatherMapGetData(this.state.latitude, this.state.longitude);

                this.setState({
                    currentDayWeatherData: {
                        temp: Math.round(data.current.temp),
                        temp_app: Math.round(data.current.feels_like),
                        pressure: Math.round(data.current.pressure),
                        humidity: Math.round((data.current.humidity * 100) / 100),
                        wind: speedRecalculate(this.state.unitSystem, data.current.wind_speed),
                        description: capitalizeFirstLetter(data.current.weather[0].description),
                        icon: data.current.weather[0].icon
                    },
                    nextDaysWeatherData: data.daily.map((next_day) => ({
                        temp: Math.round(next_day.temp.day),
                        pressure: Math.round(next_day.pressure),
                        humidity: Math.round((next_day.humidity * 100) / 100),
                        wind: speedRecalculate(this.state.unitSystem, next_day.wind_speed),
                        date: timestampToDate(next_day.dt, data.timezone_offset),
                        description: next_day.weather[0].description.toLowerCase(),
                        icon: next_day.weather[0].icon
                    })),
                    localTime: timestampToDate(data.current.dt, data.timezone_offset),
                    currentDayChartData: prepareChartData(data.hourly, data.timezone_offset),
                    displayCurrentDayWeather: true
                });
            } catch (error) {
                console.error(`getWeatherData ${error}`);
                throw error;
            }
        };


        /* removing focus from search field */
        blurSearchField = () => {
            this.state.inputRef.current && this.state.inputRef.current.blur();
        };


        /* 'next days forecast' button handling */
        displayNextDays = () => {
            this.setState({
                displayNextDaysWeather: !this.state.displayNextDaysWeather
            });
        };


        /* 'get weather' button handling */
        handleSubmit = (event) => {
            event.preventDefault();

            this.setState({
                input: '',
                displayCurrentDayWeather: false,
                displayNextDaysWeather: false,
                preloaderAlert: false,
                preloaderInfo: MESSAGE.loadingData
            });

            this.blurSearchField();

            this.getCoordinates()
                .then(() => {
                    return this.getWeatherData();
                })
                .catch((error) => {
                    console.error(`handleSubmit ${error}`);

                    this.setState({
                        preloaderAlert: true,
                        preloaderInfo: error.message === ERROR.noData ? MESSAGE.wrongCityName : MESSAGE.connectionError
                    });
                });
        }


        /* input field on change handling */
        handleInputOnChange = (event) => {
            this.setState({ input: event.target.value });
        };


        /* input field on focus handling */
        handleInputOnFocus = () => {
            isMobile() && viewportSettingsChanger.call(this);
        };


        componentDidMount = () => {
            this.getCurrentPosition().catch((error) => {
                this.setState({
                    preloaderAlert: true,
                    preloaderInfo: [ERROR.unableToGeolocation,
                        ERROR.unableToGeocode].includes(error.message) ? MESSAGE.enterManually : MESSAGE.connectionError
                });

                console.error(`componentDidMount ${error}`);
            });


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
        };


        render = () => {
            return (
                <div className='app-wrapper'>
                    <CurrentDateHeader />
                    <SearchSection
                        handleInputOnChange = {this.handleInputOnChange}
                        handleInputOnFocus = {this.handleInputOnFocus}
                        handleSubmit = {this.handleSubmit}
                        input = {this.state.input}
                        inputRef = {this.state.inputRef}
                    />
                    <CurrentWeather
                        buttonText =  {this.state.displayNextDaysWeather ? BUTTON.currentDayForecast : BUTTON.nextDaysForecast}
                        currentDay = {this.state.currentDayWeatherData}
                        displayComponent = {this.state.displayCurrentDayWeather}
                        displayNextDays = {this.displayNextDays}
                        localTime = {this.state.localTime}
                        location = {this.state.location}
                        preloaderAlert = {this.state.preloaderAlert}
                        preloaderInfo = {this.state.preloaderInfo}
                        unitSystem = {this.state.unitSystem}
                    />
                    <WeatherChart
                        displayComponent = {this.state.displayCurrentDayWeather}
                        hourlyForecast = {this.state.currentDayChartData}
                        switchComponent = {this.state.displayNextDaysWeather}
                        unitSystem = {this.state.unitSystem}
                    />
                    <NextDaysWeather
                        nextDays = {this.state.nextDaysWeatherData}
                        unitSystem = {this.state.unitSystem}
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

    const root = ReactDOM.createRoot(document.getElementById("app"));

    root.render(<App />);
});

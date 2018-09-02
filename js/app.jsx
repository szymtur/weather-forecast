import React from 'react';
import ReactDOM from 'react-dom';
import CurrentDate from './currentDate.jsx';
import CurrentWeather from './currentWeather.jsx';
import apiConfig from './apiConfig.js';
import NextDaysWeather from './nextDaysWeather.jsx';
import '../css/styles.css';

document.addEventListener('DOMContentLoaded', function(){

    class Main extends React.Component{
        state = {
            appid: apiConfig.appid,
            units: apiConfig.units,
            lang: apiConfig.lang,
            input: "",
            displayNextDaysWeather: 'none',
            currentDay: {city: '', temp: '', pressure: '', humidity: '', description: '', icon: '', id: ''},
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
            this.getNextDaysData ();
            this.setState({
                input: ""
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

        //get current weather info from api
        getData () {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.input.trim()}&units=${this.state.units}&lang=${this.state.lang}&appid=${this.state.appid}`)
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                } 
                else {
                    //errors handling
                    if(resp.status == 400 || resp.status == 404){
                        this.setState({
                            currentDay: {city: 'wrong city name'},
                            nextDay__1: {temp: ''},
                            nextDay__2: {temp: ''},
                            nextDay__3: {temp: ''},
                            nextDay__4: {temp: ''},
                            nextDay__5: {temp: ''},
                        })
                    }
                    throw new Error(resp.statusText);
                }
            })
            .then(data => {
                if(this.state.units == 'metric'){
                    this.setState({
                        currentDay: {
                            city: data.name, 
                            temp: `${Math.round(data.main.temp)} \u00b0C`, 
                            pressure: `${Math.round(data.main.pressure)} hPa`, 
                            humidity: `${data.main.humidity} %`, 
                            description: data.weather[0].description, 
                            icon: data.weather[0].icon,
                            id: data.weather[0].id
                        }
                    })
                }
                else if(this.state.units == 'imperial'){
                    this.setState({
                        currentDay: {
                            city: data.name, 
                            temp: `${Math.round(data.main.temp)} \u00b0F`, 
                            pressure: `${Math.round(data.main.pressure)} hPa`, 
                            humidity: `${data.main.humidity} %`, 
                            description: data.weather[0].description, 
                            icon: data.weather[0].icon,
                            id: data.weather[0].id
                        }
                    })
                }
                else{
                    this.setState({
                        currentDay: {
                            city: data.name, 
                            temp: `${Math.round(data.main.temp)} \u00b0K`, 
                            pressure: `${Math.round(data.main.pressure)} hPa`, 
                            humidity: `${data.main.humidity} %`, 
                            description: data.weather[0].description, 
                            icon: data.weather[0].icon,
                            id: data.weather[0].id
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            });
        }

        //get next five days weather info from api
        getNextDaysData () {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.input.trim()}&units=${this.state.units}&lang=${this.state.lang}&appid=${this.state.appid}`)
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    //errors handling
                    if(resp.status == 400 || resp.status == 404){
                        this.setState({
                            currentDay: {
                                city: 'wrong city name'
                            }
                        })
                    }
                    throw new Error(resp.statusText);
                }
            })
            .then(data => {
                updateStateDay__1(data, 7);
                updateStateDay__2(data, 15);
                updateStateDay__3(data, 23);
                updateStateDay__4(data, 31);
                updateStateDay__5(data, 39);
            })
            .catch(error => {
                console.log(error)
            });

            let updateStateDay__1 = (data, a) => {
                this.setState({
                    nextDay__1: {
                        temp: `${Math.round(data.list[a].main.temp)}`,
                        date: `${data.list[a].dt_txt.substring(0, 10).split('-').reverse().join('-')}`,
                        pressure: `${Math.round(data.list[a].main.pressure)} hPa`,
                        humidity: `${data.list[a].main.humidity} %`,
                        description: data.list[a].weather[0].description,
                        icon: data.list[a].weather[0].icon,
                        id: data.list[a].weather[0].id
                    }
                })
            }

            let updateStateDay__2 = (data, a) => {
                this.setState({
                    nextDay__2: {
                        temp: `${Math.round(data.list[a].main.temp)}`,
                        date: `${data.list[a].dt_txt.substring(0, 10).split('-').reverse().join('-')}`,
                        pressure: `${Math.round(data.list[a].main.pressure)} hPa`,
                        humidity: `${data.list[a].main.humidity} %`,
                        description: data.list[a].weather[0].description,
                        icon: data.list[a].weather[0].icon,
                        id: data.list[a].weather[0].id
                    }
                })
            }

            let updateStateDay__3 = (data, a, d) => {
                this.setState({
                    nextDay__3: {
                        temp: `${Math.round(data.list[a].main.temp)}`,
                        date: `${data.list[a].dt_txt.substring(0, 10).split('-').reverse().join('-')}`,
                        pressure: `${Math.round(data.list[a].main.pressure)} hPa`,
                        humidity: `${data.list[a].main.humidity} %`,
                        description: data.list[a].weather[0].description,
                        icon: data.list[a].weather[0].icon,
                        id: data.list[a].weather[0].id
                    }
                })
            }

            let updateStateDay__4 = (data, a) => {
                this.setState({
                    nextDay__4: {
                        temp: `${Math.round(data.list[a].main.temp)}`,
                        date: `${data.list[a].dt_txt.substring(0, 10).split('-').reverse().join('-')}`,
                        pressure: `${Math.round(data.list[a].main.pressure)} hPa`,
                        humidity: `${data.list[a].main.humidity} %`,
                        description: data.list[a].weather[0].description,
                        icon: data.list[a].weather[0].icon,
                        id: data.list[a].weather[0].id
                    }
                })
            }

            let updateStateDay__5 = (data, a) => {
                this.setState({
                    nextDay__5: {
                        temp: `${Math.round(data.list[a].main.temp)}`,
                        date: `${data.list[a].dt_txt.substring(0, 10).split('-').reverse().join('-')}`,
                        pressure: `${Math.round(data.list[a].main.pressure)} hPa`,
                        humidity: `${data.list[a].main.humidity} %`,
                        description: data.list[a].weather[0].description,
                        icon: data.list[a].weather[0].icon,
                        id: data.list[a].weather[0].id
                    }
                })
            }            
        }


        render(){
            return(
                <div>
                    <div className="header">
                        <h2 className="caption">Weather Forecast</h2>
                        <CurrentDate />
                    </div>

                    <div  className="search">
                        <form onSubmit={ this.handleSubmit }>
                            <input type="text" onChange={ this.handleInput } value={ this.state.input } placeholder = "city"/>
                            <input type="submit" value="get weather" />
                        </form>
                    </div>

                    <CurrentWeather 
                        currentDay = {this.state.currentDay}
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
            return <Main />
        }
    }
    

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
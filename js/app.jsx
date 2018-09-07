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
            appid: apiConfig.appid,
            units: apiConfig.units,
            lang: apiConfig.lang,
            input: "",
            placeholder: 'city',
            displayNextDaysWeather: 'none',
            nextDaysDataList: [],
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
            this.getNextDaysData();
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


        //get current weather info from api
        getData () {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.input.trim()}&units=${this.state.units}&lang=${this.state.lang}&appid=${this.state.appid}`)
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
                    }
                })
            })
            .catch(error => {
                console.log(error)
            });
        }


        //get five days weather info from api
        getNextDaysData () {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.input.trim()}&units=${this.state.units}&lang=${this.state.lang}&appid=${this.state.appid}`)
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(resp.statusText);
                }
            })
            .then(data => {
                updateStateDay__1(data, this.state.nextDaysDataList[0]);
                updateStateDay__2(data, this.state.nextDaysDataList[1]);
                updateStateDay__3(data, this.state.nextDaysDataList[2]);
                updateStateDay__4(data, this.state.nextDaysDataList[3]);
                updateStateDay__5(data, this.state.nextDaysDataList[4]);
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


        componentWillMount(){
            //add background color on mobile devices
            if (/iphone|ipod|ipad|blackberry|Android|webOS|IEMobile/i.test(navigator.userAgent)){
                document.querySelector("body").style.background = "#e0e0e0";
            }

            //depending on the current hour, selects the weather data from 12pm for the next days 
            let currentHour = new Date().getHours();

            if(currentHour >= 8 && currentHour < 11){
                this.setState({
                    nextDaysDataList: [1, 9, 17, 25, 33]
                })
            }
            else if(currentHour >= 5 && currentHour < 8){
                this.setState({
                    nextDaysDataList: [2, 10, 18, 26, 34]
                })
            }
            else if(currentHour >= 2 && currentHour < 5){
                this.setState({
                    nextDaysDataList: [3, 11, 19, 27, 35]
                })
            }
            else if(currentHour >= 23 && currentHour < 2){
                this.setState({
                    nextDaysDataList: [4, 12, 20, 28, 36]
                })
            }
            else if(currentHour >= 20 && currentHour < 23){
                this.setState({
                    nextDaysDataList: [5, 13, 21, 29, 37] 
                })
            }
            else if(currentHour >= 17 && currentHour < 20){
                this.setState({
                    nextDaysDataList: [6, 14, 22, 30, 38] 
                })
            }
            else if(currentHour >= 14 && currentHour < 17){
                this.setState({
                    nextDaysDataList: [7, 15, 23, 31, 39] 
                })
            }
            else if(currentHour >= 11 && currentHour < 14){
                this.setState({
                    nextDaysDataList: [8, 16, 24, 32, 39]
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
                        <form onSubmit={this.handleSubmit}>
                                <input 
                                    type="search" 
                                    onChange={this.handleInput} 
                                    value={this.state.input} 
                                    placeholder={this.state.placeholder} 
                                    className={this.state.placeholder === 'city' ? 'normal' : 'warning'}
                                    // autoFocus
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
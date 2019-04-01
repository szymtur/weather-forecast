import React from 'react';

class CurrentIcon extends React.Component {
    render() {

        //function for selecting icons based on weather id and icon id
        const selectIcon = (id, icon) => {
            let html;
    
            if(id == 800 && icon[3] == 'd'){
                return html = <i className="wi wi-day-sunny" />
            }
            else if(id == 800 && icon[3] == 'n'){
                return html = <i className="wi wi-night-clear" />
            }
            else if(id == 801 && icon[3] == 'd'){
                return html = <i className="wi wi-day-cloudy" />
            }
            else if(id == 801 && icon[3] == 'n'){
                return html = <i className="wi wi-night-cloudy" />
            }
            else if(id == 802 && icon[3] == 'd'){
                return html = <i className="wi wi-day-cloudy" />
            }
            else if(id == 802 && icon[3] == 'n'){
                return html = <i className="wi wi-night-cloudy" />
            }
            else if(id == 803 && icon[3] == 'd'){
                return html = <i className="wi wi-day-cloudy-high" />
            }
            else if(id == 803 && icon[3] == 'n'){
                return html = <i className="wi wi-night-cloudy-high" />
            }
            else if(id == 804 && icon[3] == 'd'){
                return html = <i className="wi wi-day-cloudy-high" />
            }
            else if(id == 804 && icon[3] == 'n'){
                return html = <i className="wi wi-night-cloudy-high" />
            }
            else if(id == 900 && icon[3] == 'd'){
                return html = <i className="wi wi-day-rain" />
            }
            else if(id == 900 && icon[3] == 'n'){
                return html = <i className="wi wi-night-rain" />
            }
            else if(id >= 701 && id <= 781 && icon[3] == 'd'){
                return html = <i className="wi wi-day-fog" />
            }
            else if(id >= 701 && id <= 781 && icon[3] == 'n'){
                return html = <i className="wi wi-night-fog" />
            }
            else if(id >= 600 && id <= 622 && icon[3] == 'd'){
                return html = <i className="wi wi-day-snow" />
            }
            else if(id >= 600 && id <= 622 && icon[3] == 'n'){
                return html = <i className="wi wi-night-snow" />
            }
            else if(id == 511 && icon[3] == 'd'){
                return html = <i className="wi wi-day-snow" />
            }
            else if(id == 511 && icon[3] == 'n'){
                return html = <i className="wi wi-night-snow" />
            }
            else if(id >= 500 && id <= 504 && icon[3] == 'd'){
                return html = <i className="wi wi-day-rain" />
            }
            else if(id >= 500 && id <= 504 && icon[3] == 'n'){
                return html = <i className="wi wi-night-rain" />
            }
            else if(id >= 520 && id <= 531 && icon[3] == 'd'){
                return html = <i className="wi wi-day-rain" />
            }
            else if(id >= 520 && id <= 531 && icon[3] == 'n'){
                return html = <i className="wi wi-night-rain" />
            }
            else if(id >= 300 && id <= 321 && icon[3] =='d'){
                return html = <i className="wi wi-day-showers" />
            }
            else if(id >= 300 && id <= 321 && icon[3] == 'n'){
                return html = <i className="wi wi-night-showers" />
            }
            else if(id >= 200 && id <= 233 && icon[3] == 'd'){
                return html = <i className="wi wi-day-thunderstorm" />
            }
            else if(id >= 200 && id <= 233 && icon[3] == 'n'){
                return html = <i className="wi wi-night-thunderstorm" />
            }
        }

        return(
            <div className={"current-icon"}>
                { selectIcon(this.props.id, this.props.icon) }
            </div>
        )
    }
}

export default CurrentIcon;
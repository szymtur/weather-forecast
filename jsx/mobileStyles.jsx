//adds background color and margin for '.current-date' container on mobile devices
//changes padding-top for '.main-preloader' container on mobile devices

import isMobile from '../js/isMobile.js'

document.addEventListener('DOMContentLoaded', () => {

    if (isMobile.any()) {

        //changes the background color
        document.querySelector("body").style.background = "#d3d3d3";

		//starts the function on window loading
		window.onload = () => {
			changeCurrentDateMargin();
			mainPreloaderPosition();
		};

		//starts the function when the window is resized
		window.onresize = () => {
			changeCurrentDateMargin();
			mainPreloaderPosition();
		}

        //changes the size of the 'current-date' container margin depending on the device's orientation
        let changeCurrentDateMargin = () => {
            if (Math.abs(window.orientation) === 90) {
                document.querySelector('.current-date').style.marginTop ='0';
            } 
            else {
                document.querySelector('.current-date').style.marginTop ='10px';
            }
        }

        let mainPreloaderPosition = () => {
            if(!document.querySelector('.current-weather')) {
                if (Math.abs(window.orientation) === 90) {
                    document.querySelector('.main-preloader').style.paddingTop ='1em';
                } 
                else {
                    document.querySelector('.main-preloader').style.paddingTop ='5em';
                }
            }
		}
    }
});
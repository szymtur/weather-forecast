/*
    adds background color and margin for '.current-date' container on mobile devices
    changes padding-top for '.main-preloader' container on mobile devices
*/

import {isMobile} from './appHandler.jsx';

document.addEventListener('DOMContentLoaded', () => {
    if (isMobile()) {

        /* changes the background color and body height */
        const body = document.querySelector("body")
        // body.style.background = "#d3d3d3";
        // body.style.height = "fit-content";

        /* starts the function on window loading */
        window.onload = () => {
            changeCurrentDateMargin();
            mainPreloaderPosition();
        };

        /* starts the function when the window is resized */
        window.onresize = () => {
            changeCurrentDateMargin();
            mainPreloaderPosition();
        };

        /* changes the size of the 'current-date' container margin depending on the device's orientation */
        let changeCurrentDateMargin = () => {
            if (window.innerHeight > window.innerWidth) {
                document.querySelector('.current-date').style.marginTop ='0.75em';
            }
            else {
                document.querySelector('.current-date').style.marginTop ='0.25em';
            }
        }

        let mainPreloaderPosition = () => {
            if(!document.querySelector('.current-weather')) {
                if (window.innerHeight > window.innerWidth) {
                    document.querySelector('.main-preloader').style.paddingTop ='5em';
                }
                else {
                    document.querySelector('.main-preloader').style.paddingTop ='1em';
                }
            }
        }
    }
});

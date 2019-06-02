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


            const input = document.querySelector('input[type="search"]');

            input.addEventListener("focus", function() {
                viewportHigh();
                console.log('click')
            });
        };


        /* starts the function when the window is resized */
        window.onresize = () => {
            changeCurrentDateMargin();
            mainPreloaderPosition();
            viewportHigh();

        };

        window.addEventListener("orientationchange", function() {
            document.querySelector('input[type="search"]').blur();
            console.log(document.querySelector('input[type="search"]'))
        }, false);

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
                    document.querySelector('.main-preloader').style.paddingTop ='1em';
                }
                else {
                    document.querySelector('.main-preloader').style.paddingTop ='5em';
                }
            }
        }

        let viewportHigh = () => {
            const viewport = document.querySelector("meta[name=viewport]");
            if(window.innerHeight > window.innerWidth) {
                viewport.setAttribute('content', 'width=device-width, height=810, initial-scale=1, maximum-scale=1, shrink-to-fit=yes');
            }
            else {
                viewport.setAttribute('content', 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, shrink-to-fit=yes');
            }
        }

        // function lock() {
            // document.querySelector('input[type="search"]').addEventListener("focus", function() {
                // console.log('click')

            // if(window.innerHeight > window.innerWidth) {
            //     viewport = document.querySelector("meta[name=viewport]");
            //     viewport.setAttribute('content', 'height=810px');

                // document.querySelector('#app').style.height = '810px';
                // document.querySelector('#app').style.color = 'pink';
            


            // }
            // else {
                // window.screen.lockOrientation('landscape')
            // }


            // });
        // }

    }
});
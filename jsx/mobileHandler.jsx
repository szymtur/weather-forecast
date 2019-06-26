class MobileHandler {

    /* function to detect mobile devices */
    isMobile() {
        const mobileDevices = [
            (/Android/i).test(navigator.userAgent),
            (/BlackBerry|RIM|BB|PlayBook/i).test(navigator.userAgent),
            (/iPhone|iPad|iPod/i).test(navigator.userAgent),
            (/Opera Mini/i).test(navigator.userAgent),
            (/IEMobile|WPDesktop|Nokia|Windows Phones/i).test(navigator.userAgent),
            (/webOS/i).test(navigator.userAgent),
            (/Kindle|Silk|KFAPW|KFARWI|KFASWI|KFFOWI|KFJW|KFMEWI|KFOT|KFSAW|KFSOWI|KFTBW|KFTHW|KFTT|WFFOWI/i).test(navigator.userAgent)
        ];
        return mobileDevices.some(isMobileDevice => isMobileDevice);
    }

    /* function to change viewport settings */
    viewportSettingsChanger() {
        const viewport = document.querySelector('meta[name="viewport"]');

        if(this.state.screenLandscapeOrientation) {
            viewport.setAttribute('content', `width=device-width, height=device-height, initial-scale=1, maximum-scale=1, shrink-to-fit=yes`)
        }
        else {
            viewport.setAttribute('content', `width=device-width, height=850, initial-scale=1, maximum-scale=1, shrink-to-fit=yes`)
        }
    }

    /* function to add custom styles for mobile devices */
    mobileStyles() {
        const mainContainer = document.querySelector('#app');
        const mainPreloader = document.querySelector('.main-preloader');
        const WeatherContainer = document.querySelector('.current-weather');

        let mainContainerWidth = mainContainer.offsetWidth;
        let mainContainerHeight = mainContainer.offsetHeight;

        /* styles for body */
        document.querySelector("body").style.background = "#d3d3d3";

        /* styles for main preloader depending on the device's orientation */
        if(!WeatherContainer) {
            if (this.state.screenLandscapeOrientation && window.innerHeight <= mainContainerHeight / 1.65) {
                mainPreloader.style.paddingTop ='1em';
            }
            else {
                mainPreloader.style.paddingTop ='5em';
            }
        }

        /* styles for main container depending on screen resolution */
        if(window.innerHeight > mainContainerHeight * 1.05 && window.innerWidth > mainContainerWidth * 1.05) {
            mainContainer.style.boxShadow = '0 0 4px black';
        }
        else {
            mainContainer.style.boxShadow = 'none';
        }
    }
}

const handler = new MobileHandler('rwerwer');

const isMobile = handler.isMobile;
const viewportSettingsChanger = handler.viewportSettingsChanger;
const mobileStyles = handler.mobileStyles;

export {isMobile, viewportSettingsChanger, mobileStyles};
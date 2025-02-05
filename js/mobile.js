'use strict';

/* function to detect mobile devices */
function isMobile() {
    const mobileDevices = [
        (/Android/i).test(navigator.userAgent),
        (/BlackBerry|RIM|BB|PlayBook/i).test(navigator.userAgent),
        (/iPhone|iPad|iPod/i).test(navigator.userAgent),
        (/Opera Mini/i).test(navigator.userAgent),
        (/IEMobile|WPDesktop|Nokia|Windows Phones/i).test(navigator.userAgent),
        (/webOS/i).test(navigator.userAgent),
        (/Kindle|Silk|KFAPW|KFARWI|KFASWI|KFFOWI|KFJW|KFMEWI|KFOT|KFSAW|KFSOWI|KFTBW|KFTHW|KFTT|WFFOWI/i).test(navigator.userAgent)
    ];

    return mobileDevices.some((isMobileDevice) => isMobileDevice);
}

/* function to change viewport settings */
function viewportSettingsChanger() {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    const viewportSettings = {
        landscape: `width=device-width, height=device-height, initial-scale=1, maximum-scale=1, shrink-to-fit=yes`,
        portrait: `width=device-width, height=850, initial-scale=1, maximum-scale=1, shrink-to-fit=yes`
    };

    if(this.state.screenLandscapeOrientation) {
        viewportMeta.setAttribute('content', viewportSettings.landscape);
    } else {
        viewportMeta.setAttribute('content', viewportSettings.portrait);
    }
}

/* function to add custom styles for mobile devices */
function mobileStyles() {
    const mainContainer = document.querySelector('#app');
    const mainPreloader = document.querySelector('.main-preloader');
    const weatherContainer = document.querySelector('.current-weather');

    const mainContainerWidth = mainContainer.offsetWidth;
    const mainContainerHeight = mainContainer.offsetHeight;

    /* styles for body */
    document.body.classList.add('mobile-background');

    /* styles for main preloader depending on the device's orientation */
    if(!weatherContainer) {
        if (this.state.screenLandscapeOrientation && window.innerHeight <= mainContainerHeight / 1.5) {
            mainPreloader.style.paddingTop ='3em';
        }
        else {
            mainPreloader.style.paddingTop ='8em';
        }
    }

    /* styles for main container depending on screen resolution */
    if(window.innerHeight > mainContainerHeight * 1.05 && window.innerWidth > mainContainerWidth * 1.05) {
        mainContainer.style.boxShadow = '0 0 4px black';
    } else {
        mainContainer.style.boxShadow = 'none';
    }
}

export {
    isMobile,
    viewportSettingsChanger,
    mobileStyles
};

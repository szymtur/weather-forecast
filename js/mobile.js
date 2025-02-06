'use strict';

/* function to detect mobile devices */
function checkIsMobile() {
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

    if(this.props.isLandscape) {
        viewportMeta.setAttribute('content', viewportSettings.landscape);
    } else {
        viewportMeta.setAttribute('content', viewportSettings.portrait);
    }
}

/* function to add custom styles for mobile devices */
function mobileStyles() {
    const mainContainer = document.getElementById("app");

    const widthThreshold = mainContainer.offsetWidth * 1.05;
    const heightThreshold = mainContainer.offsetHeight * 1.05;

    mainContainer.classList.toggle("mobile-app-shadow", window.innerWidth > widthThreshold && window.innerHeight > heightThreshold);
    mainContainer.style.width = (this.state.isLandscape ? '620px' : '500px');

    if (!document.body.classList.contains('mobile-background')) {
        document.body.classList.add('mobile-background');
    }
}

export {
    checkIsMobile,
    viewportSettingsChanger,
    mobileStyles
};

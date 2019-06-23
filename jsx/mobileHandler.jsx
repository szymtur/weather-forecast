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

    /* function to check screen orientation on document load */
    screenOrientationChecker() {
        if (window.matchMedia('(orientation: portrait)').matches) {
            this.setState({
                landscapeOrientation: false
            });
        }
        if (window.matchMedia('(orientation: landscape)').matches) {
            this.setState({
                landscapeOrientation: true
            });
        }
    }

    /* function to updete screen orientation on screen orientation change */
    screenOrientationUpdater() {
        if(this.state.landscapeOrientation) {
            this.setState({
                landscapeOrientation: false
            });
        }
        else {
            this.setState({
                landscapeOrientation: true
            }); 
        }
    }

    /* function to change viewport settings */
    viewportSettingsChanger() {
        if(this.state.landscapeOrientation) {
            this.setState({
                viewportSettings: 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, shrink-to-fit=yes'
            })
        }
        else {
            this.setState({
                viewportSettings: 'width=device-width, height=850, initial-scale=1, maximum-scale=1, shrink-to-fit=yes'
            })
        }
    }

    /* function to add custom styles for mobile devices */
    mobileStyles() {
        const body = document.querySelector("body")
        const mainPreloader = document.querySelector('.main-preloader');
        body.style.background = "#d3d3d3";

        if(!document.querySelector('.current-weather')) {
            if (this.state.landscapeOrientation) {
                mainPreloader.style.paddingTop ='1em';
            }
            else {
                mainPreloader.style.paddingTop ='5em';
            }
        }
    }
}

const handler = new MobileHandler();

const isMobile = handler.isMobile;
const screenOrientationChecker = handler.screenOrientationChecker;
const screenOrientationUpdater = handler.screenOrientationUpdater;
const viewportSettingsChanger = handler.viewportSettingsChanger;
const mobileStyles = handler.mobileStyles;

export {isMobile, screenOrientationChecker, screenOrientationUpdater, viewportSettingsChanger, mobileStyles};

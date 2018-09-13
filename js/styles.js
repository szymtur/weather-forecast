
//adds background color and 'current-date' container margin in mobile devices

document.addEventListener('DOMContentLoaded', function(){

    if (/iphone|ipod|ipad|blackberry|Android|webOS|IEMobile/i.test(navigator.userAgent)){

        //changes the background color
        document.querySelector("body").style.background = "#e0e0e0";

        //starts the function on window loading
        window.onload = function () {
            changeMargin();
        };

        //starts the function when the window is resized
        window.onresize = function () {
            changeMargin();
        }

        //changes the size of the 'current-date' container margin depending on the device's orientation
        changeMargin = () => {
            if (Math.abs(window.orientation) === 90) {
                document.querySelector('.current-date').style.marginTop ='0';
            } 
            else {
                document.querySelector('.current-date').style.marginTop ='10px';
            }
        }
    }
});
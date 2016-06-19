"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.smoothScroll = smoothScroll;
function smoothScroll(startY, stopY) {
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    /*
    if (distance < 100) {
        window.scrollTo(0, stopY);
        return 
    }
    */
    var speed = Math.round(distance / 30);
    if (speed >= 50) speed = 50;
    var step = Math.round(distance / 10);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        /*
        console.log("scrolling");
        for ( var i=startY; i<stopY; i+=step ) {
            ( (offset)=>{
                setTimeout( ()=>window.scrollTo(0, offset) , timer * speed);
            })(leapY);
            leapY += step; 
            if (leapY > stopY) leapY = stopY; 
            timer++;
        }*/
        console.log(stopY);
        (function (offset) {
            setTimeout(function () {
                return window.scrollTo(0, offset);
            }, 300);
        })(stopY);
    } else {
        for (var i = startY; i > stopY; i -= step) {
            (function (offset) {
                setTimeout(function () {
                    return window.scrollTo(0, offset);
                }, timer * speed);
            })(leapY);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
        }
    }
}
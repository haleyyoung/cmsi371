/*
 * This javaScript file is a canvas-based web page which generates a 3d cube wire
 * frame with sides of different shades, per request of problem 27b. Note the colors 
 * have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        radialGradient = renderingContext.createRadialGradient(160, 160, 1, 180, 180, 320);

    // Put your canvas drawing code (and any other code) here.
    radialGradient.addColorStop(0, "white");
    radialGradient.addColorStop(1, "blue");

    // The solid planet
    renderingContext.fillStyle = radialGradient;
    renderingContext.beginPath();
    renderingContext.arc(250,250,150,0,Math.PI*2,true); // Outer circle
    renderingContext.fill();

}());

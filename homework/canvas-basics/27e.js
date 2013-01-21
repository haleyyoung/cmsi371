/*
 * This javaScript file is a canvas-based web page which generates a 3d cube wire
 * frame with sides of different shades, per request of problem 27b. Note the colors 
 * have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        radialGradient = renderingContext.createRadialGradient(160, 220, 1, 180, 180, 320);

    // Gradient for the planet.
    radialGradient.addColorStop(0, "#FFE6F0");
    radialGradient.addColorStop(0.5, "#FF0066");
    radialGradient.addColorStop(0.7, "#CC0099");
    radialGradient.addColorStop(0.8, "#660066");
    radialGradient.addColorStop(1, "#660029");

    // The solid planet
    renderingContext.fillStyle = radialGradient;
    renderingContext.beginPath();
    renderingContext.arc(250,250,150,0,Math.PI*2,true);
    renderingContext.fill();
    
    // The rings around the planet
    renderingContext.strokeStyle = "black";
    renderingContext.beginPath();
    renderingContext.moveTo(102,352);
    renderingContext.bezierCurveTo(90,152,100,170,110,100);
    renderingContext.stroke();

}());

/*
 * This javaScript file is a canvas-based web page which generates a sunset scene
 * where the sunset is reflected on water, per request of problem 28b. Note
 * the colors have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        linearGradientSky = renderingContext.createLinearGradient(0,0,0,250),
        linearGradientWater = renderingContext.createLinearGradient(0,250,0,512),
        radialGradientSun = renderingContext.createRadialGradient(250, 250, 1, 180, 180, 320);

    //Colors for the sky
    linearGradientSky.addColorStop(0, "#FFFF66");
    linearGradientSky.addColorStop(0.3, "#FF4719");
    linearGradientSky.addColorStop(0.6, "#FF1975");
    linearGradientSky.addColorStop(1, "#660066");

    //Sky
    renderingContext.fillStyle = linearGradientSky;
    renderingContext.fillRect(0,0,512,512);
    renderingContext.fill();

    //Colors for the water
    linearGradientWater.addColorStop(0, "#008F00");
    linearGradientWater.addColorStop(0.05, "#0066CC");
    linearGradientWater.addColorStop(0.4, "#003366");
    linearGradientWater.addColorStop(1, "#000F1F");

    //Water
    renderingContext.fillStyle = linearGradientWater;
    renderingContext.fillRect(0,250,512,261);
    renderingContext.fill();

    //Colors for the sun
    radialGradientSun.addColorStop(0, "#FF9900");
    radialGradientSun.addColorStop(0.5, "red");

    //Sun
    renderingContext.fillStyle = radialGradientSun;
    renderingContext.beginPath();
    renderingContext.arc(250,250,100,0,Math.PI,true);
    renderingContext.fill();

    //Sun Reflection
    radialGradientSun = renderingContext.createRadialGradient(250, 250, 1, 180, 180, 320);
    renderingContext.globalAlpha = 0.5;
    renderingContext.beginPath();
    renderingContext.arc(250,250,100,Math.PI,Math.PI*2,true);
    renderingContext.fill();
    
}());

/*
 * This javaScript file is a canvas-based web page which generates a sunset scene
 * where the sunset is reflected on water, per request of problem 28b. Note
 * the colors have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        linearGradient = renderingContext.createLinearGradient(0,0,0,250);

    //Colors for the sky
    linearGradient.addColorStop(0, "#FFFF66");
    linearGradient.addColorStop(0.3, "#FF4719");
    linearGradient.addColorStop(0.6, "#FF1975");
    linearGradient.addColorStop(1, "#660066");

    //Sky
    renderingContext.fillStyle = linearGradient;
    renderingContext.fillRect(0,0,512,512);
    renderingContext.fill();
    
    //Water
    renderingContext.fillStyle = "blue";
    renderingContext.fillRect(0,250,512,261);
    renderingContext.fill();
    
    //Sun
    renderingContext.fillStyle = "red";
    renderingContext.beginPath();
    renderingContext.arc(250,250,100,0,Math.PI,true);
    renderingContext.fill();
    
    
}());

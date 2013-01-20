/*
 * This javaScript file is a canvas-based web page which generates a purpleish
 * hexagon, per request of problem 25e. Note the colors have been changed from
 * the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");

    //Creating the hexagon
    renderingContext.fillStyle = "#CC00FF";
    renderingContext.beginPath();
    renderingContext.moveTo(56,256);
    renderingContext.lineTo(156,56);
    renderingContext.lineTo(356,56);
    renderingContext.lineTo(456,256);
    renderingContext.lineTo(356,456);
    renderingContext.lineTo(156,456);
    renderingContext.fill();
}());

/*
 * This javaScript file is a canvas-based web page which generates a purpleish
 * hexagon, per request of problem 25c. Note the colors have been changed from
 * the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");

    //Creating the hexagon
    renderingContext.globalAlpha = 0.5;
    renderingContext.fillStyle = "#FF0000";
    renderingContext.fillRect(25,25,200,300);
    renderingContext.fillStyle = "#4747FF";
    renderingContext.fillRect(100,100,200,300);
    renderingContext.fill();
}());

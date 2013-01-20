/*
 * This javaScript file is a canvas-based web page which generates a purpleish
 * hexagon, per request of problem 25e. Note the colors have been changed from
 * the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");
    var i = 0,
    j = 0;
    //Creating the hexagon
    renderingContext.fillStyle = "#CC00FF";
    renderingContext.beginPath();
    renderingContext.moveTo(i,j + 20);
    renderingContext.lineTo(i + 10, j);
    renderingContext.lineTo(i + 30, j);
    renderingContext.lineTo(i + 40, j + 20);
    renderingContext.lineTo(i + 30, j + 40);
    renderingContext.lineTo(i + 10, j + 40);
    renderingContext.fill();
}());

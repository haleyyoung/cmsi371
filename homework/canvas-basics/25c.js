/*
 * This javaScript file is a canvas-based web page which generates two overlapping
 * rectangles which are 50% transparent. One red and one blue rectangle creating
 * purple in the overlapped area, per request of problem 25c. Note the colors 
 * have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");

    //Creating the rectangles, globalAlpha deals with the transparency
    renderingContext.globalAlpha = 0.5;
    renderingContext.fillStyle = "#FF0000";
    renderingContext.fillRect(25,25,200,300);
    renderingContext.fillStyle = "#4747FF";
    renderingContext.fillRect(100,100,200,300);
    renderingContext.fill();
}());

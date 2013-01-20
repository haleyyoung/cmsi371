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

    //Creating two overlapping squares
    renderingContext.fillStyle = "#FF0000";
    renderingContext.fillRect(362,362,100,100);
    renderingContext.fillStyle = "#4747FF";
    renderingContext.fillRect(412,412,100,100);
    renderingContext.fill();
    renderingContext.strokeStyle = "black";
    renderingContext.beginPath();
    renderingContext.moveTo(362,362);
    renderingContext.lineTo(412,412);
    renderingContext.moveTo(362,462);
    renderingContext.lineTo(412,512);
    renderingContext.moveTo(462,362);
    renderingContext.lineTo(512,412);
    renderingContext.stroke();
}());

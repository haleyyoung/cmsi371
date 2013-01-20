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
    renderingContext.fillStyle = "green";
    renderingContext.beginPath();
    //Back Side
    renderingContext.moveTo(362, 362);
    renderingContext.lineTo(362, 462);
    renderingContext.lineTo(462, 462);
    renderingContext.lineTo(462, 362);
    renderingContext.lineTo(362, 362);
    //Front side
    renderingContext.moveTo(512, 412);
    renderingContext.lineTo(412, 412);
    renderingContext.lineTo(412, 412);
    renderingContext.lineTo(412, 512);
    //Top Side
    renderingContext.moveTo(362,362);
    renderingContext.lineTo(412,412);
    renderingContext.lineTo(512,412);
    renderingContext.lineTo(462,362);
    renderingContext.lineTo(362,362);
    renderingContext.fill();
/*    renderingContext.moveTo(362,462);
    renderingContext.lineTo(412,512);
    renderingContext.moveTo(462,362);
    renderingContext.lineTo(512,412);*/
    renderingContext.stroke();
}());

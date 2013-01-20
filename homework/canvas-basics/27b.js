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
    renderingContext.fillStyle = "white";
    renderingContext.beginPath();
    //Back Side
    renderingContext.moveTo(361, 361);
    renderingContext.lineTo(361, 461);
    renderingContext.lineTo(461, 461);
    renderingContext.lineTo(461, 361);
    renderingContext.lineTo(361, 361);
    //Front side
    renderingContext.moveTo(511, 511);
    renderingContext.lineTo(511, 411);
    renderingContext.lineTo(411, 411);
    renderingContext.lineTo(411, 411);
    renderingContext.lineTo(411, 511);
    //Top Side
    renderingContext.moveTo(361,361);
    renderingContext.lineTo(411,411);
    renderingContext.lineTo(511,411);
    renderingContext.lineTo(461,361);
    renderingContext.lineTo(361,361);
    renderingContext.fill();
/*    renderingContext.moveTo(362,462);
    renderingContext.lineTo(412,512);
    renderingContext.moveTo(462,362);
    renderingContext.lineTo(512,412);*/
    renderingContext.stroke();
}());

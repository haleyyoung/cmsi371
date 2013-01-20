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
    //Make the outline blue
    renderingContext.strokeStyle = "blue";
    //Back Side
    renderingContext.beginPath();
    renderingContext.moveTo(361, 361);
    renderingContext.lineTo(361, 461);
    renderingContext.lineTo(461, 461);
    renderingContext.lineTo(461, 361);
    renderingContext.lineTo(361, 361);
    renderingContext.stroke();
    //Right Line to connect
    renderingContext.beginPath();
    renderingContext.moveTo(511,511);
    renderingContext.lineTo(461,461);
    renderingContext.stroke();
    //Front side
    renderingContext.fillStyle = "#008FB2";
    renderingContext.beginPath();
    renderingContext.moveTo(511, 511);
    renderingContext.lineTo(511, 411);
    renderingContext.lineTo(411, 411);
    renderingContext.lineTo(411, 511);
    renderingContext.lineTo(511, 511);
    renderingContext.fill();
    renderingContext.stroke();
    //Top Side
    renderingContext.fillStyle = "#00CCFF";
    renderingContext.beginPath();
    renderingContext.moveTo(361,361);
    renderingContext.lineTo(411,411);
    renderingContext.lineTo(511,411);
    renderingContext.lineTo(461,361);
    renderingContext.lineTo(361,361);
    renderingContext.fill();
    renderingContext.stroke();
    //Left Side
    renderingContext.fillStyle = "#005266";
    renderingContext.beginPath();
    renderingContext.moveTo(361,461);
    renderingContext.lineTo(411,511);
    renderingContext.lineTo(411,411);
    renderingContext.lineTo(361,361);
    renderingContext.lineTo(361,461);
    renderingContext.fill();
    renderingContext.stroke();
}());

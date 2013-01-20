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
    renderingContext.globalAlpha = 0.5;
    //Back Side
    renderingContext.beginPath();
    renderingContext.moveTo(180, 0);
    renderingContext.lineTo(180, 99);
    renderingContext.lineTo(280, 99);
    renderingContext.lineTo(280, 0);
    renderingContext.lineTo(180, 0);
    renderingContext.stroke();
    //Right Line to connect
    renderingContext.beginPath();
    renderingContext.moveTo(280,99);
    renderingContext.lineTo(330,149);
    renderingContext.stroke();
    //Front side
    renderingContext.fillStyle = "#008FB2";
    renderingContext.beginPath();
    renderingContext.moveTo(330, 149);
    renderingContext.lineTo(330, 49);
    renderingContext.lineTo(230, 49);
    renderingContext.lineTo(230, 149);
    renderingContext.lineTo(330, 149);
    renderingContext.fill();
    renderingContext.stroke();
    //Top Side
    renderingContext.fillStyle = "#00CCFF";
    renderingContext.beginPath();
    renderingContext.moveTo(180,0);
    renderingContext.lineTo(230,49);
    renderingContext.lineTo(330,49);
    renderingContext.lineTo(280,0);
    renderingContext.lineTo(180,0);
    renderingContext.fill();
    renderingContext.stroke();
    //Left Side
    renderingContext.fillStyle = "#005266";
    renderingContext.beginPath();
    renderingContext.moveTo(180,99);
    renderingContext.lineTo(230,149);
    renderingContext.lineTo(230,49);
    renderingContext.lineTo(180,0);
    renderingContext.lineTo(180,99);
    renderingContext.fill();
    renderingContext.stroke();
}());

/*
 * This javaScript file is a canvas-based web page which generates a 3d cube wire
 * frame with sides of different shades, per request of problem 27b. Note the colors 
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

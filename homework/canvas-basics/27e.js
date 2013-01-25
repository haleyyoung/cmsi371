/*
 * This javaScript file is a canvas-based web page which generates a 3d ringed
 * planet frame with sides of different shades, per request of problem 27e. Note
 * the colors have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        radialGradient = renderingContext.createRadialGradient(160, 220, 1, 180, 180, 320),
        radialGradientRing = renderingContext.createRadialGradient(115, 220, 1, 180, 120, 320);

    // Gradient for the planet.
    radialGradient.addColorStop(0, "#FFE6F0");
    radialGradient.addColorStop(0.5, "#FF0066");
    radialGradient.addColorStop(0.7, "#CC0099");
    radialGradient.addColorStop(0.8, "#660066");
    radialGradient.addColorStop(1, "#660029");

    // The solid planet
    renderingContext.fillStyle = radialGradient;
    renderingContext.beginPath();
    renderingContext.arc(250,250,150,0,Math.PI*2,true);
    renderingContext.fill();

    // Gradient for the ring
    radialGradientRing.addColorStop(0, "#FFE6F0");
    radialGradientRing.addColorStop(1, "#19FF19");
    

    // The rings around the planet
    // First half of ring
    renderingContext.lineWidth = 3;
    renderingContext.strokeStyle = "black";
    renderingContext.beginPath();
    //Botom of ring
    renderingContext.moveTo(100,240);
    renderingContext.quadraticCurveTo(0,280,251,288);
    //Center of ring
    renderingContext.lineTo(251,268);
    //Top of ring
    renderingContext.moveTo(251,268);
    renderingContext.quadraticCurveTo(0,260,104,220);
    //Left side of ring
    renderingContext.moveTo(104,220);
    renderingContext.arc(250,250,150,Math.PI*8.5/8, Math.PI*8.15/8, true);
    renderingContext.closePath();
    renderingContext.fill();
    renderingContext.stroke();
    // Second half of ring
    renderingContext.beginPath();
    renderingContext.moveTo(400,240);
    renderingContext.quadraticCurveTo(500,280,249,288);
    renderingContext.stroke();

}());

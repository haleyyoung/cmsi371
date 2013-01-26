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
    renderingContext.lineWidth = 20;
    renderingContext.strokeStyle = radialGradientRing;
    renderingContext.fillStyle = radialGradientRing;
    renderingContext.beginPath();
    //Botom of ring
    renderingContext.moveTo(100,240);
    renderingContext.quadraticCurveTo(10,280,251,288);
    //Center of ring
    renderingContext.lineTo(251,268);
    //Top of ring
    renderingContext.quadraticCurveTo(0,260,104,220);
    //Left side of ring
    renderingContext.lineWidth = 6;
    renderingContext.moveTo(74,260);
    renderingContext.lineTo(76, 240);
    renderingContext.closePath();
    renderingContext.fill();
    renderingContext.stroke();

    // Second half of ring    
    renderingContext.beginPath();
    renderingContext.moveTo(400,240);
    renderingContext.quadraticCurveTo(480,280,249,288);
    
        //Center of ring
    renderingContext.lineTo(251,268);
    //Top of ring
    renderingContext.quadraticCurveTo(480,260,396,220);
    //Left side of ring
    renderingContext.moveTo(421,260);
    renderingContext.lineTo(419, 240);
    renderingContext.closePath();
    renderingContext.fill();
    renderingContext.stroke();
    

}());

/*
 * This javaScript file is a canvas-based web page which generates a 3d ringed
 * planet, per request of problem 27e. Note the colors have been changed from
 * the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        radialGradient = renderingContext.createRadialGradient(160, 220, 1, 180, 180, 320),
        radialGradientRing = renderingContext.createRadialGradient(115, 220, 1, 180, 120, 320);

    var ring = { left: { bottom: [[100,240],[10,280],[251,288]],
                         center: [251,268],
                         top: [[0,260],[104,220]],
                         edge: [[74,260],[76,240]]
                       },
                 right: { bottom: [[400,240],[480,280],[249,288]],
                         center: [251,268],
                         top: [[480,260],[396,220]],
                         edge: [[421,260],[419,240]]
                        }
               };

    // Gradient for the planet.
    radialGradient.addColorStop(0, "#FFE6F0");
    radialGradient.addColorStop(0.5, "#FF0066");
    radialGradient.addColorStop(0.7, "#CC0099");
    radialGradient.addColorStop(0.8, "#660066");
    radialGradient.addColorStop(1, "#660029");

    // Gradient for the ring
    radialGradientRing.addColorStop(0, "#FFE6F0");
    radialGradientRing.addColorStop(1, "#19FF19");

    // This function draws thick a quadratic curve to make part of the ring
    var drawRing = function(side){
        renderingContext.lineWidth = 6;
        renderingContext.strokeStyle = radialGradientRing;
        renderingContext.fillStyle = radialGradientRing;
        renderingContext.beginPath();

        //Botom of ring
        renderingContext.moveTo(side.bottom[0][0], side.bottom[0][1]);
        renderingContext.quadraticCurveTo(side.bottom[1][0], side.bottom[1][1],
                                          side.bottom[2][0], side.bottom[2][1]);

        //Center of ring
        renderingContext.lineTo(side.center[0], side.center[1]);

        //Top of ring
        renderingContext.quadraticCurveTo(side.top[0][0], side.top[0][1],
                                          side.top[1][0], side.top[1][1]);

        //Outer side of ring
        renderingContext.moveTo(side.edge[0][0], side.edge[0][1]);
        renderingContext.lineTo(side.edge[1][0], side.edge[1][1]);
        renderingContext.fill();
        renderingContext.stroke();
    };

    // The solid planet
    renderingContext.fillStyle = radialGradient;
    renderingContext.beginPath();
    renderingContext.arc(250,250,150,0,Math.PI*2,true);
    renderingContext.fill();

    drawRing(ring.left);
    drawRing(ring.right);
}());

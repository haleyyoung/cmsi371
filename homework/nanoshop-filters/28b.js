/*
 * This javaScript file is a canvas-based web page which generates a sunset scene
 * where the sunset is reflected on water, per request of problem 28b. Note
 * the colors have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        linearGradientSky = renderingContext.createLinearGradient(0, 0, 0, 250),
        linearGradientWater = renderingContext.createLinearGradient(0, 250, 0, 512),
        radialGradientSun = renderingContext.createRadialGradient(250, 250, 1, 180, 180, 320);

    // Colors for the sky
    linearGradientSky.addColorStop(0, "#FFFF66");
    linearGradientSky.addColorStop(0.3, "#FF4719");
    linearGradientSky.addColorStop(0.6, "#FF1975");
    linearGradientSky.addColorStop(1, "#660066");

    // Colors for the water
    linearGradientWater.addColorStop(0, "#008F00");
    linearGradientWater.addColorStop(0.05, "#0066CC");
    linearGradientWater.addColorStop(0.4, "#003366");
    linearGradientWater.addColorStop(1, "#000F1F");

    // Colors for the sun
    radialGradientSun.addColorStop(0, "#FF9900");
    radialGradientSun.addColorStop(0.5, "red");

    var sceneElements = { 
            sky: {
                vertices: [[0, 0], [512, 512]],
                color: linearGradientSky
            },
            water: {
                vertices: [[0, 250], [512, 261]],
                color: linearGradientWater
            },
            sun: {
                radius: 100,
                center: [250, 250],
                endpoints: [0, Math.PI],
                color: radialGradientSun
            },
            reflection: {
                radius: 100,
                center: [250, 250],
                endpoints: [Math.PI, Math.PI * 2],
                opacity: 0.5,
                color: radialGradientSun
           }
    },

    // This is a function that draws a rectangular shape with a gradient
        drawBackground = function (part) {
            renderingContext.fillStyle = part.color;
            renderingContext.fillRect(part.vertices[0][0], part.vertices[0][1],
                                      part.vertices[1][0], part.vertices[1][1]);
            renderingContext.fill();
        },

    // This is a funtion that draws a circle with a gradient
        drawSun = function (part) {
            renderingContext.fillStyle = part.color;
            if (part.opacity) {
                renderingContext.globalAlpha = part.opacity;
            }
            renderingContext.beginPath();
            renderingContext.arc(part.center[0], part.center[1],
                                 part.radius,
                                 part.endpoints[0], part.endpoints[1], true);
            renderingContext.fill();
        };

    drawBackground(sceneElements.sky);
    drawBackground(sceneElements.water);
    drawSun(sceneElements.sun);
    drawSun(sceneElements.reflection);

}());

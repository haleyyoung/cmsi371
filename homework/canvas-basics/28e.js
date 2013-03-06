/*
 * This javaScript file is a canvas-based web page which generates a skyline scene
 * where buildings are in silhouette, per request of problem 28e. Note the colors
 * have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        linearGradient = renderingContext.createLinearGradient(0, 0, 0, 512);

    // Colors for the sky
    linearGradient.addColorStop(0, "#FFFF66");
    linearGradient.addColorStop(0.3, "#FF4719");
    linearGradient.addColorStop(0.6, "#FF1975");
    linearGradient.addColorStop(1, "#660066");

    // Sky
    renderingContext.fillStyle = linearGradient;
    renderingContext.fillRect(0, 0, canvas.width, canvas.height);
    renderingContext.fill();

    // Buildings
    var xPlacement = 0,
        rightMostPixel = canvas.width - 1;
        width = 50 * Math.random() + 25;
    while (xPlacement + width < rightMostPixel) {
        // Building
        var height = 200 * Math.random() + 200;
        renderingContext.fillStyle = "black";
        renderingContext.fillRect(xPlacement, rightMostPixel - height, width, height);
        renderingContext.fill();

        // Windows
        var numberOfWindows = Math.ceil(7 * Math.random());
        for (var i = 0; i <= numberOfWindows; i++) {
            renderingContext.fillStyle = "yellow";
            renderingContext.fillRect(xPlacement + width / 2 - 10,
                rightMostPixel - height + 5 + (i * (height / numberOfWindows)),
                20, 20);
            renderingContext.fill();
        }
        xPlacement += width + 10;
    }

}());

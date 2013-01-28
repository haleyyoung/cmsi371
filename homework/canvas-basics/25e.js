/*
 * This javaScript file is a canvas-based web page which generates a purpleish
 * hexagon, per request of problem 25e. Note the colors have been changed from
 * the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),

        hexagonVertices = [[56, 256], [156, 56], [356, 56], [456, 256],
                           [356, 456], [156, 456]];

    //Creating the hexagon
    renderingContext.fillStyle = "#CC00FF";
    renderingContext.beginPath();
    renderingContext.moveTo(hexagonVertices[0][0], hexagonVertices[0][1]);
    renderingContext.lineTo(hexagonVertices[1][0], hexagonVertices[1][1]);
    renderingContext.lineTo(hexagonVertices[2][0], hexagonVertices[2][1]);
    renderingContext.lineTo(hexagonVertices[3][0], hexagonVertices[3][1]);
    renderingContext.lineTo(hexagonVertices[4][0], hexagonVertices[4][1]);
    renderingContext.lineTo(hexagonVertices[5][0], hexagonVertices[5][1]);
    renderingContext.fill();
}());

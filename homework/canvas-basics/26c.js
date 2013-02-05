/*
 * This javaScript file is a canvas-based web page which generates a grid of
 * hexagons like a honeycomb, per request of problem 26c. Note the colors have
 * been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        hexagonVertices = [[0, 20], [10, 0], [30, 0], [40, 20], [30, 40], [10, 40]];

    //Generating multiple hexagons in an offset grid
    // JD: Not *quite* a honeycomb, but good try :)
    //     This is what you're after:
    //
    //         http://austinreed.files.wordpress.com/2008/09/honeycomb1.gif
    //
    for (var i = 0; i < 256; i += 42) {
        var j = 0;
        if (i % 84 === 0) { // JD: Or, if (!(i % 84)) {
            j = 22;
        }
        for (j; j < 256; j += 42) {
            // JD: You can leave the first clause blank in this case.
            //Creating one hexagon
            renderingContext.fillStyle = "yellow";
            renderingContext.beginPath();
            renderingContext.moveTo(j + hexagonVertices[0][0], i + hexagonVertices[0][1]);
            renderingContext.lineTo(j + hexagonVertices[1][0], i + hexagonVertices[1][1]);
            renderingContext.lineTo(j + hexagonVertices[2][0], i + hexagonVertices[2][1]);
            renderingContext.lineTo(j + hexagonVertices[3][0], i + hexagonVertices[3][1]);
            renderingContext.lineTo(j + hexagonVertices[4][0], i + hexagonVertices[4][1]);
            renderingContext.lineTo(j + hexagonVertices[5][0], i + hexagonVertices[5][1]);
            renderingContext.fill();
        }
    }
}());

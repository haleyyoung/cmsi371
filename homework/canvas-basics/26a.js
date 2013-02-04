/*
 * This javaScript file is a canvas-based web page which generates squares 1
 * pixel apart filling the entire canvas, per request of problem 26a. Note the
 * colors have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");

    //Creating the squares as well as filling them in
    for (var i = 0; i < 253; i += 5) {
        for (var j = 0; j < 253; j += 5) {
            // JD: Nice touch, those colors.
            renderingContext.fillStyle = 'rgb(' + (51 + j) + ',' + (150 - j) + ', 256)';
            renderingContext.fillRect(i, j, 4, 4);
            renderingContext.fill();
        }
    }
}());

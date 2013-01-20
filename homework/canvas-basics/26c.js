/*
 * This javaScript file is a canvas-based web page which generates a purpleish
 * hexagon, per request of problem 25e. Note the colors have been changed from
 * the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");
    var i = 0,
    j = 0;
    //Generating multiple hexagons in an offset grid
    for(var i = 0; i < 256; i += 45){
        var j = 0;
        if(i%90 === 0){
            j = 19;
        }
        for(j; j < 256; j += 45){
            //Creating the hexagon
            renderingContext.fillStyle = "#CC00FF";
            renderingContext.beginPath();
            renderingContext.moveTo(j,i + 20);
            renderingContext.lineTo(j + 10, i);
            renderingContext.lineTo(j + 30, i);
            renderingContext.lineTo(j + 40, i + 20);
            renderingContext.lineTo(j + 30, i + 40);
            renderingContext.lineTo(j + 10, i + 40);
            renderingContext.fill();
        }
    }
}());

/*
 * This javaScript file is a canvas-based web page which generates two overlapping
 * rectangles which are 50% transparent. One red and one blue rectangle creating
 * purple in the overlapped area, per request of problem 25c. Note the colors 
 * have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");

    //Creating the rectangles, globalAlpha deals with the transparency
    for(var i = 0; i < 253; i+=5){
        for(var j = 0; j < 253; j+=5){
            renderingContext.fillStyle = 'rgb('+(51+j)+','+(150-j)+', 256)';
            renderingContext.fillRect(i,j,4,4);
            renderingContext.fill();
        }
    }
}());

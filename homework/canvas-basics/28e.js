/*
 * This javaScript file is a canvas-based web page which generates a skyline scene
 * where buildings are in silhouette, per request of problem 27b. Note the colors 
 * have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        linearGradient = renderingContext.createLinearGradient(0,50,0,95);

    //Colors for the sky
    linearGradient.addColorStop(0.2, "#FFFF66");
    linearGradient.addColorStop(0.5, "#FF4719");
    linearGradient.addColorStop(0.7, "#FF1975");
    linearGradient.addColorStop(1, "#660066");

    //Sky
    renderingContext.fillStyle = linearGradient;
    renderingContext.fillRect(0,0,511,511);
    renderingContext.fill();
    
    //Buildings
    var xPlacement = 0;
    while(xPlacement < 511){
        var height = 200*Math.random() + 200;
        var width = 50*Math.random() + 25;
        renderingContext.fillStyle = "black";
        renderingContext.fillRect(xPlacement,511-height,width,height);
        renderingContext.fill();
        xPlacement += width + 10;
    }
    
    
}());

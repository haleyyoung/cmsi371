/*
 * This template file is meant to be a template for canvas-based
 * web page code.  Nothing here is set in stone; it is mainly
 * intended to save you some typing.
 */
// Yes, we can use jQuery here, but avoid it just in case you
// really don't want to use it.  We do still keep things away
// from the global namespace.
(function () {
    // Ditto on using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),

        // Declare other variables here.
        radialGradient = renderingContext.createRadialGradient(160, 160, 1, 180, 180, 320);

    // Put your canvas drawing code (and any other code) here.
    radialGradient.addColorStop(0, "white");
    radialGradient.addColorStop(1, "blue");

    renderingContext.fillStyle = radialGradient;
    renderingContext.beginPath();
    renderingContext.moveTo(56,256);
    renderingContext.lineTo(156,56);
    renderingContext.lineTo(356,56);
    renderingContext.lineTo(456,256);
    renderingContext.lineTo(356,456);
    renderingContext.lineTo(156,456);
    renderingContext.fill();
}());

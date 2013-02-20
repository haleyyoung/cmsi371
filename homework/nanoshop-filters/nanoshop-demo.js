/*
 * This demo script uses the Nanoshop module to apply simple
 * filters on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        gradient;
    alert("colorAccentuate");
    renderingContext.putImageData(
        Nanoshop.applyFilter(
            renderingContext.getImageData(0, 0, canvas.width, canvas.height),
            colorAccentuate, "red"),
        0,
        0
    );
    alert("primaryColors");
    renderingContext.putImageData(
        Nanoshop.applyFilter(
            renderingContext.getImageData(0, 0, canvas.width, canvas.height),
            primaryColors),
        0,
        0
    );
    alert("basicDarkener");
    renderingContext.putImageData(
        Nanoshop.applyFilter(
            renderingContext.getImageData(0, 0, canvas.width, canvas.height),
            basicDarkener),
        0,
        0
    );
}());

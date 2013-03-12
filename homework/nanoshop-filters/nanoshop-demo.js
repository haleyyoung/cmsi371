/*
 * This demo script uses the Nanoshop module to apply simple
 * filters on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        gradient;
    $("#apply-filter-colorAccentuate").click(function () {
        // This filter, you can pick "red", "green", or "blue" for the last
        // parameter of renderingContext.getImageData
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.colorAccentuate, {color: "blue"}),
            0,
            0
        );
    });

    $("#apply-filter-primaryColors").click(function () {
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.primaryColors),
            0,
            0
        );
    });

    $("#apply-filter-darkener").click(function () {
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.basicDarkener),
            0,
            0
        );
    });
}());

/*
 * This javaScript file is a canvas-based web page which generates a 3d cube wire
 * frame with sides of different shades, per request of problem 27b. Note the colors
 * have been changed from the ones requested.
 */

(function () {
    // Using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),

        backSquare = {
                      vertices: [[180, 0], [180, 99], [280, 99], [280, 0]]
        },
        frontSquare = {
                       vertices: [[330, 149], [330, 49], [230, 49], [230, 149]],
                       color: "#008FB2"
        },
        topSquare = {
                     vertices: [[180, 0], [230, 49], [330, 49], [280, 0]],
                     color: "#00CCFF"
        },
        leftSquare = {
                      vertices: [[180, 99], [230, 149], [230, 49], [180, 0]],
                      color: "#005266"
        },


    // This is a function that takes in a side-object and draws it
        drawSide = function (sideName) {
            renderingContext.beginPath();
            renderingContext.moveTo(sideName.vertices[0][0], sideName.vertices[0][1]);
            renderingContext.lineTo(sideName.vertices[1][0], sideName.vertices[1][1]);
            renderingContext.lineTo(sideName.vertices[2][0], sideName.vertices[2][1]);
            renderingContext.lineTo(sideName.vertices[3][0], sideName.vertices[3][1]);
            renderingContext.lineTo(sideName.vertices[0][0], sideName.vertices[0][1]);
            if (sideName.color) {
                renderingContext.fillStyle = sideName.color;
                renderingContext.fill();
            }
        };

    // Make the outline blue
    renderingContext.strokeStyle = "blue";

    drawSide(backSquare);

    // Right Line to connect
    renderingContext.beginPath();
    renderingContext.moveTo(280, 99);
    renderingContext.lineTo(330, 149);
    renderingContext.stroke();

    drawSide(frontSquare);
    drawSide(topSquare);
    drawSide(leftSquare);

}());

var getNewPosition = function (object, framesPerSecond) {
    var accelerationVector = new Vector();
    var accelerationVector.elements[0] = object.accelerationVector.x / framesPerSecond;
    var accelerationVector.elements[1] = object.accelerationVector.y / framesPerSecond;
    var accelerationVector.elements[2] = object.accelerationVector.z / framesPerSecond;

    object.speedVector.add(object.accelerationVector);

    object.instanceTransform.tx += object.speedVector.x / framesPerSecond;
    object.instanceTransform.ty += object.speedVector.y / framesPerSecond;
    object.instanceTransform.tz += object.speedVector.z / framesPerSecond;

    if (object.instanceTransform.ty < 0) {
        object.instanceTransform.ty = 0;
    }
};
var getNewPosition = function (object, netAcceleration, framesPerSecond) {
    console.log("here");
    var accelerationVector = new Vector();
    accelerationVector.elements[0] = netAcceleration.x();
    accelerationVector.elements[1] = netAcceleration.y();
    accelerationVector.elements[2] = netAcceleration.z();

    object.speedVector.add(object.accelerationVector);

    object.instanceTransform.tx += object.speedVector.x();
    object.instanceTransform.ty += object.speedVector.y();
    object.instanceTransform.tz += object.speedVector.z();

    if (object.instanceTransform.ty < 0) {
        object.instanceTransform.ty = 0;
        object.speedVector.elements[1] = 0;
    }
};
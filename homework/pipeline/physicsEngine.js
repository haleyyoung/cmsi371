var getNewPosition = function (object, netAcceleration, framesPerSecond) {

    if (object.accelerationVector && object.speedVector) {
        var accelerationVector = new Vector();

        accelerationVector.elements[0] = netAcceleration.x() / (framesPerSecond * framesPerSecond);
        // Gravity's effect here is "2.5"
        accelerationVector.elements[1] = (netAcceleration.y() - 2.5) / (framesPerSecond * framesPerSecond);
        accelerationVector.elements[2] = netAcceleration.z() / (framesPerSecond * framesPerSecond);

        object.speedVector = object.speedVector.add(accelerationVector);
        object.instanceTransform.tx += object.speedVector.x();
        object.instanceTransform.ty += object.speedVector.y();
        object.instanceTransform.tz += object.speedVector.z();

        if (object.instanceTransform.ty <= object.ground) {
            object.instanceTransform.ty = object.ground;
            object.speedVector.elements[1] = 0;
        }
    }
};
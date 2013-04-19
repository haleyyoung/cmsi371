var getNewPosition = function (object, netAcceleration, framesPerSecond) {

    if (object.accelerationVector && object.speedVector) {
        var accelerationVector = new Vector();
        accelerationVector.elements[0] = netAcceleration.x(); // / framesPerSecond;
        accelerationVector.elements[1] = netAcceleration.y() - 1; // / framesPerSecond;
        accelerationVector.elements[2] = netAcceleration.z(); // / framesPerSecond;

        //console.log("acceleration vector " + accelerationVector.elements);
        //console.log(object.name + " " + object.speedVector.elements);
        object.speedVector = object.speedVector.add(accelerationVector);
        //console.log(object.name + " " + object.speedVector.elements);

       // console.log("before " + object.name + " " + object.instanceTransform.tx + ", " + object.instanceTransform.ty + ", "  + object.instanceTransform.tz);



       // console.log("x " + object.speedVector.x());

        object.instanceTransform.tx += object.speedVector.x(); // / framesPerSecond;

        //console.log("x " + object.speedVector.x());

        object.instanceTransform.ty += object.speedVector.y(); // / framesPerSecond;

        //console.log("y " + object.speedVector.y());
        //console.log("z " + object.speedVector.x());

        object.instanceTransform.tz += object.speedVector.z(); // / framesPerSecond;

        //console.log("z " + object.speedVector.x());





        //console.log("after " + object.name + " " + object.instanceTransform.tx + ", " + object.instanceTransform.ty + ", "  + object.instanceTransform.tz);

        if (object.instanceTransform.ty <= object.ground) {
            object.instanceTransform.ty = object.ground;
            object.speedVector.elements[1] = 0;
        }
    }
};
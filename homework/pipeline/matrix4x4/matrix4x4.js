var Matrix = (function () {
    // Define the constructor.
    var matrix = function () {
        this.elements = arguments.length ?
            [].slice.call(arguments) :
            [1,0,0,0,
             0,1,0,0,
             0,0,1,0,
             0,0,0,1
            ];
    };

    matrix.getMultiplicationMatrix = function (m1,m2) {
        var mMultiplied = [];
        mMultiplied[0] = m1[0]*m2[0] + m1[1]*m2[4] + m1[2]*m2[8] + m1[3]*m2[12];
        mMultiplied[1] = m1[0]*m2[1] + m1[1]*m2[5] + m1[2]*m2[9] + m1[3]*m2[13];
        mMultiplied[2] = m1[0]*m2[2] + m1[1]*m2[6] + m1[2]*m2[10] + m1[3]*m2[14];
        mMultiplied[3] = m1[0]*m2[3] + m1[1]*m2[7] + m1[2]*m2[11] + m1[3]*m2[15];

        mMultiplied[4] = m1[4]*m2[0] + m1[5]*m2[4] + m1[6]*m2[8] + m1[7]*m2[12];
        mMultiplied[5] = m1[4]*m2[1] + m1[5]*m2[5] + m1[6]*m2[9] + m1[7]*m2[13];
        mMultiplied[6] = m1[4]*m2[2] + m1[5]*m2[6] + m1[6]*m2[10] + m1[7]*m2[14];
        mMultiplied[7] = m1[4]*m2[3] + m1[5]*m2[7] + m1[6]*m2[11] + m1[7]*m2[15];

        mMultiplied[8] = m1[8]*m2[0] + m1[9]*m2[4] + m1[10]*m2[8] + m1[11]*m2[12];
        mMultiplied[9] = m1[8]*m2[1] + m1[9]*m2[5] + m1[10]*m2[9] + m1[11]*m2[13];
        mMultiplied[10] = m1[8]*m2[2] + m1[9]*m2[6] + m1[10]*m2[10] + m1[11]*m2[14];
        mMultiplied[11] = m1[8]*m2[3] + m1[9]*m2[7] + m1[10]*m2[11] + m1[11]*m2[15];

        mMultiplied[12] = m1[12]*m2[0] + m1[13]*m2[4] + m1[14]*m2[8] + m1[15]*m2[12];
        mMultiplied[13] = m1[12]*m2[1] + m1[13]*m2[5] + m1[14]*m2[9] + m1[15]*m2[13];
        mMultiplied[14] = m1[12]*m2[2] + m1[13]*m2[6] + m1[14]*m2[10] + m1[15]*m2[14];
        mMultiplied[15] = m1[12]*m2[3] + m1[13]*m2[7] + m1[14]*m2[11] + m1[15]*m2[15];

        for(var i = 0; i < 16; i++) {
            console.log(mMultiplied[i]);
        }

        return new Matrix(
            mMultiplied[0], mMultiplied[1], mMultiplied[2], mMultiplied[3],
             mMultiplied[4], mMultiplied[5], mMultiplied[6], mMultiplied[7],
             mMultiplied[8], mMultiplied[9], mMultiplied[10], mMultiplied[11],
             mMultiplied[12], mMultiplied[13], mMultiplied[14], mMultiplied[15]
        );
    };

    matrix.getTranslationMatrix = function (tx, ty, tz) {
        return new Matrix(
            1,0,0,tx,
            0,1,0,ty,
            0,0,1,tz,
            0,0,0,1
        );
    };

    matrix.getScaleMatrix = function (sx, sy, sz) {
        return new Matrix(
            sx,0,0,0,
            0,sy,0,0,
            0,0,sz,0,
            0,0,0,1
        );
    }

    matrix.getRotationMatrix = function (angle, x, y, z) {
        // In production code, this function should be associated
        // with a matrix object with associated functions.
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
            s = Math.sin(angle * Math.PI / 180.0),
            c = Math.cos(angle * Math.PI / 180.0),
            oneMinusC = 1.0 - c,

            // We can't calculate this until we have normalized
            // the axis vector of rotation.
            x2, // "2" for "squared."
            y2,
            z2,
            xy,
            yz,
            xz,
            xs,
            ys,
            zs;

        // Normalize the axis vector of rotation.
        x /= axisLength;
        y /= axisLength;
        z /= axisLength;
        console.log("x " + x + " y " + y + " z " +z);

        // *Now* we can calculate the other terms.
        x2 = x * x;
        y2 = y * y;
        z2 = z * z;
        xy = x * y;
        yz = y * z;
        xz = x * z;
        xs = x * s;
        ys = y * s;
        zs = z * s;

        // Matrix in row major order.
        return new Matrix(
            (x2 * oneMinusC) + c,
            (xy * oneMinusC) - zs,
            (xz * oneMinusC) + ys,
            0.0,

            (xy * oneMinusC) + zs,
            (y2 * oneMinusC) + c,
            (yz * oneMinusC) - xs,
            0.0,

            (xz * oneMinusC) - ys,
            (yz * oneMinusC) + xs,
            (z2 * oneMinusC) + c,
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        );
    };

    matrix.getOrthoMatrix = function (left, right, bottom, top, zNear, zFar) {
        var width = right - left,
            height = top - bottom,
            depth = zFar - zNear;

        // Matrix in row major order.
        return [
            2.0 / width,
            0.0,
            0.0,
            -(right + left) / width,

            0.0,
            2.0 / height,
            0.0,
            -(top + bottom) / height,

            0.0,
            0.0,
            -2.0 / depth,
            -(zFar + zNear) / depth,

            0.0,
            0.0,
            0.0,
            1.0
        ];
    };

    return matrix;
})();

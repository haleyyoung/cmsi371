// JD: To be clear, our library is quite 4x4-matrix-specific, so you
//     might not want to use the general name "Matrix" for this object.
var Matrix4x4 = (function () {
    // Define the constructor.
    var matrix4x4 = function () {
        this.elements = arguments.length ?
                [].slice.call(arguments) :
                [1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                    ];
    };

    // JD: I think this function will be easier to use if done as
    //     an object-oriented method (i.e., assign to prototype and
    //     refer to "this").  This gives you expressions like:
    //
    //       newTransform = oldTransform.multiply(Matrix.getTranslationMatrx(...));
    //
    //     More readable, yes?
    matrix4x4.prototype.getMultiplicationMatrix4x4 = function (m2) {
        var mMultiplied = [];
        mMultiplied[0] = this.elements[0][0] * m2[0] + this.elements[0][1] * m2[4] + this.elements[0][2] * m2[8] + this.elements[0][3] * m2[12];
        mMultiplied[1] = this.elements[0][0] * m2[1] + this.elements[0][1] * m2[5] + this.elements[0][2] * m2[9] + this.elements[0][3] * m2[13];
        mMultiplied[2] = this.elements[0][0] * m2[2] + this.elements[0][1] * m2[6] + this.elements[0][2] * m2[10] + this.elements[0][3] * m2[14];
        mMultiplied[3] = this.elements[0][0] * m2[3] + this.elements[0][1] * m2[7] + this.elements[0][2] * m2[11] + this.elements[0][3] * m2[15];

        mMultiplied[4] = this.elements[0][4] * m2[0] + this.elements[0][5] * m2[4] + this.elements[0][6] * m2[8] + this.elements[0][7] * m2[12];
        mMultiplied[5] = this.elements[0][4] * m2[1] + this.elements[0][5] * m2[5] + this.elements[0][6] * m2[9] + this.elements[0][7] * m2[13];
        mMultiplied[6] = this.elements[0][4] * m2[2] + this.elements[0][5] * m2[6] + this.elements[0][6] * m2[10] + this.elements[0][7] * m2[14];
        mMultiplied[7] = this.elements[0][4] * m2[3] + this.elements[0][5] * m2[7] + this.elements[0][6] * m2[11] + this.elements[0][7] * m2[15];

        mMultiplied[8] = this.elements[0][8] * m2[0] + this.elements[0][9] * m2[4] + this.elements[0][10] * m2[8] + this.elements[0][11] * m2[12];
        mMultiplied[9] = this.elements[0][8] * m2[1] + this.elements[0][9] * m2[5] + this.elements[0][10] * m2[9] + this.elements[0][11] * m2[13];
        mMultiplied[10] = this.elements[0][8] * m2[2] + this.elements[0][9] * m2[6] + this.elements[0][10] * m2[10] + this.elements[0][11] * m2[14];
        mMultiplied[11] = this.elements[0][8] * m2[3] + this.elements[0][9] * m2[7] + this.elements[0][10] * m2[11] + this.elements[0][11] * m2[15];

        mMultiplied[12] = this.elements[0][12] * m2[0] + this.elements[0][13] * m2[4] + this.elements[0][14] * m2[8] + this.elements[0][15] * m2[12];
        mMultiplied[13] = this.elements[0][12] * m2[1] + this.elements[0][13] * m2[5] + this.elements[0][14] * m2[9] + this.elements[0][15] * m2[13];
        mMultiplied[14] = this.elements[0][12] * m2[2] + this.elements[0][13] * m2[6] + this.elements[0][14] * m2[10] + this.elements[0][15] * m2[14];
        mMultiplied[15] = this.elements[0][12] * m2[3] + this.elements[0][13] * m2[7] + this.elements[0][14] * m2[11] + this.elements[0][15] * m2[15];

        return new Matrix4x4(
            mMultiplied[0],
            mMultiplied[1],
            mMultiplied[2],
            mMultiplied[3],

            mMultiplied[4],
            mMultiplied[5],
            mMultiplied[6],
            mMultiplied[7],

            mMultiplied[8],
            mMultiplied[9],
            mMultiplied[10],
            mMultiplied[11],

            mMultiplied[12],
            mMultiplied[13],
            mMultiplied[14],
            mMultiplied[15]
        );
    };

    matrix4x4.getTranslationMatrix4x4 = function (tx, ty, tz) {
        // JD: Because this is in row-major order, I think it is
        //     appropriate to write this out with 4 elements per
        //     source code row.
        return new Matrix4x4(
            1,
            0,
            0,
            tx,

            0,
            1,
            0,
            ty,

            0,
            0,
            1,
            tz,

            0,
            0,
            0,
            1
        );
    };

    matrix4x4.getScaleMatrix4x4 = function (sx, sy, sz) {
        return new Matrix4x4(
            sx,
            0,
            0,
            0,

            0,
            sy,
            0,
            0,

            0,
            0,
            sz,
            0,

            0,
            0,
            0,
            1
        );
    };

    matrix4x4.getRotationMatrix4x4 = function (angle, x, y, z) {
        // In production code, this function should be associated
        // with a Matrix4x4 object with associated functions.
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

        // Matrix4x4 in row major order.
        // JD: This one I chose to break into multiple lines because
        //     the individual elements started getting kinda long.
        return new Matrix4x4(
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

    matrix4x4.getOrthoMatrix4x4 = function (left, right, bottom, top, zNear, zFar) {
        var width = right - left,
            height = top - bottom,
            depth = zFar - zNear;

        // Matrix4x4 in row major order.
        return new Matrix4x4(
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
        );
    };

    matrix4x4.getFrustumMatrix4x4 = function (left, right, bottom, top, zNear, zFar) {
        var width = right - left,
            height = top - bottom,
            depth = zFar - zNear;

        return new Matrix4x4(
            2.0 * zNear / width,
            0.0,
            (right + left) / width,
            0.0,

            0.0,
            2.0 * zNear / height,
            (top + bottom) / height,
            0.0,

            0.0,
            0.0,
            -(zFar + zNear) / depth,
            -2.0 * zFar * zNear / depth,

            0.0,
            0.0,
            -1.0,
            0.0
        );
    };

    matrix4x4.getColumnMajorOrder = function (rowMajor) {
        return new Matrix4x4(
            rowMajor[0],
            rowMajor[4],
            rowMajor[8],
            rowMajor[12],

            rowMajor[1],
            rowMajor[5],
            rowMajor[9],
            rowMajor[13],

            rowMajor[2],
            rowMajor[6],
            rowMajor[10],
            rowMajor[14],

            rowMajor[3],
            rowMajor[7],
            rowMajor[11],
            rowMajor[15]
        );
    };

    matrix4x4.getInstanceTransform = function (transforms) {
        var translate = new Matrix4x4();
            scale = new Matrix4x4();
            rotate = new Matrix4x4();

        if (transforms.tx) {
            translate = getTranslationMatrix(transforms.tx, transforms.ty, transforms.tz);
        }
        if (transforms.sx) {
            scale = getTranslationMatrix(transforms.tx, transforms.ty, transforms.tz);
        }
        if (transforms.angle) {
            rotate = getRotationMatrix(transforms.angle, transforms.rx, transforms.ry, transforms.rz);
        }
    };

    return matrix4x4;
})();
/*
 * Unit tests for our vector object. // JD: Uhhh, matrix, right?
 */
$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var m1 = new Matrix4x4();
        deepEqual(m1.elements,
            [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
                ],
            "Default matrix constructor");
    });

    test("Pure Matrix Multiplication", function () {
        var matrixToMultiply = new Matrix4x4(
            0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
        );
        var m2 = matrixToMultiply.getMultiplicationMatrix4x4(
            [1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1
                ]
        );

        deepEqual(m2.elements,
            [0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
                ],
            "Pure matrix multiplication");

        matrixToMultiply = new Matrix4x4(
            1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1
        );

        m2 = matrixToMultiply.getMultiplicationMatrix4x4(
            [1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1
                ]
        );
        deepEqual(m2.elements,
            [4, 4, 4, 4,
                4, 4, 4, 4,
                4, 4, 4, 4,
                4, 4, 4, 4
                ],
            "Pure matrix multiplication 2");

        matrixToMultiply = new Matrix4x4(
            2, 1, -4, 3,
                5, 88, 2.3, 17,
                0, 1, 4, 23,
                90, 6, 7, -5
        );

        m2 = matrixToMultiply.getMultiplicationMatrix4x4(
            [-1, -2, -3, -4,
                -5, -6, -7, -8,
                -9, -10, -11, -12,
                -13, -14, -15, -16
                ]
        );
        deepEqual(m2.elements,
            [-10, -12, -14, -16,
                -686.7, -799, -911.3, -1023.6,
                -340, -368, -396, -424,
                -118, -216, -314, -412
                ],
            "Pure Matrix4x4 multiplication 3");
    });

    test("Pure Transformation Matrices", function () {
        var m3 = Matrix4x4.getTranslationMatrix4x4(5, 9, -1);
        deepEqual(m3.elements,
            [1, 0, 0, 5,
                0, 1, 0, 9,
                0, 0, 1, -1,
                0, 0, 0, 1
                ],
            "Pure translation matrix");

        m3 = Matrix4x4.getTranslationMatrix4x4(-2, 81, 53.34);
        deepEqual(m3.elements,
            [1, 0, 0, -2,
                0, 1, 0, 81,
                0, 0, 1, 53.34,
                0, 0, 0, 1
                ],
            "Pure translation Matrix4x4 2");

        m3 = Matrix4x4.getTranslationMatrix4x4(0, 0, 0);
        deepEqual(m3.elements,
            [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
                ],
            "Pure translation matrix 3");

        m3 = Matrix4x4.getScaleMatrix4x4(2, 5, 21);
        deepEqual(m3.elements,
            [2, 0, 0, 0,
                0, 5, 0, 0,
                0, 0, 21, 0,
                0, 0, 0, 1
                ],
            "Pure scaling Matrix4x4");

        m3 = Matrix4x4.getScaleMatrix4x4(0, 0, 0);
        deepEqual(m3.elements,
            [0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 1
                ],
            "Pure scaling matrix");

        m3 = Matrix4x4.getScaleMatrix4x4(-99, 0, 243981);
        deepEqual(m3.elements,
            [-99, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 243981, 0,
                0, 0, 0, 1
                ],
            "Pure scaling matrix");

        m3 = Matrix4x4.getRotationMatrix4x4(0, 0, 0, 1);
        deepEqual(m3.elements,
            [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
                ],
            "Pure rotation matrix");

        m3 = Matrix4x4.getRotationMatrix4x4(1, 0, 1, 0);
        deepEqual(m3.elements,
            [Math.cos(Math.PI / 180.0), 0, Math.sin(Math.PI / 180.0), 0,
                0, 1, 0, 0,
                (-1 * Math.sin(Math.PI / 180.0)), 0, Math.cos(Math.PI / 180.0), 0,
                0, 0, 0, 1
                ],
            "Pure rotation matrix test 2");

        m3 = Matrix4x4.getRotationMatrix4x4(300, 1, 1, 1);
        var axisLength = Math.sqrt(3),
            x = 1 / axisLength,
            y = 1 / axisLength,
            z = 1 / axisLength,
            cosine = Math.cos(300 * Math.PI / 180.0),
            sine = Math.sin(300 * Math.PI / 180.0);

        deepEqual(m3.elements,
            [(x * x * (1 - cosine) + cosine), (x * y * (1 - cosine) - z * sine), (x * z * (1 - cosine) + y * sine), 0,
                (x * y * (1 - cosine) + z * sine), (y * y * (1 - cosine) + cosine), (y * z * (1 - cosine) - x * sine), 0,
                (x * z * (1 - cosine) - y * sine), (y * z * (1 - cosine) + x * sine), (z * z * (1 - cosine) + cosine), 0,
                0, 0, 0, 1
                ],
            "Pure rotation Matrix4x4 test 3");

        m3 = Matrix4x4.getRotationMatrix4x4(5, 2, 0, 0);
        axisLength = Math.sqrt(4);
        x = 2 / axisLength;
        y = 0;
        z = 0;
        cosine = Math.cos(5 * Math.PI / 180.0);
        sine = Math.sin(5 * Math.PI / 180.0);

        deepEqual(m3.elements,
            [1, 0, 0, 0,
                0, cosine, (-1 * x * sine), 0,
                0, (x * sine), cosine, 0,
                0, 0, 0, 1
                ],
            "Pure rotation matrix test 4");

        m3 = Matrix4x4.getRotationMatrix4x4(-1, 2, -7, 0.5);
        axisLength = Math.sqrt(4 + 49 + (0.5 * 0.5));
        x = 2 / axisLength;
        y = -7 / axisLength;
        z = 0.5 / axisLength;
        cosine = Math.cos(-1 * Math.PI / 180.0);
        sine = Math.sin(-1 * Math.PI / 180.0);
        deepEqual(m3.elements,
            [(x * x * (1 - cosine) + cosine), (x * y * (1 - cosine) - z * sine), (x * z * (1 - cosine) + y * sine), 0,
                (x * y * (1 - cosine) + z * sine), (y * y * (1 - cosine) + cosine), (y * z * (1 - cosine) - x * sine), 0,
                (x * z * (1 - cosine) - y * sine), (y * z * (1 - cosine) + x * sine), (z * z * (1 - cosine) + cosine), 0,
                0, 0, 0, 1
                ],
            "Pure rotation Matrix4x4 test 5");

        m3 = Matrix4x4.getRotationMatrix4x4(2.6, 0, 0, 1);
        x = 0;
        y = 0;
        z = 1;
        cosine = Math.cos(2.6 * Math.PI / 180.0);
        sine = Math.sin(2.6 * Math.PI / 180.0);
        deepEqual(m3.elements,
            [cosine, (-1 * z * sine), 0, 0,
                (z * sine), cosine, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
                ],
            "Pure rotation matrix test 6");
    });

    test("Pure Matrix4x4 Projection", function () {
        var m4 = Matrix4x4.getOrthoMatrix4x4(-4, 4, -2, 2, -10, 10),
            width = 4 + 4,
            height = 2 + 2,
            depth = 10 + 10;
        deepEqual(m4.elements,
            [2 / width, 0, 0, 0,
                0, 2 / height, 0, 0,
                0, 0, -2 / depth, 0,
                0, 0, 0, 1
                ],
            "Pure matrix orthogonal projection");

        m4 = Matrix4x4.getOrthoMatrix4x4(-1, 1, -1, 1, -1, 1);
        width = 1 + 1;
        height = 1 + 1;
        depth = 1 + 1;
        deepEqual(m4.elements,
            [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, -1, 0,
                0, 0, 0, 1
                ],
            "Pure matrix orthogonal projection 2");

        m4 = Matrix4x4.getOrthoMatrix4x4(0, 2, 0, 2, 0, 2);
        width = 2;
        height = 2;
        depth = 2;
        deepEqual(m4.elements,
            [1, 0, 0, -1,
                0, 1, 0, -1,
                0, 0, -1, -1,
                0, 0, 0, 1
                ],
            "Pure Matrix4x4 orthogonal projection 3");

        m4 = Matrix4x4.getFrustumMatrix4x4(-4, 4, -2, 2, -10, 10);
        width = 4 + 4;
        height = 2 + 2;
        depth = 10 + 10;
        deepEqual(m4.elements,

            [2 * -10 / width, 0, 0, 0,
                0, -5, 0, 0,
                0, 0, 0, 10,
                0, 0, -1, 0
                ],
            "Pure Matrix4x4 frustum projection");

        m4 = Matrix4x4.getFrustumMatrix4x4(-1, 1, -1, 1, -1, 1);
        width = 1 + 1;
        height = 1 + 1;
        depth = 1 + 1;
        deepEqual(m4.elements,
            [-1, 0, 0, 0,
                0, -1, 0, 0,
                0, 0, 0, 1,
                0, 0, -1, 0
                ],
            "Pure Matrix4x4 frustum projection 2");

        m4 = Matrix4x4.getFrustumMatrix4x4(0, 1, 0, 1, 0, 1);
        width = 1;
        height = 1;
        depth = 1;
        deepEqual(m4.elements,
            [0, 0, 1, 0,
                0, 0, 1, 0,
                0, 0, -1, 0,
                0, 0, -1, 0
                ],
            "Pure Matrix4x4 frustum projection 3");
    });

    test("Pure Matrix4x4 Row Major To Column Major", function () {
        var rowMajorMatrix = new Matrix4x4(
            1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 11, 12,
                13, 14, 15, 16
        );
        var m5 = rowMajorMatrix.getColumnMajorOrder();
        deepEqual(m5.elements,
            [1, 5, 9, 13,
                2, 6, 10, 14,
                3, 7, 11, 15,
                4, 8, 12, 16
                ],
            "Matrix4x4 row major to column major 1");

        rowMajorMatrix = new Matrix4x4(
            0, 0, 0, 0,
                1, 1, 1, 1,
                0, 0, 0, 0,
                1, 1, 1, 1
        );
        m5 = rowMajorMatrix.getColumnMajorOrder();
        deepEqual(m5.elements,
            [0, 1, 0, 1,
                0, 1, 0, 1,
                0, 1, 0, 1,
                0, 1, 0, 1
                ],
            "Matrix4x4 row major to column major 2");

        rowMajorMatrix = new Matrix4x4(
            0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
        );
        m5 = rowMajorMatrix.getColumnMajorOrder();
        deepEqual(m5.elements,
            [0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
                ],
            "Matrix4x4 row major to column major 3");

        rowMajorMatrix = new Matrix4x4(
            0, 0, 1, 2,
                0, 0, 3, 4,
                0, 0, 5, 6,
                0, 0, 7, 8
        );
        m5 = rowMajorMatrix.getColumnMajorOrder();
        deepEqual(m5.elements,
            [0, 0, 0, 0,
                0, 0, 0, 0,
                1, 3, 5, 7,
                2, 4, 6, 8
                ],
            "Matrix4x4 row major to column major 4");

        rowMajorMatrix = new Matrix4x4(
            1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
        );
        m5 = rowMajorMatrix.getColumnMajorOrder();
        deepEqual(m5.elements,
            [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
                ],
            "Matrix4x4 row major to column major 5");
    });


    test("Pure Matrix4x4 Instance Transform Multiplication", function () {
        var m5 = Matrix4x4.getInstanceTransform({
            tx:0,
            ty:0,
            tz:0,
            sx:1,
            sy:1,
            sz:1,
            angle:0,
            rx:0,
            ry:0,
            rz:0
        });
        deepEqual(m5.elements,
            [1,0,0,0,
             0,1,0,0,
             0,0,1,0,
             0,0,0,1
             ],
            "Matrix4x4 instance transform no rotation, scaling or translation");
        m5 = Matrix4x4.getInstanceTransform({
            tx:0,
            ty:0,
            tz:0,
            sx:1,
            sy:1,
            sz:1,
            angle:0,
            rz:0
        });
        deepEqual(m5.elements,
            [1,0,0,0,
             0,1,0,0,
             0,0,1,0,
             0,0,0,1
             ],
            "Matrix4x4 instance transform no rotation with undefined attributes");
        m5 = Matrix4x4.getInstanceTransform({
            tx:1,
            ty:34,
            tz:684,
            sx:1,
            sy:1,
            sz:1,
            angle:0,
            rx:1,
            ry:0,
            rz:0
        });
        deepEqual(m5.elements,
            [1,0,0,1,
             0,1,0,34,
             0,0,1,684,
             0,0,0,1
             ],
            "Matrix4x4 instance transform only translation");
        m5 = Matrix4x4.getInstanceTransform({
            tx:0,
            ty:0,
            tz:0,
            sx:2,
            sy:4,
            sz:7,
            angle:0,
            rz:0
        });
        deepEqual(m5.elements,
            [2,0,0,0,
             0,4,0,0,
             0,0,7,0,
             0,0,0,1
             ],
            "Matrix4x4 instance transform only scaling");

        var axisLength = Math.sqrt(4 + 49 + (0.5 * 0.5)),
        x = 2 / axisLength,
        y = -7 / axisLength,
        z = 0.5 / axisLength,
        cosine = Math.cos(-1 * Math.PI / 180.0),
        sine = Math.sin(-1 * Math.PI / 180.0);

        m5 = Matrix4x4.getInstanceTransform({
            tx:0,
            ty:0,
            tz:0,
            sx:1,
            sy:1,
            sz:1,
            angle:-1,
            rx:2,
            ry:-7,
            rz:0.5
        });
        deepEqual(m5.elements,
            [(x * x * (1 - cosine) + cosine), (x * y * (1 - cosine) - z * sine), (x * z * (1 - cosine) + y * sine), 0,
                (x * y * (1 - cosine) + z * sine), (y * y * (1 - cosine) + cosine), (y * z * (1 - cosine) - x * sine), 0,
                (x * z * (1 - cosine) - y * sine), (y * z * (1 - cosine) + x * sine), (z * z * (1 - cosine) + cosine), 0,
                0, 0, 0, 1
             ],
            "Matrix4x4 instance transform only rotation");

        axisLength = Math.sqrt(4 + 49 + (0.5 * 0.5));
        x = 2 / axisLength;
        y = -7 / axisLength;
        z = 0.5 / axisLength;
        cosine = Math.cos(-1 * Math.PI / 180.0);
        sine = Math.sin(-1 * Math.PI / 180.0);

        m5 = Matrix4x4.getInstanceTransform({
            tx:5,
            ty:6,
            tz:7,
            sx:1,
            sy:2,
            sz:1.5,
            angle:-1,
            rx:2,
            ry:-7,
            rz:0.5
        });
        deepEqual(m5.elements,
            [(x * x * (1 - cosine) + cosine), (x * y * (1 - cosine) - z * sine), (x * z * (1 - cosine) + y * sine), 5,
                2*(x * y * (1 - cosine) + z * sine), 2*(y * y * (1 - cosine) + cosine), 2*(y * z * (1 - cosine) - x * sine), 6,
                1.5*(x * z * (1 - cosine) - y * sine), 1.5*(y * z * (1 - cosine) + x * sine), 1.5*(z * z * (1 - cosine) + cosine), 7,
                0, 0, 0, 1
             ],
            "Matrix4x4 instance transform rotation, scaling, and translation");

    });

    test("Camera (look-at) Matrix4x4", function () {
        var p = new Vector(1,0,0),
            q = new Vector(0,1,0),
            up = new Vector(0,0,1),
            ze = (p.subtract(q)).unit(),
            ye = (up.subtract(up.projection(ze))).unit(),
            xe = ye.cross(ze),
            pDotXe = p.dot(xe),
            pDotYe = p.dot(ye),
            pDotZe = p.dot(ze),
            m6 = Matrix4x4.getLookAtMatrix(p,q,up);
        deepEqual(m6.elements,
            [xe.elements[0], xe.elements[1], xe.elements[2], -pDotXe,
                ye.elements[0], ye.elements[1], ye.elements[2], -pDotYe,
                ze.elements[0], ze.elements[1], ze.elements[2], -pDotZe,
                0,0,0,1
                ],
            "Matrix4x4 look at matrix 1");

        p = new Vector(0,1,0),
        q = new Vector(0,0,1),
        up = new Vector(1,0,0),
        ze = (p.subtract(q)).unit(),
        ye = (up.subtract(up.projection(ze))).unit(),
        xe = ye.cross(ze),
        pDotXe = p.dot(xe),
        pDotYe = p.dot(ye),
        pDotZe = p.dot(ze);
        m6 = Matrix4x4.getLookAtMatrix(p,q,up);
        deepEqual(m6.elements,
            [xe.elements[0], xe.elements[1], xe.elements[2], -pDotXe,
                ye.elements[0], ye.elements[1], ye.elements[2], -pDotYe,
                ze.elements[0], ze.elements[1], ze.elements[2], -pDotZe,
                0,0,0,1
                ],
            "Matrix4x4 look at matrix 2");

        p = new Vector(0,0,1),
        q = new Vector(1,0,0),
        up = new Vector(0,1,0),
        ze = (p.subtract(q)).unit(),
        ye = (up.subtract(up.projection(ze))).unit(),
        xe = ye.cross(ze),
        pDotXe = p.dot(xe),
        pDotYe = p.dot(ye),
        pDotZe = p.dot(ze);
        m6 = Matrix4x4.getLookAtMatrix(p,q,up);
        deepEqual(m6.elements,
            [xe.elements[0], xe.elements[1], xe.elements[2], -pDotXe,
                ye.elements[0], ye.elements[1], ye.elements[2], -pDotYe,
                ze.elements[0], ze.elements[1], ze.elements[2], -pDotZe,
                0,0,0,1
                ],
            "Matrix4x4 look at matrix 3");

        p = new Vector(-7,11,26),
        q = new Vector(1,1,1),
        up = new Vector(1,12,-0.768),
        ze = (p.subtract(q)).unit(),
        ye = (up.subtract(up.projection(ze))).unit(),
        xe = ye.cross(ze),
        pDotXe = p.dot(xe),
        pDotYe = p.dot(ye),
        pDotZe = p.dot(ze);
        m6 = Matrix4x4.getLookAtMatrix(p,q,up);
        deepEqual(m6.elements,
            [xe.elements[0], xe.elements[1], xe.elements[2], -pDotXe,
                ye.elements[0], ye.elements[1], ye.elements[2], -pDotYe,
                ze.elements[0], ze.elements[1], ze.elements[2], -pDotZe,
                0,0,0,1
                ],
            "Matrix4x4 look at matrix 4");
    });
});

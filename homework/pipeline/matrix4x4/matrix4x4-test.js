/*
 * Unit tests for our vector object.
 */
$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var m1 = new Matrix();
        deepEqual(m1.elements,
            [1,0,0,0,
             0,1,0,0,
             0,0,1,0,
             0,0,0,1
            ],
            "Default matrix constructor");
    });

    test("Pure Matrix Multiplication", function () {
        var m2 = Matrix.getMultiplicationMatrix(
            [0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0
            ],
            [1,1,1,1,
             1,1,1,1,
             1,1,1,1,
             1,1,1,1
            ]
        );
        deepEqual(m2.elements,
            [0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0
            ],
            "Pure matrix multiplication"
            );
        var m2 = Matrix.getMultiplicationMatrix(
            [1,1,1,1,
            1,1,1,1,
            1,1,1,1,
            1,1,1,1
            ],
            [1,1,1,1,
             1,1,1,1,
             1,1,1,1,
             1,1,1,1
            ]
        );
        deepEqual(m2.elements,
            [4,4,4,4,
            4,4,4,4,
            4,4,4,4,
            4,4,4,4
            ],
            "Pure matrix multiplication 2"
            );
        var m2 = Matrix.getMultiplicationMatrix(
            [2,1,-4,3,
             5,88,2.3,17,
             0,1,4,23,
             90,6,7,-5
            ],
            [-1,-2,-3,-4,
            -5,-6,-7,-8,
            -9,-10,-11,-12,
            -13,-14,-15,-16
            ]
        );
        deepEqual(m2.elements,
            [-10,-12,-14,-16,
             -686.7,-799,-911.3,-1023.6,
             -340,-368,-396,-424,
             -118,-216,-314,-412
            ],
            "Pure matrix multiplication 3"
            );
    });

    test("Pure Transformation Matrices", function () {
        var m = Matrix.getTranslationMatrix(5,9,-1);
        deepEqual(m.elements,
            [1,0,0,5,
             0,1,0,9,
             0,0,1,-1,
             0,0,0,1
            ],
            "Pure translation matrix"
            );

        var m = Matrix.getTranslationMatrix(-2,81,53.34);
        deepEqual(m.elements,
            [1,0,0,-2,
             0,1,0,81,
             0,0,1,53.34,
             0,0,0,1
            ],
            "Pure translation matrix 2"
            );
        var m = Matrix.getTranslationMatrix(0,0,0);
        deepEqual(m.elements,
            [1,0,0,0,
             0,1,0,0,
             0,0,1,0,
             0,0,0,1
            ],
            "Pure translation matrix 3"
            );
        m = Matrix.getScaleMatrix(2,5,21);
        deepEqual(m.elements,
            [2,0,0,0,
             0,5,0,0,
             0,0,21,0,
             0,0,0,1
            ],
            "Pure scaling matrix"
            );

        m = Matrix.getScaleMatrix(0,0,0);
        deepEqual(m.elements,
            [0,0,0,0,
             0,0,0,0,
             0,0,0,0,
             0,0,0,1
            ],
            "Pure scaling matrix"
            );
        m = Matrix.getScaleMatrix(-99,0,243981);
        deepEqual(m.elements,
            [-99,0,0,0,
             0,0,0,0,
             0,0,243981,0,
             0,0,0,1
            ],
            "Pure scaling matrix"
            );
        m = Matrix.getRotationMatrix(0,0,0,1);
        deepEqual(m.elements,
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1
            ],
            "Pure rotation matrix"
            );

        m = Matrix.getRotationMatrix(1,0,1,0);
        deepEqual(m.elements,
            [Math.cos(1 * Math.PI / 180.0), 0, Math.sin(1 * Math.PI / 180.0), 0,
             0, 1, 0, 0,
             (-1 * Math.sin(1 * Math.PI / 180.0)), 0, Math.cos(1 * Math.PI / 180.0), 0,
             0, 0, 0, 1
            ],
            "Pure rotation matrix test 2"
            );

        m = Matrix.getRotationMatrix(300,1,1,1);
        var axisLength = Math.sqrt(3);
        var x = 1/axisLength;
        var y = 1/axisLength;
        var z = 1/axisLength;
        var cosine = Math.cos(300 * Math.PI / 180.0);
        var sine = Math.sin(300 * Math.PI / 180.0);

        deepEqual(m.elements,
            [(x * x * (1-cosine) + cosine), (x * y * (1 - cosine) - z * sine), (x * z * (1 - cosine) + y * sine), 0,
             (x * y * (1 - cosine) + z * sine), (y * y * (1 - cosine) + cosine), (y * z * (1 - cosine) - x * sine), 0,
             (x * z * (1- cosine) - y * sine), (y * z * (1 - cosine) + x * sine), (z * z * (1 - cosine) + cosine), 0,
             0, 0, 0, 1
            ],
            "Pure rotation matrix test 3"
            );

        m = Matrix.getRotationMatrix(5,2,0,0);
        axisLength = Math.sqrt(4);
        x = 2/axisLength;
        y = 0;
        z = 0;
        cosine = Math.cos(5 * Math.PI / 180.0);
        sine = Math.sin(5 * Math.PI / 180.0);

        deepEqual(m.elements,
            [1,0,0,0,
             0, cosine, (-1 * x * sine),0,
             0, (x * sine), cosine,0,
             0,0,0,1
            ],
            "Pure rotation matrix test 4"
            );
        m = Matrix.getRotationMatrix(-1,2,-7,0.5);
        axisLength = Math.sqrt(4 + 49 + (0.5 * 0.5));
        x = 2/axisLength;
        y = -7/axisLength;
        z = 0.5/axisLength;
        cosine = Math.cos(-1 * Math.PI / 180.0);
        sine = Math.sin(-1 * Math.PI / 180.0);
        deepEqual(m.elements,
            [(x * x * (1 - cosine) + cosine), (x * y * (1 - cosine) - z * sine), (x * z * (1 - cosine) + y * sine), 0,
             (x * y * (1 - cosine) + z * sine), (y * y * (1 - cosine) + cosine), (y * z * (1 - cosine) - x * sine), 0,
             (x * z * (1 - cosine) - y * sine), (y * z * (1 - cosine) + x * sine), (z * z * (1 - cosine) + cosine), 0,
             0,0,0,1
            ],
            "Pure rotation matrix test 5"
            );
        m = Matrix.getRotationMatrix(2.6,0,0,1);
        x = 0;
        y = 0;
        z = 1;
        cosine = Math.cos(2.6 * Math.PI / 180.0);
        sine = Math.sin(2.6 * Math.PI / 180.0);
        deepEqual(m.elements,
            [cosine,(-1 * z * sine), 0, 0,
             (z * sine), cosine, 0, 0,
             0,0,1,0,
             0,0,0,1
            ],
            "Pure rotation matrix test 6"
            );
    });
    test("Pure Matrix Projection", function () {
        var m3 = Matrix.getOrthoMatrix(-4,4,-2,2,-10,10);
        var width = 4 - -4;
        var height = 2 - -2;
        var depth = 10 - -10;
        deepEqual(m3.elements,
            [2/width,0,0,0,
            0, 2/height,0,0,
            0,0,-2/depth,0,
            0,0,0,1
            ],
            "Pure matrix orthogonal projection"
            );
        var m3 = Matrix.getOrthoMatrix(-1,1,-1,1,-1,1);
        var width = 1 - -1;
        var height = 1 - -1;
        var depth = 1 - -1;
        deepEqual(m3.elements,
            [1,0,0,0,
            0,1,0,0,
            0,0,-1,0,
            0,0,0,1
            ],
            "Pure matrix orthogonal projection 2"
            );
        var m3 = Matrix.getOrthoMatrix(0,2,0,2,0,2);
        var width = 2;
        var height = 2;
        var depth = 2;
        deepEqual(m3.elements,
            [1,0,0,-1,
            0, 1,0,-1,
            0,0,-1,-1,
            0,0,0,1
            ],
            "Pure matrix orthogonal projection 3"
            );
        var m3 = Matrix.getFrustumMatrix(-4,4,-2,2,-10,10);
        var width = 4 - -4;
        var height = 2 - -2;
        var depth = 10 - -10;
        deepEqual(m3.elements,

            [2 * -10 / width, 0, 0, 0,
            0, -5, 0, 0,
            0, 0, 0,10,
            0, 0, -1, 0
            ],
            "Pure matrix frustum projection"
            );
        var m3 = Matrix.getFrustumMatrix(-1,1,-1,1,-1,1);
        var width = 1 - -1;
        var height = 1 - -1;
        var depth = 1 - -1;
        deepEqual(m3.elements,
            [-1,0,0,0,
            0, -1,0,0,
            0,0,0,1,
            0,0,-1,0
            ],
            "Pure matrix frustum projection 2"
            );
        var m3 = Matrix.getFrustumMatrix(0,1,0,1,0,1);
        var width = 1;
        var height = 1;
        var depth = 1;
        deepEqual(m3.elements,
            [0,0,1,0,
            0, 0,1,0,
            0,0,-1,0,
            0,0,-1,0
            ],
            "Pure matrix frustum projection 3"
            );
    });
    test("Pure Matrix Row Major To Column Major", function () {
        var m4 = Matrix.getColumnMajorOrder(
            [1,2,3,4,
             5,6,7,8,
             9,10,11,12,
             13,14,15,16
            ]);
        deepEqual(m4.elements,
            [1,5,9,13,
             2,6,10,14,
             3,7,11,15,
             4,8,12,16
            ],
            "Matrix row major to column major 1"
            );

        var m4 = Matrix.getColumnMajorOrder(
            [0,0,0,0,
            1,1,1,1,
            0,0,0,0,
            1,1,1,1
            ]);
        deepEqual(m4.elements,
            [0,1,0,1,
            0,1,0,1,
            0,1,0,1,
            0,1,0,1
            ],
            "Matrix row major to column major 2"
            );

        var m4 = Matrix.getColumnMajorOrder(
            [0,0,0,0,
             0,0,0,0,
             0,0,0,0,
             0,0,0,0
            ]);
        deepEqual(m4.elements,
            [0,0,0,0,
             0,0,0,0,
             0,0,0,0,
             0,0,0,0
            ],
            "Matrix row major to column major 3"
            );
        var m4 = Matrix.getColumnMajorOrder(
            [0,0,1,2,
             0,0,3,4,
             0,0,5,6,
             0,0,7,8
            ]);
        deepEqual(m4.elements,
            [0,0,0,0,
             0,0,0,0,
             1,3,5,7,
             2,4,6,8
            ],
            "Matrix row major to column major 4"
            );
        var m4 = Matrix.getColumnMajorOrder(
            [1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
            ]);
        deepEqual(m4.elements,
            [1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
            ],
            "Matrix row major to column major 5"
            );
    });
});

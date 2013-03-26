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
            [2,1,-4,3,
             5,88,2.3,17,
             0,1,4,23,
             90,6,7,-5
            ],
            [1,1,1,1,
             1,1,1,1,
             1,1,1,1,
             1,1,1,1
            ]
        );
        deepEqual(m2.elements,
            [2,2,2,2,
             112.3,112.3,112.3,112.3,
             28,28,28,28,
             98,98,98,98
            ],
            "Pure matrix multiplication"
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

        m = Matrix.getScaleMatrix(2,5,21);
        deepEqual(m.elements,
            [2,0,0,0,
             0,5,0,0,
             0,0,21,0,
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
});

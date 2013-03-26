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

        m = Matrix.getRotationMatrix(1,0,1,0);
        deepEqual(m.elements,
            [0.9998477101325989, 0, 0.017452405765652657, 0,
             0, 1, 0, 0,
             -0.017452405765652657, 0, 0.9998477101325989, 0,
             0, 0, 0, 1
            ],
            "Pure rotation matrix test 2"
            );
        m = Matrix.getRotationMatrix(300,1,1,1);
        deepEqual(m.elements,
            [0.6666666865348816, 0.6666666865348816, -0.3333333432674408, 0,
             -0.3333333432674408, 0.6666666865348816, 0.6666666865348816, 0,
             0.6666666865348816, -0.3333333432674408, 0.6666666865348816, 0,
             0, 0, 0, 1
            ],
            "Pure rotation matrix test 3"
            );
        m = Matrix.getRotationMatrix(5,2,0,0);
        deepEqual(m.elements,
            [1,0,0,0,
             0,0.9961947202682495,-0.08715574443340302,0,
             0,0.08715574443340302,0.9961947202682495,0,
             0,0,0,1
            ],
            "Pure rotation matrix test 4"
            );
        m = Matrix.getRotationMatrix(-1,2,-7,0.5);
        deepEqual(m.elements,
            [0.9998591542243958, 0.001155776553787291, 0.016744328662753105, 0,
             -0.0012358617968857288, 0.9999878406524658, 0.004773266147822142, 0,
             -0.016738608479499817, -0.004793287254869938, 0.9998484253883362, 0,
             0,0,0,1
            ],
            "Pure rotation matrix test 5"
            );
        m = Matrix.getRotationMatrix(2.6,0,0,1);
        deepEqual(m.elements,
            [0.9989705681800842, -0.045362986624240875, 0, 0,
             0.045362986624240875, 0.9989705681800842, 0, 0,
             0,0,1,0,
             0,0,0,1
            ],
            "Pure rotation matrix test 6"
            );
    });
});

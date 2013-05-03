/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // This variable stores 3D model information.
        balloonGroup,
        objectsToDraw,

        // Color options for adding balloons
        balloonColors,

        // The function that passes the shape vertices to WebGL
        passVertices,

        // Object update functions
        updateRotation,
        updatePosition,
        getNetAcceleration,
        // Used by updatePosition() and getNetAcceleration()
        netAcceleration,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentInterval,
        rotationMatrix,
        initialTransform,
        instanceTransformMatrix,
        projectionMatrix,
        vertexPosition,
        vertexDiffuseColor,
        vertexSpecularColor,
        shininess,

        // For emphasis, we separate the variables that involve lighting.
        normalVector,
        lightPosition,
        lightDiffuse,
        lightSpecular,


        // Utility functions for managing balloons.
        createBalloon,

        // Context save variable
        savedContext = instanceTransformMatrix,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene;

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Save a balloon mesh to be reused rather than generating a new one
    // every time we add a balloon
    var balloonMesh = Shapes.sphere(0.5),
        balloonMeshVertices = Shapes.toRawTriangleArray(balloonMesh),
        balloonMode = gl.TRIANGLES;

    createBalloon = function () {
        // Create balloon in comparison to where the roof currently is
        var randomHeight = Math.random() * 10 + 3;
        var tyInitial = objectsToDraw[3].instanceTransform.ty + randomHeight;
        return {
            color: balloonColors[Math.floor(12*Math.random())],
            vertices: balloonMeshVertices,
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,
            normals: Shapes.toNormalArray(balloonMesh),
            mode: balloonMode,
            instanceTransform: {
                tx: 5 - Math.random() * 10,
                ty: tyInitial,
                tz: -40 - Math.random() * 40,
                sx:5,
                sy:5,
                sz:5,
                angle:0,
                rx:0,
                ry:1,
                rz:0,
                setupRotation:{
                    angle:180,
                    rx:0,
                    ry:0,
                    rz:1
                }
            },
            rotatable: true,
            floatable: true,
            ground: objectsToDraw[3].ground + randomHeight,
            accelerationVector: new Vector(0, 0.1, 0),
            speedVector: objectsToDraw[3].speedVector
        };
    };

    // Some colors are repeated to balance out color scheme of the balloon group
    balloonColors = [
        // red
        {r: 1, g: 0, b: 0},
        // orange
        {r: 0.99999, g: 0.48, b: 0.01},
        // yellow
        {r: 0.9999, g: 0.9999, b: 0.20},
        // green
        {r: 0.46, g: 0.9999, b: 0.05},
        // magenta
        {r: 1, g: 0, b: 0.45},
        // purple
        {r: 0.6, g: 0, b: 1},
        // orange
        {r: 0.99999, g: 0.48, b: 0.01},
        // green
        {r: 0.46, g: 0.9999, b: 0.05},
        // light blue
        {r: 0.33, g: 0.94, b: 0.9999},
        // dark blue
        {r: 0.2, g: 0.58, b: 0.9999},
        // purple
        {r: 0.6, g: 0, b: 1},
        // magenta
        {r: 1, g: 0, b: 0.45}
    ];

    // Build the objects to display.
    balloonGroup = {
        name: "red balloon",
        color: {r: 1, g: 0, b: 0},
        vertices: balloonMeshVertices,
        specularColor: { r: 1.0, g: 1.0, b: 1.0 },
        shininess: 16,
        normals: Shapes.toNormalArray(balloonMesh),
        mode: balloonMode,
        children: [
        ],
        instanceTransform: {
            tx:-3,
            ty:12,
            tz:-40.0,
            sx:5,
            sy:5,
            sz:5,
            angle:0,
            rx:0,
            ry:1,
            rz:0,
            setupRotation:{
                angle:180,
                rx:0,
                ry:0,
                rz:1
            }
        },
        rotatable: true,
        floatable: true,
        ground: -5,
        accelerationVector: new Vector(0, 0.1, 0),
        speedVector: new Vector(0, 0, 0)
    };

    objectsToDraw = [
        {
            name: "grass",
            color:{r: 0.35, g: 0.85, b: 0.17},
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,
            normals: Shapes.toNormalArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            instanceTransform: {
                tx:0,
                ty:-30,
                tz:-100,
                sx:100,
                sy:1,
                sz:100,
                setupRotation:{
                    angle:45,
                    rx:1,
                    ry:0,
                    rz:0
                }
            }
        },
        {
            name: "sky",
            color:{r: 0.95, g: 0.6, b: 1},
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,
            normals: Shapes.toNormalArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            instanceTransform: {
                tx:0,
                ty:0,
                tz:-1000,
                sx:10000,
                sy:10000,
                sz:1
            },
            children:[
                {
                    name: "sun",
                    color: {r: 1, g: 0.5, b: 0.65},
                    vertices: Shapes.toRawTriangleArray(Shapes.sphere()),
                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                    normals: Shapes.toNormalArray(Shapes.sphere()),
                    mode: gl.TRIANGLES,
                    instanceTransform: {
                        tx:20,
                        ty:16,
                        tz:-60.0,
                        sx:20,
                        sy:20,
                        sz:20
                    }
                }
            ]
        },
        // Roof with cube child
        {
            name: "prism",
            color: {r: 0.5, g: 0.5, b: 0.5},
            vertices: Shapes.toRawTriangleArray(Shapes.triangularPrism()),
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,
            normals: Shapes.toNormalArray(Shapes.triangularPrism()),
            mode: gl.TRIANGLES,
            children: [
                {
                    name: "cube",
                    color: {r: 1, g: 0.943, b: 0.45},
                    vertices: Shapes.toRawTriangleArray(Shapes.cube()),
                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                    normals: Shapes.toNormalArray(Shapes.cube()),
                    mode: gl.TRIANGLES,
                    instanceTransform: {
                        tx:0,
                        ty:-6,
                        // JD: We should talk a bit about whether a child's
                        //     instance transform should be absolute or
                        //     relative to its parent.  For example, here
                        //     you have tz = -50 for the cube.  The roof
                        //     also has tz = -50.  The current absolute
                        //     interpretation of the instance transform
                        //     means that if you move the prism, then you
                        //     will need to move the cube.  With a relative
                        //     interpretation, then moving the parent will
                        //     move the child automatically.
                        tz:-50.0,
                        sx:10,
                        sy:8,
                        sz:10,
                        angle:0,
                        rx:0,
                        ry:1,
                        rz:0
                    },
                    rotatable: true,
                    floatable: true,
                    ground: -23,
                    accelerationVector: new Vector(0, 0, 0),
                    speedVector: new Vector(0, 0, 0)
                }
            ],
            instanceTransform: {
                tx:0,
                ty:0,
                tz:-50.0,
                sx:10,
                sy:10,
                sz:10,
                angle:0,
                rx:0,
                ry:1,
                rz:0
            },
            rotatable: true,
            floatable: true,
            ground: -17,
            accelerationVector: new Vector(0, 0, 0),
            speedVector: new Vector(0, 0, 0)
        },

        // Static balloons
        {
            name: "purple balloon",
            color: {r: 0.6, g: 0, b: 1},
            vertices: balloonMeshVertices,
            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
            shininess: 16,
            normals: Shapes.toNormalArray(balloonMesh),
            mode: balloonMode,
            children: [
                {
                    // Red
                    name: "red balloon",
                    color: {r: 1, g: 0, b: 0},
                    vertices: balloonMeshVertices,
                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                    normals: Shapes.toNormalArray(balloonMesh),
                    mode: balloonMode,
                    children: [
                        {
                            name: "red balloon string",
                            color: {r: 1, g: 1, b: 1},
                            vertices: Shapes.toRawLineArray(Shapes.string(0,-0.5,0,-0.2,-2.15,0)),
                            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                            shininess: 16,
                            normals: Shapes.toNormalArray(balloonMesh),
                            mode: gl.LINES,
                            instanceTransform: {
                                tx:1,
                                ty:15,
                                tz:-40.0,
                                sx:5,
                                sy:5,
                                sz:5,
                                angle:0,
                                rx:0,
                                ry:1,
                                rz:0
                            },
                            floatable: true,
                            ground: -2,
                            accelerationVector: new Vector(0, 0, 0),
                            speedVector: new Vector(0, 0, 0)
                        }
                    ],
                    instanceTransform: {
                        tx:1,
                        ty:15,
                        tz:-40.0,
                        sx:5,
                        sy:5,
                        sz:5,
                        angle:0,
                        rx:0,
                        ry:1,
                        rz:0,
                        setupRotation:{
                            angle:180,
                            rx:0,
                            ry:0,
                            rz:1
                        }
                    },
                    rotatable: true,
                    floatable: true,
                    ground: -2,
                    accelerationVector: new Vector(0, 0.1, 0),
                    speedVector: new Vector(0, 0, 0)
                },
                {
                    // Orange
                    color: {r: 0.99999, g: 0.48, b: 0.01},
                    vertices: balloonMeshVertices,
                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                    normals: Shapes.toNormalArray(balloonMesh),
                    mode: balloonMode,
                    children: [
                        {
                            name: "orange balloon string",
                            color: {r: 1, g: 1, b: 1},
                            vertices: Shapes.toRawLineArray(Shapes.string(0,-0.5,0,-0.5,-1.7,0)),
                            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                            shininess: 16,
                            normals: Shapes.toNormalArray(balloonMesh),
                            mode: gl.LINES,
                            instanceTransform: {
                                tx:4,
                                ty:13,
                                tz:-40.0,
                                sx:5,
                                sy:5,
                                sz:5,
                                angle:0,
                                rx:0,
                                ry:1,
                                rz:0
                            },
                            floatable: true,
                            ground: -4,
                            accelerationVector: new Vector(0, 0, 0),
                            speedVector: new Vector(0, 0, 0)
                        }
                    ],
                    instanceTransform: {
                        tx:4,
                        ty:13,
                        tz:-40.0,
                        sx:5,
                        sy:5,
                        sz:5,
                        angle:0,
                        rx:0,
                        ry:1,
                        rz:0,
                        setupRotation:{
                            angle:180,
                            rx:0,
                            ry:0,
                            rz:1
                        }
                    },
                    rotatable: true,
                    floatable: true,
                    ground: -4,
                    accelerationVector: new Vector(0, 0.1, 0),
                    speedVector: new Vector(0, 0, 0)
                },
                {
                    // Yellow
                    color: {r: 0.9999, g: 0.9999, b: 0.20},
                    vertices: balloonMeshVertices,
                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                    normals: Shapes.toNormalArray(balloonMesh),
                    mode: balloonMode,
                    children: [
                        {
                            name: "yellow balloon string",
                            color: {r: 1, g: 1, b: 1},
                            vertices: Shapes.toRawLineArray(Shapes.string(0,-0.5,0,0.2,-1.5,0)),
                            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                            shininess: 16,
                            normals: Shapes.toNormalArray(balloonMesh),
                            mode: gl.LINES,
                            instanceTransform: {
                                tx:-1,
                                ty:12,
                                tz:-40.0,
                                sx:5,
                                sy:5,
                                sz:5,
                                angle:0,
                                rx:0,
                                ry:1,
                                rz:0
                            },
                            floatable: true,
                            ground: -5,
                            accelerationVector: new Vector(0, 0, 0),
                            speedVector: new Vector(0, 0, 0)
                        }
                    ],
                    instanceTransform: {
                        tx:-1,
                        ty:12,
                        tz:-40.0,
                        sx:5,
                        sy:5,
                        sz:5,
                        angle:0,
                        rx:0,
                        ry:1,
                        rz:0,
                        setupRotation:{
                            angle:180,
                            rx:0,
                            ry:0,
                            rz:1
                        }
                    },
                    rotatable: true,
                    floatable: true,
                    ground: -5,
                    accelerationVector: new Vector(0, 0.1, 0),
                    speedVector: new Vector(0, 0, 0)
                },
                {
                    // Green
                    color: {r: 0.46, g: 0.9999, b: 0.05},
                    vertices: balloonMeshVertices,
                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                    normals: Shapes.toNormalArray(balloonMesh),
                    mode: balloonMode,
                    children: [
                        {
                            name: "green balloon string",
                            color: {r: 1, g: 1, b: 1},
                            vertices: Shapes.toRawLineArray(Shapes.string(0,-0.5,0,-0.25,-1.35,0)),
                            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                            shininess: 16,
                            normals: Shapes.toNormalArray(balloonMesh),
                            mode: gl.LINES,
                            instanceTransform: {
                                tx:2,
                                ty:11,
                                tz:-40.0,
                                sx:5,
                                sy:5,
                                sz:5,
                                angle:0,
                                rx:0,
                                ry:1,
                                rz:0
                            },
                            floatable: true,
                            ground: -6,
                            accelerationVector: new Vector(0, 0, 0),
                            speedVector: new Vector(0, 0, 0)
                        }
                    ],
                    instanceTransform: {
                        tx:2,
                        ty:11,
                        tz:-40.0,
                        sx:5,
                        sy:5,
                        sz:5,
                        angle:0,
                        rx:0,
                        ry:1,
                        rz:0,
                        setupRotation:{
                            angle:180,
                            rx:0,
                            ry:0,
                            rz:1
                        }
                    },
                    rotatable: true,
                    floatable: true,
                    ground: -6,
                    accelerationVector: new Vector(0, 0.1, 0),
                    speedVector: new Vector(0, 0, 0)
                },
                {
                    // Light blue
                    color: {r: 0.33, g: 0.94, b: 0.9999},
                    vertices: balloonMeshVertices,
                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                    normals: Shapes.toNormalArray(balloonMesh),
                    mode: balloonMode,
                    children: [
                        {
                            name: "light blue balloon string",
                            color: {r: 1, g: 1, b: 1},
                            vertices: Shapes.toRawLineArray(Shapes.string(0,-0.5,0,0.45,-1.95,0)),
                            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                            shininess: 16,
                            normals: Shapes.toNormalArray(balloonMesh),
                            mode: gl.LINES,
                            instanceTransform: {
                                tx:-2,
                                ty:14,
                                tz:-40.0,
                                sx:5,
                                sy:5,
                                sz:5,
                                angle:0,
                                rx:0,
                                ry:1,
                                rz:0
                            },
                            floatable: true,
                            ground: -3,
                            accelerationVector: new Vector(0, 0, 0),
                            speedVector: new Vector(0, 0, 0)
                        }
                    ],
                    instanceTransform: {
                        tx:-2,
                        ty:14,
                        tz:-40.0,
                        sx:5,
                        sy:5,
                        sz:5,
                        angle:0,
                        rx:0,
                        ry:1,
                        rz:0,
                        setupRotation:{
                            angle:180,
                            rx:0,
                            ry:0,
                            rz:1
                        }
                    },
                    rotatable: true,
                    floatable: true,
                    ground: -3,
                    accelerationVector: new Vector(0, 0.1, 0),
                    speedVector: new Vector(0, 0, 0)
                },
                {
                    // Dark blue
                    color: {r: 0.2, g: 0.58, b: 0.9999},
                    vertices: balloonMeshVertices,
                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                    normals: Shapes.toNormalArray(balloonMesh),
                    mode: balloonMode,
                    children: [
                        {
                            name: "dark blue balloon string",
                            color: {r: 1, g: 1, b: 1},
                            vertices: Shapes.toRawLineArray(Shapes.string(0,-0.5,0,0.6,-1.2,0)),
                            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                            shininess: 16,
                            normals: Shapes.toNormalArray(balloonMesh),
                            mode: gl.LINES,
                            instanceTransform: {
                                tx:-3,
                                ty:10,
                                tz:-40.0,
                                sx:5,
                                sy:5,
                                sz:5,
                                angle:0,
                                rx:0,
                                ry:1,
                                rz:0
                            },
                            floatable: true,
                            ground: -7,
                            accelerationVector: new Vector(0, 0, 0),
                            speedVector: new Vector(0, 0, 0)
                        }
                    ],
                    instanceTransform: {
                        tx:-3,
                        ty:10,
                        tz:-40.0,
                        sx:5,
                        sy:5,
                        sz:5,
                        angle:0,
                        rx:0,
                        ry:1,
                        rz:0,
                        setupRotation:{
                            angle:180,
                            rx:0,
                            ry:0,
                            rz:1
                        }
                    },
                    rotatable: true,
                    floatable: true,
                    ground: -7,
                    accelerationVector: new Vector(0, 0.1, 0),
                    speedVector: new Vector(0, 0, 0)
                },
                {
                    // Magenta
                    color: {r: 1, g: 0, b: 0.45},
                    vertices: balloonMeshVertices,
                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                    normals: Shapes.toNormalArray(balloonMesh),
                    mode: balloonMode,
                    children: [
                        {
                            name: "magenta balloon string",
                            color: {r: 1, g: 1, b: 1},
                            vertices: Shapes.toRawLineArray(Shapes.string(0,-0.5,0,-1.1,-1.15,0)),
                            specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                            shininess: 16,
                            normals: Shapes.toNormalArray(balloonMesh),
                            mode: gl.LINES,
                            instanceTransform: {
                                tx:6,
                                ty:10,
                                tz:-40.0,
                                sx:5,
                                sy:5,
                                sz:5,
                                angle:0,
                                rx:0,
                                ry:1,
                                rz:0
                            },
                            floatable: true,
                            ground: -7,
                            accelerationVector: new Vector(0, 0, 0),
                            speedVector: new Vector(0, 0, 0)
                        }
                    ],
                    instanceTransform: {
                        tx:6,
                        ty:10,
                        tz:-40.0,
                        sx:5,
                        sy:5,
                        sz:5,
                        angle:0,
                        rx:0,
                        ry:1,
                        rz:0,
                        setupRotation:{
                            angle:180,
                            rx:0,
                            ry:0,
                            rz:1
                        }
                    },
                    rotatable: true,
                    floatable: true,
                    ground: -7,
                    accelerationVector: new Vector(0, 0.1, 0),
                    speedVector: new Vector(0, 0, 0)
                },
                {
                    name: "purple balloon string",
                    color: {r: 1, g: 1, b: 1},
                    vertices: Shapes.toRawLineArray(Shapes.string(0,-0.5,0,-1.0,-0.8,0)),
                    specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                    normals: Shapes.toNormalArray(balloonMesh),
                    mode: gl.LINES,
                    instanceTransform: {
                        tx:5,
                        ty:8,
                        tz:-40.0,
                        sx:5,
                        sy:5,
                        sz:5,
                        angle:0,
                        rx:0,
                        ry:1,
                        rz:0
                    },
                    floatable: true,
                    ground: -9,
                    accelerationVector: new Vector(0, 0, 0),
                    speedVector: new Vector(0, 0, 0)
                }
            ],
            instanceTransform: {
                tx:5,
                ty:8,
                tz:-40.0,
                sx:5,
                sy:5,
                sz:5,
                angle:0,
                rx:0,
                ry:1,
                rz:0,
                setupRotation:{
                    angle:180,
                    rx:0,
                    ry:0,
                    rz:1
                }
            },
            rotatable: true,
            floatable: true,
            ground: -9,
            accelerationVector: new Vector(0, 0.1, 0),
            speedVector: new Vector(0, 0, 0)
        },

        // Dynamic balloons
        balloonGroup
    ];

    // Context save function
    save = function () {
        savedContext = initialTransform;
    };

    // Context restore function
    restore = function () {
        // Reset instance transform matrix
        gl.uniformMatrix4fv(instanceTransformMatrix, gl.FALSE, new Float32Array(
            savedContext
        ));

        // Reset rotation matrix
        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(
            new Matrix4x4().elements
        ));
    };

    // Pass the vertices to WebGL.
    passVertices = function (shapes) {
        var i,
            maxi,
            j,
            maxj;

        for (i = 0, maxi = shapes.length; i < maxi; i += 1) {
            shapes[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    shapes[i].vertices);

            if (!shapes[i].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                shapes[i].colors = [];

                for (j = 0, maxj = shapes[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    shapes[i].colors = shapes[i].colors.concat(
                        shapes[i].color.r,
                        shapes[i].color.g,
                        shapes[i].color.b
                    );
                }
            }
            shapes[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    shapes[i].colors);

            // Same trick with specular colors.
            console.log("name " + shapes[i].name);
            if (!shapes[i].specularColors) {
                // Future refactor: helper function to convert a single value or
                // array into an array of copies of itself.
                shapes[i].specularColors = [];
                for (j = 0, maxj = shapes[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    shapes[i].specularColors = shapes[i].specularColors.concat(
                        shapes[i].specularColor.r,
                        shapes[i].specularColor.g,
                        shapes[i].specularColor.b
                    );
                }
            }
            shapes[i].specularBuffer = GLSLUtilities.initVertexBuffer(gl,
                    shapes[i].specularColors);

        // One more buffer: normals.
        shapes[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl,
                shapes[i].normals);

            // Look for nested shapes' vertices to pass. Also checks to make
            // sure the children array isn't empty
            if (shapes[i].children && shapes[i].children.length !== 0) {
                passVertices(shapes[i].children);
            }
        }
    };

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);
    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    instanceTransformMatrix = gl.getUniformLocation(shaderProgram, "instanceTransformMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    shininess = gl.getUniformLocation(shaderProgram, "shininess");

    /*
     * Updates the rotation matrix of each object.
     */
    updateRotation = function (objects) {
        for (var i = 0; i < objects.length; i++) {

            if (objects[i].rotatable) {
                objects[i].instanceTransform.angle += 0.5;

                if (objects[i].instanceTransform.angle > 360) {
                    objects[i].instanceTransform.angle -= 360;
                }
            }
            if (objects[i].children) {
                updateRotation(objects[i].children);
            }
        }
    };

    getNetAcceleration = function (objects) {
        for (var i = 0; i < objects.length; i++) {

            if (objects[i].accelerationVector){
                netAcceleration = netAcceleration.add(objects[i].accelerationVector);
            }
            if (objects[i].children) {
                getNetAcceleration(objects[i].children);
            }
        }
    };

    updatePosition = function (objects, framesPerSecond) {
        for (var i = 0; i < objects.length; i++) {
            getNewPosition(objects[i], netAcceleration, framesPerSecond);
            if (objects[i].children) {
                updatePosition(objects[i].children, framesPerSecond);
            }
        }
    };

    /*
     * Displays an individual object.
     */
    drawObject = function (object) {
       // console.log("mode original " + object.mode);
        var i;

        // JD: I can see why you're doing restore here, but I have an
        //     alternate suggestion... (see below)
        restore();

        if (object.instanceTransform) {
            // Change the instance transform matrix.
            gl.uniformMatrix4fv(instanceTransformMatrix, gl.FALSE, new Float32Array(
                Matrix4x4.getInstanceTransform(object.instanceTransform).getColumnMajorOrder().elements
            ));
        }

        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, object.specularBuffer);
        gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

        // Set the shininess.
        gl.uniform1f(shininess, object.shininess);

        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        //console.log("mode " + object.mode);
        //console.log("length " + object.vertices.length);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);

        if (object.children) {
            for (i = 0; i < object.children.length; i += 1) {
                // JD: ..."bracketing" this with save and restore will
                //     facilitate relative instance transforms:
                //
                //save();
                drawObject(object.children[i]);
                //restore();
                //
                // JD: See how that would work?  Of course, this requires
                //     that your save/restore structure is a *stack*, and
                //     not a single value.  It may even be better to call
                //     these functions "pushInstanceTransform" and
                //     "popInstanceTransform."
            }
        }
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        var i,
            maxi;
        initialTransform = Matrix4x4.getInstanceTransform({
            tx:0,
            ty:0,
            tz:0,
            sx:1,
            sy:1,
            sz:1,
            angle:0,
            rx:0,
            ry:0,
            rz:1
        }).getColumnMajorOrder().elements;

        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //save the original context
        save(); // JD: See my comment above on using save/restore.

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    // Set up the projection matrix.
    gl.uniformMatrix4fv(projectionMatrix,
        gl.FALSE, new Float32Array(
            Matrix4x4.getOrthoMatrix4x4(-30, 30, -30, 30, 5, 10000).getColumnMajorOrder().elements
        )
    );

    // Set up our one light source and its colors.
    gl.uniform4fv(lightPosition, [500.0, 1000.0, 100.0, 0.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);
    gl.uniform3fv(lightSpecular, [1.0, 1.0, 1.0]);

    // Draw the initial scene.
    passVertices(objectsToDraw);
    drawScene();

    // Manage rotation and movement in scene
    if (currentInterval) {
        clearInterval(currentInterval);
        currentInterval = null;
    } else {
        currentInterval = setInterval(function () {
            netAcceleration = new Vector(0, 0, 0);
            getNetAcceleration(objectsToDraw);
            updatePosition(objectsToDraw, 30);
            /*if (objectsToDraw[2].ground !== objectsToDraw[2].instanceTransform.ty) {
                updateRotation(objectsToDraw);
            }*/
            updateRotation(objectsToDraw);
            drawScene();
        }, 30);
    }

    // Set up the event handler for adding or removing a balloon.
    $(document).keydown(function (event) {
        if (event.keyCode === 38) {
            event.preventDefault();
            balloonGroup.children.push(createBalloon());
            passVertices(balloonGroup.children);
            drawScene();
        }
        if (event.keyCode === 40) {
            event.preventDefault();
            balloonGroup.children.splice(balloonGroup.length*Math.random(), 1);
            drawScene();
        }
    });

}(document.getElementById("upHouse")));

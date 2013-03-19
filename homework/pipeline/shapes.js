/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },
    
    /*
     * Returns the vertices for a triangular prism with 2 rectangular sides and base
     * (basically laying on its side).
     */
    triangularPrism: function () {
        // These variables are actually "constants" for trangular prism coordinates.
        var X = 0.75,
            Y = 0.5,
            Z = -0.75;

        return {
            vertices: [
                [ X, 0.0, Z ],
                [ -X, 0.0, Z ],
                [ 0.0, Y, Z ],
                [ X, 0.0, -Z ],
                [ -X, 0.0, -Z ],
                [ 0.0, Y, -Z ]
            ],

            indices: [
                [ 0, 1, 2 ],
                [ 0, 2, 3 ], //Rectangle
                [ 3, 5, 2 ],
                [ 3, 4, 5 ],
                [ 4, 5, 1 ],  // Rectangle
                [ 1, 2, 5 ],
                [ 0, 1, 3 ], // Rectangle, bottom
                [ 4, 1, 3 ]
            ]
        };
    },

    /*
     * Returns the vertices for a cube.
     */    
    cube: function() {
        var X = 0.75,
            Y = 0.75,
            Z = -0.75;

        return {
            vertices: [
                [X, Y, Z],
                [X, -Y, Z],
                [-X, -Y, Z],
                [-X, Y, Z],
                [X, Y, -Z],
                [X, -Y, -Z],
                [-X, -Y, -Z],
                [-X, Y, -Z]
            ],

            indices: [
                [ 0, 1, 3 ], // Front
                [ 3, 2, 1 ],
                [ 0, 1, 5 ], // Sides
                [ 5, 4, 0 ],
                [ 3, 2, 6 ],
                [ 6, 7, 3 ],
                [ 0, 3, 4 ], // Top
                [ 3, 4, 7 ],
                [ 1, 2, 5 ], // Bottom
                [ 2, 5, 6 ],
                [ 4, 5, 6 ], // Back
                [ 4, 6, 7 ]
            ]
        };
    },

    /*
     * Returns the vertices for a sphere mesh.
     * Mathematical concept from http://learningwebgl.com/blog/?p=1253
     * Takes a parameter called balloon, if balloon is not passed in, then we
     * assume we're building a regular sphere, otherwise a balloon shape is
     * generated.
     */
    sphere: function(balloon) {
        var radius = 0.5,
            maxTheta = Math.PI,
            maxPhi = 2 * Math.PI,
            latitudeLines = 10,
            longitudeLines = 10,
            currentLatitude,
            currentLongitude,
            vertices = [],
            indices = [],
            structureToReturn = {},
            i,
            j,
            k,
            l;
        // Figure out if we're working with a balloon shape
        balloon = balloon ? 0.6 : 0;
        //Build vertices
        for (i = 0; i < (latitudeLines + 1); i++) {
            currentLatitude = i * maxTheta / latitudeLines;
            for (j = 0; j < (longitudeLines + 1); j++) {
                vertices[latitudeLines * i + j] = [];
                currentLongitude = j * maxPhi / longitudeLines;
                vertices[latitudeLines * i + j][0] = radius * Math.sin(currentLatitude) * Math.cos(currentLongitude);
                vertices[latitudeLines * i + j][1] = radius * Math.cos(currentLatitude);
                vertices[latitudeLines * i + j][2] = radius * Math.sin(currentLatitude) * Math.sin(currentLongitude);
                if (balloon) {
                    vertices[latitudeLines * i + j][0] *= (currentLatitude*balloon);
                    vertices[latitudeLines * i + j][2] *= (currentLatitude*balloon);
                }
            }
        }
        
        // Build indices
        for (k = 0; k < (latitudeLines + 1); k++) {
            for(l = 0; l < (longitudeLines + 1); l++) {

                indices[2 * ((latitudeLines + 1) * k + l)] = [];
                indices[2 * ((latitudeLines + 1) * k + l) + 1] = [];

                // First Triangle
                // Top left of square
                indices[2 * ((latitudeLines + 1) * k + l)][0] = longitudeLines * k + l;
                // Top right of square
                indices[2 * ((latitudeLines + 1) * k + l)][1] = longitudeLines * k + l + 1;
                // Bottom left of square
                indices[2 * ((latitudeLines + 1) * k + l)][2] = longitudeLines * (k + 1) + l;
                
                // Second Triangle
                // Bottom left of square
                indices[2 * ((latitudeLines + 1) * k + l) + 1][0] = longitudeLines * (k + 1) + l;
                // Bottom right of square
                indices[2 * ((latitudeLines + 1) * k + l) + 1][1] = longitudeLines * (k + 1) + l + 1;
                // Top right of square
                indices[2 * ((latitudeLines + 1) * k + l) + 1][2] = longitudeLines * k + l + 1;
            }
        }

        structureToReturn.vertices = vertices;
        structureToReturn.indices = indices;
        return structureToReturn;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    }

};
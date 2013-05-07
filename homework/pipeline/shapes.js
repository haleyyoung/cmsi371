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
                [ 3, 2, 5 ],
                [ 3, 5, 4 ],
                [ 4, 5, 1 ],  // Rectangle
                [ 1, 5, 2 ],
                [ 0, 3, 1 ], // Rectangle, bottom
                [ 4, 3, 1 ]
            ]
        };
    },

    /*
     * Returns the vertices for a cube.
     */
    cube: function () {
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
                [ 3, 1, 2 ],
                [ 0, 5, 1 ], // Sides
                [ 5, 0, 4 ],
                [ 3, 2, 6 ],
                [ 6, 7, 3 ],
                [ 0, 3, 4 ], // Top
                [ 3, 7, 4 ],
                [ 1, 5, 2 ], // Bottom
                [ 2, 5, 6 ],
                [ 4, 6, 5 ], // Back
                [ 4, 7, 6 ]
            ]
        };
    },

    /*
     * Returns the vertices for a string on a balloon.
     */
    string: function (x1, y1, z1, x2, y2, z2) {

        return {
            vertices: [
                [x1, y1, z1],
                [x2, y2, z2],
            ],

            indices: [
                [ 0, 1, 0 ]
            ]
        };
    },

    /*
     * Returns the vertices for a sphere mesh.
     * Mathematical concept from http://learningwebgl.com/blog/?p=1253
     *
     * Takes a parameter called balloon, if balloon is not passed in, then we
     * assume we're building a regular sphere, otherwise a balloon shape is
     * generated.
     */
    sphere: function (balloon) {
        var radius = 0.5,
            maxTheta = Math.PI,
            maxPhi = 2 * Math.PI,
            latitudeLines = 20,
            longitudeLines = 20,
            currentLatitude,
            currentLongitude,
            currentVertex,
            currentIndex,
            vertices = [],
            indices = [],
            structureToReturn = {},
            i,
            j,
            k,
            l;

        balloon = balloon ? balloon : 0;
        //Build vertices
        for (i = 0; i < (latitudeLines + 1); i += 1) {
            currentLatitude = i * maxTheta / latitudeLines;
            for (j = 0; j < (longitudeLines + 1); j += 1) {
                currentVertex = latitudeLines * i + j;

                vertices[currentVertex] = [];
                currentLongitude = j * maxPhi / longitudeLines;

                vertices[currentVertex][0] = radius * Math.sin(currentLatitude) * Math.cos(currentLongitude);
                vertices[currentVertex][1] = radius * Math.cos(currentLatitude);
                vertices[currentVertex][2] = radius * Math.sin(currentLatitude) * Math.sin(currentLongitude);
                if (balloon) {
                    vertices[currentVertex][0] *= (currentLatitude * balloon);
                    vertices[currentVertex][2] *= (currentLatitude * balloon);
                }
            }
        }

        // Build indices
        for (k = 0; k < (latitudeLines); k += 1) {
            for (l = 0; l < (longitudeLines); l += 1) {
                currentIndex = 2 * ((latitudeLines) * k + l);

                indices[2 * ((latitudeLines) * k + l)] = [];
                indices[2 * ((latitudeLines) * k + l) + 1] = [];

                // First Triangle
                // Top left of square
                indices[currentIndex][0] = longitudeLines * k + l;
                // Top right of square
                indices[currentIndex][1] = longitudeLines * k + l + 1;
                // Bottom left of square
                indices[currentIndex][2] = longitudeLines * (k + 1) + l;

                // Second Triangle
                currentIndex += 1;

                // Bottom left of square
                indices[currentIndex][0] = longitudeLines * (k + 1) + l;
                // Top right of square
                indices[currentIndex][1] = longitudeLines * k + l + 1;
                // Bottom right of square
                indices[currentIndex][2] = longitudeLines * (k + 1) + l + 1;
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
    },

    /*
     * Copied from Dondi's bazaar!
     * Utility function for computing normal vectors based on indexed vertices.
     * The secret: take the cross product of each triangle.  Note that vertex order
     * now matters---the resulting normal faces out from the side of the triangle
     * that "sees" the vertices listed counterclockwise.
     *
     * The vector computations involved here mean that the Vector module must be
     * loaded up for this function to work.
     */
    toNormalArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p0,
            p1,
            p2,
            v0,
            v1,
            v2,
            normal;

        // For each face...
        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            // We form vectors from the first and second then second and third vertices.
            p0 = indexedVertices.vertices[indexedVertices.indices[i][0]];
            p1 = indexedVertices.vertices[indexedVertices.indices[i][1]];
            p2 = indexedVertices.vertices[indexedVertices.indices[i][2]];

            // Technically, the first value is not a vector, but v can stand for vertex
            // anyway, so...
            v0 = new Vector(p0[0], p0[1], p0[2]);
            v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
            v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
            normal = v1.cross(v2).unit();

            // We then use this same normal for every vertex in this face.
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    },

    /*
     * Another utility function for computing normals, this time just converting
     * every vertex into its unit vector version.  This works mainly for objects
     * that are centered around the origin.
     */
    toVertexNormalArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p,
            normal;

        // For each face...
        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            // For each vertex in that face...
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                p = indexedVertices.vertices[indexedVertices.indices[i][j]];
                normal = new Vector(p[0], p[1], p[2]).unit();
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    }
};
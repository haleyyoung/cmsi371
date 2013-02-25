/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        backgroundColors = {
            bottom: "#D4D4D4",
            middle: "#A9A9A9",
            top: "#656565",
            colorStop1: 0.5,
            colorStop2: 0.6,
            colorStop3: 0.7
        },
        minionVertices = {
            start: {x: 0, y: 0},
            cp1: {x: -150, y: 0},
            cp2: {x: -150, y: 300},
            bottom: {x: 0, y: 300},
            cp3: {x: 150, y: 300},
            cp4: {x: 150, y: 0},
            color1: {color: "#FFFF80", stop: 0.1, x: -200, y: 150, r: 200},
            color2: {color: "#FFFF4D", stop: 0.2, x: 0, y: 150, r: 400}
        },
        eyes = {
            ball: {x: 0, y: 100},
            ballRadius: 30,
            ballColor: "white",
            pupilRadius: 10,
            pupilColor: "brown",
            corneaRadius: 5,
            corneaColor: "black",
            goggleRadius: 30,
            goggleColor: "gray"
        },
        goggles = {
            left: {x: -102, y: 85},
            cp1: {x: 0, y: 125},
            right: {x: 102, y: 85},
            color: "black"
        },
        mouth = {
            left: {x: -40, y: 0},
            cp1: {x: -20, y: 20},
            cp2: {x: 0, y: 30},
            right: {x: 10, y: 0},
            cp3: {x: 0, y: -20},
            cp4: {x: -20, y: -20},
            blowRadius: 10,
            smile: {
                start: {x: -40, y: 0},
                cp1: {x: -20, y: 20},
                end: {x: 0, y: 0},
                color: "gray"
            },
            color: "black"
        },
        arms = {
            left: {x: -85, y: 225},
            cp1: {x: -70, y: 245},
            cp2: {x: 0, y: 235},
            right: {x: 90, y: 225},
            cp3: {x: 70, y: 245},
            cp4: {x: 65, y: 235},
            color: "#FFFF22",
            hand: {
                left: {x: 0, y: 235},
                right: {x: 65, y: 235}
            }
        },
        overalls = {
            left: {x: -105, y: 200},
            cp1: {x: -50, y: 215},
            bottomLeft: {x: -35, y: 260},
            right: {x: 105, y: 200},
            cp2: {x: 50, y: 215},
            bottomRight: {x: 35, y: 260},
            side: {
                left: {x: -70, y: 260},
                cp1: {x: 10, y: 120},
                right: {x: 70, y: 260}
            },
            color: "blue"
        },
        legs = {
            corner: {x: -50, y: 280},
            width: 40,
            height: 31,
            color: "blue"
        },
        shoes = {
            bottom: {
                start: {x: -51, y: 320},
                cp1: {x: -30, y: 350},
                end: {x: -9, y: 320}
            },
            boot: {
                corner: {x: -50, y: 310},
                width: 40,
                height: 11
            },
            color: "black"
        },
        minionLeftVertices = {
            eyes: {
                start: {x: -105, y: 60},
                end: {x: -115, y: 130},
                width: 20,
                color: "gray"
            },
            mouth: {
                start: {x: -114, y: 160},
                cp1: {x: -110, y: 170},
                end: {x: -100, y: 165},
                width: 4,
                color: "gray"
            },
            legDown: {
                corner: {x: -30, y: 280},
                width: 60,
                height: 36,
                color: "blue"
            },
            shoeDown: {
                corner: {x: -30, y: 315},
                width: 60,
                height: 16,
                color: "black"
            },
            legUp: {
                start: {x: -30, y: 280},
                bottomLeft: {x: -50, y: 310},
                bottomRight: {x: -10, y: 330},
                topRight: {x: 10, y: 280},
                color: "blue",
                separationColor: "black"
            },
            shoeUp: {
                bottom: {
                    start: {x: -49, y: 310},
                    cp1: {x: -80, y: 290},
                    cp2: {x: -100, y: 310},
                    end: {x: -51, y: 328}
                },
                boot: {
                    start: {x: -50, y: 310},
                    bottomLeft: {x: -52, y: 328},
                    bottomRight: {x: -16, y: 340},
                    topRight: {x: -5, y: 320}
                },
                color: "black"
            },
            arms: {
                left: {
                    shoulder: {x: 0, y: 0},
                    cp1: {x: 30, y: 80},
                    end: {x: 10, y: 110},
                    width: 20,
                    hand: {
                        radius: 20,
                        center: {x: 5, y: 120},
                        color: "black"
                    }
                }
            }
        },
        minionRightVertices = {
            legDown: {
                corner: {x: -30, y: 280},
                width: 60,
                height: 36,
                color: "blue"
            },
            shoeDown: {
                start: {x: -25, y: 315},
                cp1: {x: -60, y: 305},
                cp2: {x: -80, y: 325},
                end: {x: -26, y: 331},
                corner: {x: -30, y: 315},
                width: 60,
                height: 16,
                color: "black"
            },
            legUp: {
                start: {x: -30, y: 280},
                bottomLeft: {x: -50, y: 295},
                bottomRight: {x: -10, y: 315},
                topRight: {x: 10, y: 280},
                color: "blue"
            },
            shoeUp: {
                bottom: {
                    start: {x: -49, y: 295},
                    cp1: {x: -80, y: 270},
                    cp2: {x: -100, y: 295},
                    end: {x: -51, y: 313}
                },
                boot: {
                    start: {x: -50, y: 295},
                    bottomLeft: {x: -52, y: 313},
                    bottomRight: {x: -36, y: 330},
                    topRight: {x: -30, y: 305}
                },
                color: "black"
            }
        },
        cupcakeVertices = {
            candle: {
                corner: {x: 7, y: -70},
                width: 6,
                height: 30,
                color: "#FF0066"
            },
            frosting: {
                start: {x: -30, y: -20},
                cp1: {x: -20, y: -40},
                cp2: {x: -10, y: -45},
                cp3: {x: 0, y: -60},
                cp4: {x: 10, y: -60},
                cp5: {x: 10, y: -60},
                cp6: {x: 20, y: -60},
                cp7: {x: 30, y: -45},
                cp8: {x: 40, y: -40},
                end: {x: 50, y: -20},
                color: "purple"
            },
            cake: {
                topLeft: {x: -30, y: -20},
                bottomLeft: {x: -20, y: 30},
                bottomRight: {x: 40, y: 30},
                topRight: {x: 50, y: -20},
                cp1: {x: 0, y: 0},
                colorLight: "turquoise",
                colorDark: "#207068"
            },
            fire: {
                bottom: {x: 10, y: -70},
                left: {x: 0, y: -80},
                top: {x: 10, y: -110},
                right: {x: 20, y: -80},
                colorYellow: "yellow",
                colorOrange: "orange",
                colorStop: 0.4
            }
        },
 
        // JD: Hmmmm, based on the data structures above and the code below,
        //     I think you should use blank lines more :)

        // First, a selection of "drawing functions" from which we
        // can choose.
        background = function (renderingContext) {
            var backgroundGradient = renderingContext.createLinearGradient(0, 0, 0, canvas.height);
            backgroundGradient.addColorStop(0, backgroundColors.top);
            backgroundGradient.addColorStop(backgroundColors.colorStop2, backgroundColors.middle);
            backgroundGradient.addColorStop(backgroundColors.colorStop3, backgroundColors.bottom);
            renderingContext.fillStyle = backgroundGradient;
            renderingContext.beginPath();
            renderingContext.fillRect(0, 0, canvas.width, canvas.height);
            renderingContext.fill();
        },

        minionBody = function (renderingContext, up) {
            up = up ? up : 0; // JD: Cooler way: up = up || 0;
            // Body
            var bodyGradient = renderingContext.createRadialGradient(minionVertices.color1.x,
                    minionVertices.color1.y - up, minionVertices.color1.r,
                    minionVertices.color2.x, minionVertices.color2.y - up, minionVertices.color2.r);
            bodyGradient.addColorStop(minionVertices.color1.stop, minionVertices.color1.color);
            bodyGradient.addColorStop(minionVertices.color2.stop, minionVertices.color2.color);
            renderingContext.fillStyle = bodyGradient;
            renderingContext.beginPath();
            renderingContext.moveTo(minionVertices.start.x, minionVertices.start.y - up);
            renderingContext.bezierCurveTo(minionVertices.cp1.x, minionVertices.cp1.y - up,
                minionVertices.cp2.x, minionVertices.cp2.y - up, minionVertices.bottom.x,
                minionVertices.bottom.y);
            renderingContext.bezierCurveTo(minionVertices.cp3.x, minionVertices.cp3.y - up,
                minionVertices.cp4.x, minionVertices.cp4.y - up, minionVertices.start.x,
                minionVertices.start.y - up);
            renderingContext.fill();
            // Goggles Strap
            renderingContext.strokeStyle = goggles.color;
            renderingContext.lineWidth = 14;
            renderingContext.beginPath();
            renderingContext.moveTo(goggles.left.x, goggles.left.y - up);
            renderingContext.quadraticCurveTo(goggles.cp1.x, goggles.cp1.y - up, goggles.right.x,
                goggles.right.y - up);
            renderingContext.stroke();
        },

        minion = function (renderingContext) {
            minionBody(renderingContext);
            var i,
            // Overalls
                overallGradient = renderingContext.createRadialGradient(minionVertices.start.x, minionVertices.start.y,
                    40, minionVertices.start.x, minionVertices.start.y, 470);
            overallGradient.addColorStop(0, "transparent");
            overallGradient.addColorStop(0.5, "transparent");
            overallGradient.addColorStop(0.51, overalls.color);
            renderingContext.fillStyle = overallGradient;
            renderingContext.beginPath();
            renderingContext.moveTo(minionVertices.start.x, minionVertices.start.y);
            renderingContext.bezierCurveTo(minionVertices.cp1.x, minionVertices.cp1.y,
                minionVertices.cp2.x, minionVertices.cp2.y, minionVertices.bottom.x,
                minionVertices.bottom.y);
            renderingContext.bezierCurveTo(minionVertices.cp3.x, minionVertices.cp3.y,
                minionVertices.cp4.x, minionVertices.cp4.y, minionVertices.start.x,
                minionVertices.start.y);
            renderingContext.fill();
            // Overalls shoulders
            renderingContext.strokeStyle = overalls.color;
            renderingContext.lineWidth = 10;
            renderingContext.beginPath();
            renderingContext.moveTo(overalls.left.x, overalls.left.y);
            renderingContext.quadraticCurveTo(overalls.cp1.x, overalls.cp1.y, overalls.bottomLeft.x,
                overalls.bottomLeft.y);
            renderingContext.stroke();
            renderingContext.beginPath();
            renderingContext.moveTo(overalls.right.x, overalls.right.y);
            renderingContext.quadraticCurveTo(overalls.cp2.x, overalls.cp2.y, overalls.bottomRight.x,
                overalls.bottomRight.y);
            renderingContext.stroke();
            // Arms
            renderingContext.strokeStyle = arms.color;
            renderingContext.lineWidth = minionLeftVertices.arms.left.width;
            renderingContext.beginPath();
            renderingContext.moveTo(arms.left.x, arms.left.y);
            renderingContext.quadraticCurveTo(arms.cp1.x, arms.cp1.y, arms.cp2.x, arms.cp2.y);
            renderingContext.stroke();
            renderingContext.beginPath();
            renderingContext.moveTo(arms.right.x, arms.right.y);
            renderingContext.quadraticCurveTo(arms.cp3.x, arms.cp3.y, arms.cp4.x, arms.cp4.y);
            renderingContext.stroke();
            // Hands
            renderingContext.fillStyle = minionLeftVertices.arms.left.hand.color;
            renderingContext.beginPath();
            renderingContext.arc(arms.hand.left.x, arms.hand.left.y,
                minionLeftVertices.arms.left.hand.radius, 0, Math.PI * 2);
            renderingContext.fill();
            renderingContext.beginPath();
            renderingContext.arc(arms.hand.right.x, arms.hand.right.y,
                minionLeftVertices.arms.left.hand.radius, 0, Math.PI * 2);
            renderingContext.fill();
            // Legs
            renderingContext.fillStyle = legs.color;
            renderingContext.fillRect(legs.corner.x, legs.corner.y, legs.width, legs.height);
            renderingContext.fillRect(legs.corner.x + legs.width + 20, legs.corner.y, legs.width, legs.height);
            // Shoes
            renderingContext.fillStyle = shoes.color;
            for (i = 0; i <= 60; i += 60) {
                renderingContext.beginPath();
                renderingContext.moveTo(shoes.bottom.start.x + i, shoes.bottom.start.y);
                renderingContext.quadraticCurveTo(shoes.bottom.cp1.x + i, shoes.bottom.cp1.y,
                    shoes.bottom.end.x + i, shoes.bottom.end.y);
                renderingContext.closePath();
                renderingContext.fill();
                renderingContext.fillRect(shoes.boot.corner.x + i, shoes.boot.corner.y,
                    shoes.boot.width, shoes.boot.height);
            }
        },

        eyeOpen = function (renderingContext, color, radius) {
            if (!color) {
                renderingContext.fillStyle = eyes.ballColor;
                renderingContext.beginPath();
                renderingContext.arc(eyes.ball.x, eyes.ball.y, eyes.ballRadius, 0, Math.PI * 2);
                renderingContext.fill();
                renderingContext.fillStyle = eyes.pupilColor;
                renderingContext.beginPath();
                renderingContext.arc(eyes.ball.x, eyes.ball.y, eyes.pupilRadius, 0, Math.PI * 2);
                renderingContext.fill();
            }
            // Check for blinking
            // JD: I changed these ones for the cooler JavaScript way.
            //     Don't these just look better?
            //color = color ? color : eyes.corneaColor;
            //radius = radius ? radius : eyes.corneaRadius;
            color = color || eyes.corneaColor;
            radius = radius || eyes.corneaRadius;

            renderingContext.fillStyle = color;
            renderingContext.beginPath();
            renderingContext.arc(eyes.ball.x, eyes.ball.y, radius, 0, Math.PI * 2);
            renderingContext.fill();
            renderingContext.strokeStyle = eyes.goggleColor;
            renderingContext.lineWidth = 10;
            renderingContext.beginPath();
            renderingContext.arc(eyes.ball.x, eyes.ball.y, eyes.goggleRadius, 0, Math.PI * 2);
            renderingContext.stroke();
        },

        eyeBlinking = function (renderingContext) {
            eyeOpen(renderingContext, minionVertices.color1.color, eyes.ballRadius);
        },

        minionSide = function (renderingContext, up) {
            // JD: up = up || 0;
            up = up ? up : 0;
            minionBody(renderingContext, up);
            // Eye 
            renderingContext.strokeStyle = minionLeftVertices.eyes.color;
            renderingContext.lineWidth = minionLeftVertices.eyes.width;
            renderingContext.beginPath();
            renderingContext.moveTo(minionLeftVertices.eyes.start.x, minionLeftVertices.eyes.start.y - up);
            renderingContext.lineTo(minionLeftVertices.eyes.end.x, minionLeftVertices.eyes.end.y - up);
            renderingContext.stroke();
            // Mouth
            renderingContext.strokeStyle = minionLeftVertices.mouth.color;
            renderingContext.lineWidth = minionLeftVertices.mouth.width;
            renderingContext.beginPath();
            renderingContext.moveTo(minionLeftVertices.mouth.start.x, minionLeftVertices.mouth.start.y - up);
            renderingContext.quadraticCurveTo(minionLeftVertices.mouth.cp1.x, minionLeftVertices.mouth.cp1.y - up,
                minionLeftVertices.mouth.end.x, minionLeftVertices.mouth.end.y - up);
            renderingContext.stroke();
            // Overalls
            var overallGradient = renderingContext.createRadialGradient(minionVertices.start.x,
                    minionVertices.start.y - up, up, minionVertices.start.x, minionVertices.start.y - up, 470);
            overallGradient.addColorStop(0, "transparent");
            overallGradient.addColorStop(0.5, "transparent");
            overallGradient.addColorStop(0.51, overalls.color);
            renderingContext.fillStyle = overallGradient;
            renderingContext.beginPath();
            renderingContext.moveTo(minionVertices.start.x, minionVertices.start.y - up);
            renderingContext.bezierCurveTo(minionVertices.cp1.x, minionVertices.cp1.y - up,
                minionVertices.cp2.x, minionVertices.cp2.y - up, minionVertices.bottom.x,
                minionVertices.bottom.y);
            renderingContext.bezierCurveTo(minionVertices.cp3.x, minionVertices.cp3.y - up,
                minionVertices.cp4.x, minionVertices.cp4.y - up, minionVertices.start.x,
                minionVertices.start.y - up);
            renderingContext.fill();
            // Overalls shoulders
            renderingContext.strokeStyle = overalls.color;
            renderingContext.lineWidth = 10;
            renderingContext.beginPath();
            renderingContext.moveTo(overalls.side.left.x, overalls.side.left.y - up);
            renderingContext.quadraticCurveTo(overalls.side.cp1.x, overalls.side.cp1.y - up,
                overalls.side.right.x, overalls.side.right.y - up);
            renderingContext.stroke();
        },

        minionSideUp = function (renderingContext) {
            minionSide(renderingContext, 10);
        },

        minionLeft = function (renderingContext) {
            // Right leg
            renderingContext.fillStyle = minionLeftVertices.legDown.color;
            renderingContext.fillRect(minionLeftVertices.legDown.corner.x, minionLeftVertices.legDown.corner.y,
                minionLeftVertices.legDown.width, minionLeftVertices.legDown.height);
            renderingContext.fillStyle = minionLeftVertices.shoeDown.color;
            renderingContext.fillRect(minionLeftVertices.shoeDown.corner.x, minionLeftVertices.shoeDown.corner.y,
                minionLeftVertices.shoeDown.width, minionLeftVertices.shoeDown.height);
            // Left leg
            renderingContext.fillStyle = minionLeftVertices.legUp.color;
            renderingContext.beginPath();
            renderingContext.moveTo(minionLeftVertices.legUp.start.x, minionLeftVertices.legUp.start.y);
            renderingContext.lineTo(minionLeftVertices.legUp.bottomLeft.x, minionLeftVertices.legUp.bottomLeft.y);
            renderingContext.lineTo(minionLeftVertices.legUp.bottomRight.x, minionLeftVertices.legUp.bottomRight.y);
            renderingContext.lineTo(minionLeftVertices.legUp.topRight.x, minionLeftVertices.legUp.topRight.y);
            renderingContext.lineTo(minionLeftVertices.legUp.start.x, minionLeftVertices.legUp.start.y);
            renderingContext.fill();
            // Separation between legs
            renderingContext.strokeStyle = minionLeftVertices.legUp.separationColor;
            renderingContext.lineWidth = 1;
            renderingContext.beginPath();
            renderingContext.moveTo(minionLeftVertices.legUp.bottomRight.x, minionLeftVertices.legUp.bottomRight.y);
            renderingContext.lineTo(minionLeftVertices.legUp.topRight.x, minionLeftVertices.legUp.topRight.y);
            renderingContext.stroke();
            // Left shoe
            renderingContext.fillStyle = minionLeftVertices.shoeUp.color;
            renderingContext.beginPath();
            renderingContext.moveTo(minionLeftVertices.shoeUp.bottom.start.x,
                minionLeftVertices.shoeUp.bottom.start.y);
            renderingContext.bezierCurveTo(minionLeftVertices.shoeUp.bottom.cp1.x,
                minionLeftVertices.shoeUp.bottom.cp1.y, minionLeftVertices.shoeUp.bottom.cp2.x,
                minionLeftVertices.shoeUp.bottom.cp2.y, minionLeftVertices.shoeUp.bottom.end.x,
                minionLeftVertices.shoeUp.bottom.end.y);
            renderingContext.closePath();
            renderingContext.fill();
            renderingContext.moveTo(minionLeftVertices.shoeUp.boot.start.x, minionLeftVertices.shoeUp.boot.start.y);
            renderingContext.lineTo(minionLeftVertices.shoeUp.boot.bottomLeft.x,
                minionLeftVertices.shoeUp.boot.bottomLeft.y);
            renderingContext.lineTo(minionLeftVertices.shoeUp.boot.bottomRight.x,
                minionLeftVertices.shoeUp.boot.bottomRight.y);
            renderingContext.lineTo(minionLeftVertices.shoeUp.boot.topRight.x,
                minionLeftVertices.shoeUp.boot.topRight.y);
            renderingContext.lineTo(minionLeftVertices.shoeUp.boot.start.x, minionLeftVertices.shoeUp.boot.start.y);
            renderingContext.fill();
        },

        minionRight = function (renderingContext) {
            // Right leg
            renderingContext.fillStyle = minionRightVertices.legDown.color;
            renderingContext.fillRect(minionRightVertices.legDown.corner.x, minionRightVertices.legDown.corner.y,
                minionRightVertices.legDown.width, minionRightVertices.legDown.height);
            // Right shoe
            renderingContext.fillStyle = minionLeftVertices.shoeUp.color;
            renderingContext.beginPath();
            renderingContext.moveTo(minionRightVertices.shoeUp.bottom.start.x,
                minionRightVertices.shoeUp.bottom.start.y);
            renderingContext.bezierCurveTo(minionRightVertices.shoeUp.bottom.cp1.x,
                minionRightVertices.shoeUp.bottom.cp1.y, minionRightVertices.shoeUp.bottom.cp2.x,
                minionRightVertices.shoeUp.bottom.cp2.y, minionRightVertices.shoeUp.bottom.end.x,
                minionRightVertices.shoeUp.bottom.end.y);
            renderingContext.closePath();
            renderingContext.fill();
            renderingContext.moveTo(minionRightVertices.shoeUp.boot.start.x, minionRightVertices.shoeUp.boot.start.y);
            renderingContext.lineTo(minionRightVertices.shoeUp.boot.bottomLeft.x,
                minionRightVertices.shoeUp.boot.bottomLeft.y);
            renderingContext.lineTo(minionRightVertices.shoeUp.boot.bottomRight.x,
                minionRightVertices.shoeUp.boot.bottomRight.y);
            renderingContext.lineTo(minionRightVertices.shoeUp.boot.topRight.x,
                minionRightVertices.shoeUp.boot.topRight.y);
            renderingContext.lineTo(minionRightVertices.shoeUp.boot.start.x,
                minionRightVertices.shoeUp.boot.start.y);
            renderingContext.fill();
            // Left leg
            renderingContext.fillStyle = minionRightVertices.legUp.color;
            renderingContext.beginPath();
            renderingContext.moveTo(minionRightVertices.legUp.start.x, minionRightVertices.legUp.start.y);
            renderingContext.lineTo(minionRightVertices.legUp.bottomLeft.x, minionRightVertices.legUp.bottomLeft.y);
            renderingContext.lineTo(minionRightVertices.legUp.bottomRight.x, minionRightVertices.legUp.bottomRight.y);
            renderingContext.lineTo(minionRightVertices.legUp.topRight.x, minionRightVertices.legUp.topRight.y);
            renderingContext.lineTo(minionRightVertices.legUp.start.x, minionRightVertices.legUp.start.y);
            renderingContext.fill();
            // Separation between legs
            renderingContext.strokeStyle = minionLeftVertices.legUp.separationColor;
            renderingContext.lineWidth = 1;
            renderingContext.beginPath();
            renderingContext.moveTo(minionRightVertices.legDown.corner.x, minionRightVertices.legDown.corner.y);
            renderingContext.lineTo(minionRightVertices.legDown.corner.x,
                minionRightVertices.legDown.corner.y + minionRightVertices.legDown.height);
            renderingContext.stroke();
            // Left shoe
            renderingContext.fillStyle = minionLeftVertices.shoeDown.color;
            renderingContext.fillRect(minionRightVertices.shoeDown.corner.x, minionRightVertices.shoeDown.corner.y,
                minionRightVertices.shoeDown.width, minionRightVertices.shoeDown.height);
            renderingContext.beginPath();
            renderingContext.moveTo(minionRightVertices.shoeDown.start.x, minionRightVertices.shoeDown.start.y);
            renderingContext.bezierCurveTo(minionRightVertices.shoeDown.cp1.x, minionRightVertices.shoeDown.cp1.y,
                minionRightVertices.shoeDown.cp2.x, minionRightVertices.shoeDown.cp2.y,
                minionRightVertices.shoeDown.end.x, minionRightVertices.shoeDown.end.y);
            renderingContext.closePath();
            renderingContext.fill();
        },

        minionSideArms = function (renderingContext) {
            renderingContext.strokeStyle = minionVertices.color2.color;
            renderingContext.lineWidth = minionLeftVertices.arms.left.width;
            renderingContext.beginPath();
            renderingContext.moveTo(minionLeftVertices.arms.left.shoulder.x, minionLeftVertices.arms.left.shoulder.y);
            renderingContext.quadraticCurveTo(minionLeftVertices.arms.left.cp1.x, minionLeftVertices.arms.left.cp1.y,
                minionLeftVertices.arms.left.end.x, minionLeftVertices.arms.left.end.y);
            renderingContext.stroke();
            renderingContext.fillStyle = minionLeftVertices.arms.left.hand.color;
            renderingContext.beginPath();
            renderingContext.arc(minionLeftVertices.arms.left.hand.center.x,
                minionLeftVertices.arms.left.hand.center.y, minionLeftVertices.arms.left.hand.radius, 0, Math.PI * 2);
            renderingContext.fill();
        },

        mouthOpen = function (renderingContext) {
            renderingContext.fillStyle = mouth.color;
            renderingContext.beginPath();
            renderingContext.moveTo(mouth.left.x, mouth.left.y);
            renderingContext.bezierCurveTo(mouth.cp1.x, mouth.cp1.y, mouth.cp2.x,
                mouth.cp2.y, mouth.right.x, mouth.right.y);
            renderingContext.bezierCurveTo(mouth.cp3.x, mouth.cp3.y, mouth.cp4.x,
                mouth.cp4.y, mouth.left.x, mouth.left.y);
            renderingContext.fill();
        },

        mouthBlowing = function (renderingContext) {
            renderingContext.fillStyle = mouth.color;
            renderingContext.beginPath();
            renderingContext.arc(mouth.cp2.x, mouth.right.y, mouth.blowRadius, 0, Math.PI * 2);
            renderingContext.fill();
        },

        mouthSmiling = function (renderingContext, mad) {
            renderingContext.strokeStyle = mouth.smile.color;
            renderingContext.lineWidth = minionLeftVertices.mouth.width;
            renderingContext.beginPath();
            renderingContext.moveTo(mouth.smile.start.x, mouth.smile.start.y);
            if (mad) {
                renderingContext.lineTo(mouth.smile.end.x, mouth.smile.end.y);
            } else {
                renderingContext.quadraticCurveTo(mouth.smile.cp1.x, mouth.smile.cp1.y,
                    mouth.smile.end.x, mouth.smile.end.y);
            }
            renderingContext.stroke();
        },

        mouthMad = function (renderingContext) {
            mouthSmiling(renderingContext, true);
        },

        cupcake = function (renderingContext) {
            // Frosting
            var frostingGradient = renderingContext.createRadialGradient(cupcakeVertices.frosting.cp4.x,
                    cupcakeVertices.frosting.cp4.y, 2, cupcakeVertices.frosting.cp4.x, cupcakeVertices.frosting.cp4.y, 50),
                cakeGradient = renderingContext.createLinearGradient(cupcakeVertices.cake.topLeft.x,
                    cupcakeVertices.cake.topLeft.y, cupcakeVertices.cake.topRight.x,
                    cupcakeVertices.cake.topRight.y);
            frostingGradient.addColorStop(0, "white");
            frostingGradient.addColorStop(1, cupcakeVertices.frosting.color);
            renderingContext.fillStyle = frostingGradient;
            renderingContext.beginPath();
            renderingContext.moveTo(cupcakeVertices.frosting.start.x, cupcakeVertices.frosting.start.y);
            renderingContext.quadraticCurveTo(cupcakeVertices.frosting.cp1.x, cupcakeVertices.frosting.cp1.y,
                cupcakeVertices.frosting.cp2.x, cupcakeVertices.frosting.cp2.y);
            renderingContext.quadraticCurveTo(cupcakeVertices.frosting.cp3.x, cupcakeVertices.frosting.cp3.y,
                cupcakeVertices.frosting.cp4.x, cupcakeVertices.frosting.cp4.y);
            renderingContext.quadraticCurveTo(cupcakeVertices.frosting.cp6.x, cupcakeVertices.frosting.cp6.y,
                cupcakeVertices.frosting.cp7.x, cupcakeVertices.frosting.cp7.y);
            renderingContext.quadraticCurveTo(cupcakeVertices.frosting.cp8.x, cupcakeVertices.frosting.cp8.y,
                cupcakeVertices.frosting.end.x, cupcakeVertices.frosting.end.y);
            renderingContext.quadraticCurveTo(cupcakeVertices.cake.cp1.x, cupcakeVertices.cake.cp1.y,
                cupcakeVertices.cake.topLeft.x, cupcakeVertices.cake.topLeft.y);
            renderingContext.fill();
            // Cake
            cakeGradient.addColorStop(0, cupcakeVertices.cake.colorDark);
            cakeGradient.addColorStop(0.3, cupcakeVertices.cake.colorLight);
            cakeGradient.addColorStop(1, cupcakeVertices.cake.colorDark);
            renderingContext.fillStyle = cakeGradient;
            renderingContext.beginPath();
            renderingContext.moveTo(cupcakeVertices.cake.topLeft.x, cupcakeVertices.cake.topLeft.y);
            renderingContext.lineTo(cupcakeVertices.cake.bottomLeft.x, cupcakeVertices.cake.bottomLeft.y);
            renderingContext.lineTo(cupcakeVertices.cake.bottomRight.x, cupcakeVertices.cake.bottomRight.y);
            renderingContext.lineTo(cupcakeVertices.cake.topRight.x, cupcakeVertices.cake.topRight.y);
            renderingContext.quadraticCurveTo(cupcakeVertices.cake.cp1.x, cupcakeVertices.cake.cp1.y,
                cupcakeVertices.cake.topLeft.x, cupcakeVertices.cake.topLeft.y);
            renderingContext.fill();
            // Candle
            renderingContext.fillStyle = cupcakeVertices.candle.color;
            renderingContext.beginPath();
            renderingContext.fillRect(cupcakeVertices.candle.corner.x, cupcakeVertices.candle.corner.y,
                cupcakeVertices.candle.width, cupcakeVertices.candle.height);
            renderingContext.fill();
        },

        fire = function (renderingContext, blowing) {
            var linearGradientFire = renderingContext.createLinearGradient(cupcakeVertices.fire.left.x,
                    cupcakeVertices.fire.bottom.y, cupcakeVertices.fire.right.x, cupcakeVertices.fire.top.y);
            linearGradientFire.addColorStop(0, cupcakeVertices.fire.colorOrange);
            linearGradientFire.addColorStop(1, cupcakeVertices.fire.colorYellow);
            renderingContext.fillStyle = linearGradientFire;
            renderingContext.beginPath();
            renderingContext.moveTo(cupcakeVertices.fire.bottom.x, cupcakeVertices.fire.bottom.y);
            if (blowing) {
                renderingContext.quadraticCurveTo(cupcakeVertices.fire.left.x, cupcakeVertices.fire.left.y,
                    cupcakeVertices.fire.top.x + 20, cupcakeVertices.fire.top.y - 5);
                renderingContext.quadraticCurveTo(cupcakeVertices.fire.right.x + 20, cupcakeVertices.fire.right.y,
                    cupcakeVertices.fire.bottom.x, cupcakeVertices.fire.bottom.y);
            } else {
                renderingContext.quadraticCurveTo(cupcakeVertices.fire.left.x, cupcakeVertices.fire.left.y,
                    cupcakeVertices.fire.top.x, cupcakeVertices.fire.top.y);
                renderingContext.quadraticCurveTo(cupcakeVertices.fire.right.x, cupcakeVertices.fire.right.y,
                    cupcakeVertices.fire.bottom.x, cupcakeVertices.fire.bottom.y);
            }
            renderingContext.fill();
        },

        fireBlowing = function (renderingContext) {
            fire(renderingContext, true);
        },

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: [minionSide, minionSideUp],
                keyframes: [
                    {
                        frame: 0,
                        tx: 1200,
                        ty: 350,
                        ease: KeyframeTweener.runToAbruptStop
                    },
                    {
                        frame: 100,
                        tx: 300,
                        ty: 350
                    }
                ],
                frameRate: 5
            },

            {
                draw: [minionSide],
                keyframes: [
                    {
                        frame: 100,
                        tx: 300,
                        ty: 350
                    },
                    {
                        frame: 150,
                        tx: 300,
                        ty: 350
                    }
                ]
            },

            {
                draw: [minionLeft, minionRight],
                keyframes: [
                    {
                        frame: 0,
                        tx: 1200,
                        ty: 350,
                        ease: KeyframeTweener.runToAbruptStop
                    },
                    {
                        frame: 100,
                        tx: 300,
                        ty: 350
                    }
                ],
                frameRate: 5
            },

            {
                draw: [minionLeft],
                keyframes: [
                    {
                        frame: 100,
                        tx: 300,
                        ty: 350,
                        ease: KeyframeTweener.runToAbruptStop
                    },
                    {
                        frame: 150,
                        tx: 300,
                        ty: 350
                    }
                ]
            },

            {
                draw: [minion],
                keyframes: [
                    {
                        frame: 150,
                        tx: 300,
                        ty: 350,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },
                    {
                        frame: 440,
                        tx: 300,
                        ty: 350
                    }
                ]
            },

            {
                draw: [eyeOpen],
                keyframes: [
                    {
                        frame: 150,
                        tx: 300,
                        ty: 350,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },
                    {
                        frame: 340,
                        tx: 300,
                        ty: 350
                    }
                ]
            },

            {
                draw: [mouthOpen],
                keyframes: [
                    {
                        frame: 150,
                        tx: 320,
                        ty: 510,
                        ease: KeyframeTweener.quadEaseInOut
                    },
                    {
                        frame: 170,
                        tx: 320,
                        ty: 510
                    }
                ]
            },

            {
                draw: [mouthBlowing],
                keyframes: [
                    {
                        frame: 170,
                        tx: 320,
                        ty: 515,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },
                    {
                        frame: 210,
                        tx: 320,
                        ty: 515,
                        sx: 0.5,
                        sy: 0.5
                    }
                ]
            },

            {
                draw: [mouthSmiling],
                keyframes: [
                    {
                        frame: 210,
                        tx: 320,
                        ty: 510
                    },
                    {
                        frame: 285,
                        tx: 320,
                        ty: 510
                    }
                ]
            },

            {
                draw: [mouthMad],
                keyframes: [
                    {
                        frame: 285,
                        tx: 320,
                        ty: 510
                    },
                    {
                        frame: 340,
                        tx: 320,
                        ty: 510
                    }
                ]
            },

            {
                draw: [eyeOpen, eyeBlinking],
                keyframes: [
                    {
                        frame: 310,
                        tx: 300,
                        ty: 350
                    },
                    {
                        frame: 326,
                        tx: 300,
                        ty: 350
                    }
                ],
                frameRate: 4
            },

            {
                draw: [eyeOpen],
                keyframes: [
                    {
                        frame: 326,
                        tx: 300,
                        ty: 350,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },
                    {
                        frame: 440,
                        tx: 300,
                        ty: 350
                    }
                ]
            },

            {
                draw: [fire],
                keyframes: [
                    {
                        frame: 0,
                        tx: 150,
                        ty: 610
                    },
                    {
                        frame: 150,
                        tx: 150,
                        ty: 610,
                        ease: KeyframeTweener.linear
                    },
                    {
                        frame: 150,
                        tx: 330,
                        ty: 610
                    },
                    {
                        frame: 180,
                        tx: 330,
                        ty: 610
                    }
                ]
            },

            // The candle magically relights
            {
                draw: [fire],
                keyframes: [
                    {
                        frame: 250,
                        tx: 330,
                        ty: 620,
                        ease: KeyframeTweener.fireFlickering
                    },
                    {
                        frame: 270,
                        tx: 330,
                        ty: 610
                    },
                    {
                        frame: 360,
                        tx: 330,
                        ty: 610
                    }
                ]
            },

            {
                draw: [fireBlowing],
                keyframes: [
                    {
                        frame: 180,
                        tx: 330,
                        ty: 610,
                        ease: KeyframeTweener.quadEaseIn
                    },
                    {
                        frame: 200,
                        tx: 330,
                        ty: 610
                    }
                ]
            },

            // Trying to blow it out again
            {
                draw: [mouthOpen],
                keyframes: [
                    {
                        frame: 340,
                        tx: 320,
                        ty: 510,
                        ease: KeyframeTweener.quadEaseInOut
                    },
                    {
                        frame: 345,
                        tx: 320,
                        ty: 510
                    }
                ]
            },

            {
                draw: [mouthBlowing],
                keyframes: [
                    {
                        frame: 345,
                        tx: 320,
                        ty: 515,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },
                    {
                        frame: 395,
                        tx: 320,
                        ty: 515,
                        sx: 0.5,
                        sy: 0.5
                    }
                ]
            },

            {
                draw: [fireBlowing],
                keyframes: [
                    {
                        frame: 360,
                        tx: 330,
                        ty: 610,
                        ease: KeyframeTweener.quadEaseIn
                    },
                    {
                        frame: 390,
                        tx: 330,
                        ty: 610
                    }
                ]
            },

            {
                draw: [mouthSmiling],
                keyframes: [
                    {
                        frame: 395,
                        tx: 320,
                        ty: 510
                    },
                    {
                        frame: 435,
                        tx: 320,
                        ty: 510
                    }
                ]
            },

            {
                draw: [mouthMad],
                keyframes: [
                    {
                        frame: 435,
                        tx: 320,
                        ty: 510
                    },
                    {
                        frame: 440,
                        tx: 320,
                        ty: 510
                    }
                ]
            },

            {
                draw: [minionSide],
                keyframes: [
                    {
                        frame: 440,
                        tx: 300,
                        ty: 350
                    },
                    {
                        frame: 500,
                        tx: 300,
                        ty: 350
                    }
                ]
            },
            
            {
                draw: [minionLeft],
                keyframes: [
                    {
                        frame: 440,
                        tx: 300,
                        ty: 350
                    },
                    {
                        frame: 500,
                        tx: 300,
                        ty: 350
                    }
                ]
            },
            // These sprites need to be drawn in this specific order and at the end
            {
                draw: [cupcake],
                keyframes: [
                    {
                        frame: 0,
                        tx: 150,
                        ty: 610
                    },
                    {
                        frame: 150,
                        tx: 150,
                        ty: 610,
                        ease: KeyframeTweener.linear
                    },
                    {
                        frame: 150,
                        tx: 330,
                        ty: 610,
                    },
                    {
                        frame: 440,
                        tx: 330,
                        ty: 610,
                        ease: KeyframeTweener.quadEeaseInOut
                    },
                    {
                        frame: 450,
                        tx: 390,
                        ty: 500,
                        ease: KeyframeTweener.quadEaseIn
                    },
                    {
                        frame: 455,
                        tx: 360,
                        ty: 360,
                        ease: KeyframeTweener.quadEaseIn
                    },
                    {
                        frame: 490,
                        tx: -10,
                        ty: 380,
                        rotate: -360
                    }
                ]
            },

            {
                draw: [fire],
                keyframes: [
                    {
                        frame: 410,
                        tx: 330,
                        ty: 620,
                        ease: KeyframeTweener.fireFlickering
                    },
                    {
                        frame: 440,
                        tx: 330,
                        ty: 610,
                        ease: KeyframeTweener.quadEeaseInOut
                    },
                    {
                        frame: 450,
                        tx: 390,
                        ty: 500,
                        ease: KeyframeTweener.quadEaseIn
                    },
                    {
                        frame: 455,
                        tx: 360,
                        ty: 360,
                        ease: KeyframeTweener.quadEaseIn
                    },
                    {
                        frame: 490,
                        tx: -10,
                        ty: 380,
                        rotate: -360
                    }
                ]
            },
            {
                draw: [minionSideArms],
                keyframes: [
                    {
                        frame: 0,
                        tx: 1200,
                        ty: 560,
                        ease: KeyframeTweener.runToAbruptStop
                    },
                    {
                        frame: 100,
                        tx: 300,
                        ty: 560,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },
                    {
                        frame: 150,
                        tx: 300,
                        ty: 560,
                        rotate: 70
                    }
                ]
            },

            {
                draw: [minionSide, minionSideUp],
                keyframes: [
                    {
                        frame: 500,
                        tx: 300,
                        ty: 350,
                        ease: KeyframeTweener.quadEaseIn
                    },
                    {
                        frame: 550,
                        tx: -100,
                        ty: 350
                    }
                ],
                frameRate: 5
            },

            {
                draw: [minionLeft, minionRight],
                keyframes: [
                    {
                        frame: 500,
                        tx: 300,
                        ty: 350,
                        ease: KeyframeTweener.quadEaseIn
                    },
                    {
                        frame: 550,
                        tx: -100,
                        ty: 350
                    }
                ],
                frameRate: 5
            },

            {
                draw: [minionSideArms],
                keyframes: [
                    {
                        frame: 440,
                        tx: 300,
                        ty: 560,
                        ease: KeyframeTweener.quadEaseIn
                    },
                    {
                        frame: 460,
                        tx: 300,
                        ty: 560,
                        rotate: -210,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },
                    {
                        frame: 500,
                        tx: 300,
                        ty: 560,
                        ease: KeyframeTweener.quadEaseIn
                    },
                    {
                        frame: 550,
                        tx: -100,
                        ty: 560
                    }
                ]
            }
        ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites,
        background: background
    });
}());

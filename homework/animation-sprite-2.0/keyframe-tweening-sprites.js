/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        minionVertices = { start: {x: 400, y: 350},
                           cp1: {x: 250, y: 350},
                           cp2: {x: 250, y: 650},
                           bottom: {x: 400, y: 650},
                           cp3: {x: 550, y: 650},
                           cp4: {x: 550, y: 350},
                           color: "yellow"
                         },
        eyes = { ball: {x:400, y:450},
                 ballRadius: 30,
                 ballColor: "white",
                 pupilRadius:10,
                 pupilColor: "brown",
                 corneaRadius: 5,
                 corneaColor: "black",
                 goggleRadius: 30,
                 goggleColor: "gray" 
        },
        mouth = { left: {x: 380, y: 510},
                  cp1: {x: 400, y: 530},
                  cp2: {x: 420, y: 540},
                  right: {x: 430, y: 510},
                  cp3: {x: 420, y: 490},
                  cp4: {x: 400, y: 490},
                  color: "black"
        },
        legs = { corner: {x: 350, y:630},
                 width: 40,
                 height: 40,
                 color: "blue"
        },
        cupcakeVertices = { candle: { corner: {x: 75, y:50},
                                      width: 10,
                                      height: 30,
                                      color: "red"
                                     
                                    },
                            frosting: {
                                       start: {x: 40, y:100},
                                       cp1: {x: 50, y: 80},
                                       cp2: {x: 60, y: 75},
                                       cp3: {x: 70, y: 60},
                                       cp4: {x: 80, y: 60},
                                       cp5: {x: 80, y: 60},
                                       cp6: {x: 90, y: 60},
                                       cp7: {x: 100, y: 75},
                                       cp8: {x: 110, y: 80},
                                       end: {x: 120, y: 100},
                                       color: "purple"
                                      },
                            cake: {
                                   topLeft: {x: 40, y: 100},
                                   bottomLeft: {x: 50, y: 150},
                                   bottomRight: {x: 110, y: 150},
                                   topRight: {x: 120, y: 100},
                                   cp1: {x: 70, y: 120},
                                   color: "turquoise"
                                  }
        },

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        background = function (renderingContext) {
            renderingContext.fillStyle = "blue";
            renderingContext.beginPath();
            renderingContext.fillRect(0,0, canvas.width, canvas.height);
            renderingContext.fill();
        },
            
        minion = function (renderingContext) {
            // Body
            renderingContext.fillStyle = minionVertices.color;
            renderingContext.beginPath();
            renderingContext.moveTo(minionVertices.start.x, minionVertices.start.y);
            renderingContext.bezierCurveTo(minionVertices.cp1.x, minionVertices.cp1.y,
                minionVertices.cp2.x, minionVertices.cp2.y, minionVertices.bottom.x,
                minionVertices.bottom.y);
            renderingContext.bezierCurveTo(minionVertices.cp3.x, minionVertices.cp3.y,
                minionVertices.cp4.x, minionVertices.cp4.y, minionVertices.start.x,
                minionVertices.start.y);
            renderingContext.fill();
            // Eye
            renderingContext.fillStyle = eyes.ballColor;
            renderingContext.beginPath();
            renderingContext.arc(eyes.ball.x, eyes.ball.y, eyes.ballRadius, 0, Math.PI*2);
            renderingContext.fill(); 
            renderingContext.fillStyle = eyes.pupilColor;
            renderingContext.beginPath();
            renderingContext.arc(eyes.ball.x, eyes.ball.y, eyes.pupilRadius, 0, Math.PI*2);
            renderingContext.fill(); 
            renderingContext.fillStyle = eyes.corneaColor;
            renderingContext.beginPath();
            renderingContext.arc(eyes.ball.x, eyes.ball.y, eyes.corneaRadius, 0, Math.PI*2);
            renderingContext.fill(); 
            renderingContext.strokeStyle = eyes.goggleColor;
            renderingContext.lineWidth = 10;
            renderingContext.beginPath();
            renderingContext.arc(eyes.ball.x, eyes.ball.y, eyes.goggleRadius, 0, Math.PI*2);
            renderingContext.stroke();
            // Legs
            renderingContext.fillStyle = legs.color;
            renderingContext.fillRect(legs.corner.x, legs.corner.y, legs.width, legs.height);
            renderingContext.fillRect(legs.corner.x + legs.width + 20, legs.corner.y, legs.width, legs.height);
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
        
        cupcake = function (renderingContext) {
            // Frosting
            renderingContext.fillStyle = cupcakeVertices.frosting.color;
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
            renderingContext.fillStyle = cupcakeVertices.cake.color;
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
        
        fire = function (renderingContext) {
            
        },

        circle = function (renderingContext) {
            renderingContext.strokeStyle = "green";
            renderingContext.beginPath();
            renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
            renderingContext.stroke();
        },

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: minion,
                keyframes: [
                    {
                        frame: 0,
                        tx: 20,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 100,
                        ty: 50,
                        ease: KeyframeTweener.quadEaseInOut
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 80,
                        tx: 80,
                        ty: 500,
                        rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },
            {
                draw: mouthOpen,
                keyframes: [
                    {
                        frame: 0,
                        tx: 20,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 100,
                        ty: 50,
                        ease: KeyframeTweener.quadEaseInOut
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 80,
                        tx: 80,
                        ty: 500,
                        rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },
            {
                draw: cupcake,
                keyframes: [
                    {
                        frame: 0,
                        tx: 20,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 100,
                        ty: 50,
                        ease: KeyframeTweener.quadEaseInOut
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 80,
                        tx: 80,
                        ty: 500,
                        rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },
            {
                draw: circle,
                keyframes: [
                    {
                        frame: 50,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 0,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5
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

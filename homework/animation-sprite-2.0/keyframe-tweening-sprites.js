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

        minionVertices = { start: {x: 200, y: 300},
                           cp1: {x: 50, y: 300},
                           cp2: {x: 50, y: 600},
                           bottom: {x: 200, y: 600},
                           cp3: {x: 350, y: 600},
                           cp4: {x: 350, y: 300},
                           color1: {color: "#FFFF80", stop: 0.1, x: 0, y: 450, r: 200},
                           color2: {color: "#FFFF4D", stop: 0.2, x: 200, y: 450, r: 400}
                         },
        eyes = { ball: {x:200, y: 400},
                 ballRadius: 30,
                 ballColor: "white",
                 pupilRadius:10,
                 pupilColor: "brown",
                 corneaRadius: 5,
                 corneaColor: "black",
                 goggleRadius: 30,
                 goggleColor: "gray" 
        },
        mouth = { left: {x: 180, y: 460},
                  cp1: {x: 200, y: 480},
                  cp2: {x: 220, y: 490},
                  right: {x: 230, y: 460},
                  cp3: {x: 220, y: 440},
                  cp4: {x: 200, y: 440},
                  color: "black"
        },
        legs = { corner: {x: 150, y:580},
                 width: 40,
                 height: 40,
                 color: "blue"
        },
        shoes = { 
                  color: "black"
        },
        cupcakeVertices = { candle: { corner: {x: 77, y:520},
                                      width: 6,
                                      height: 30,
                                      color: "red"
                                     
                                    },
                            frosting: {
                                       start: {x: 40, y:570},
                                       cp1: {x: 50, y: 550},
                                       cp2: {x: 60, y: 545},
                                       cp3: {x: 70, y: 530},
                                       cp4: {x: 80, y: 530},
                                       cp5: {x: 80, y: 530},
                                       cp6: {x: 90, y: 530},
                                       cp7: {x: 100, y: 545},
                                       cp8: {x: 110, y: 550},
                                       end: {x: 120, y: 570},
                                       color: "purple"
                                      },
                            cake: {
                                   topLeft: {x: 40, y: 570},
                                   bottomLeft: {x: 50, y: 620},
                                   bottomRight: {x: 110, y: 620},
                                   topRight: {x: 120, y: 570},
                                   cp1: {x: 70, y: 590},
                                   color: "turquoise"
                                  },
                            fire: {
                                   bottom: {x: 80, y: 520},
                                   left: {x: 70, y:510},
                                   top: {x: 80, y: 480},
                                   right: {x: 90, y: 510}
                                  }
        },

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        background = function (renderingContext) {
            var backgroundGradient = renderingContext.createLinearGradient(0, 0, 0, canvas.height);
            backgroundGradient.addColorStop(0, backgroundColors.top);
            backgroundGradient.addColorStop(backgroundColors.colorStop2, backgroundColors.middle);
            backgroundGradient.addColorStop(backgroundColors.colorStop3, backgroundColors.bottom);
            renderingContext.fillStyle = backgroundGradient;
            renderingContext.beginPath();
            renderingContext.fillRect(0,0, canvas.width, canvas.height);
            renderingContext.fill();
        },
            
        minion = function (renderingContext) {
            // Body
            var bodyGradient = renderingContext.createRadialGradient(minionVertices.color1.x,
                                   minionVertices.color1.y, minionVertices.color1.r,
                                   minionVertices.color2.x, minionVertices.color2.y, minionVertices.color2.r);
            bodyGradient.addColorStop(minionVertices.color1.stop, minionVertices.color1.color);
            console.log(minionVertices.color1.color);
            bodyGradient.addColorStop(minionVertices.color2.stop, minionVertices.color2.color);
            console.log(minionVertices.color2.color);
            renderingContext.fillStyle = bodyGradient;
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
            renderingContext.fillStyle = "orange";
            renderingContext.beginPath();
            renderingContext.moveTo(cupcakeVertices.fire.bottom.x, cupcakeVertices.fire.bottom.y);
            renderingContext.quadraticCurveTo(cupcakeVertices.fire.left.x, cupcakeVertices.fire.left.y,
                cupcakeVertices.fire.top.x, cupcakeVertices.fire.top.y);
            renderingContext.quadraticCurveTo(cupcakeVertices.fire.right.x, cupcakeVertices.fire.right.y,
                cupcakeVertices.fire.bottom.x, cupcakeVertices.fire.bottom.y);
            renderingContext.fill();
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
                        tx: 1000,
                        ty: 0,
                        ease: KeyframeTweener.quadEaseInOut
                    },

                    {
                        frame: 100,
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
                        tx: 1000,
                        ty: 0,
                        ease: KeyframeTweener.quadEaseInOut
                    },

                    {
                        frame: 100,
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
                draw: fire,
                keyframes: [
                    {
                        frame: 0,
                        tx: 0,
                        ty: 0
                    },
                    
                    {
                        frame: 500,
                        tx: 0,
                        ty: 0
                    },
                    {
                        frame: 700,
                        tx: 20,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 1110,
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
                        tx: 0,
                        ty: 0
                    },
                    
                    {
                        frame: 500,
                        tx: 0,
                        ty: 0
                    },
                    {
                        frame: 700,
                        tx: 20,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 1110,
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

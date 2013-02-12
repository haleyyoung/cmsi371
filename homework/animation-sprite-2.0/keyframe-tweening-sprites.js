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
        goggles = { left: {x: 98, y: 385},
                    cp1: {x: 200, y: 425},
                    right: {x: 302, y: 385},
                    color: "black"
        },
        mouth = { left: {x: 180, y: 460},
                  cp1: {x: 200, y: 480},
                  cp2: {x: 220, y: 490},
                  right: {x: 230, y: 460},
                  cp3: {x: 220, y: 440},
                  cp4: {x: 200, y: 440},
                  blowRadius: 10,
                  smile: { start: {x: 180, y: 460},
                           cp1: {x: 200, y: 480},
                           end: {x: 220, y: 460},
                           color: "gray"
                  },
                  color: "black"
        },
        arms = { left: {x: 115, y: 525},
                 cp1: {x: 130, y: 545},
                 cp2: {x: 200, y: 535},
                 right: {x: 290, y: 525},
                 cp3: {x: 270, y: 545},
                 cp4: {x: 265, y: 535},
                 color: "#FFFF22",
                 hand: { left: {x: 200, y: 535},
                         right: {x: 265, y: 535}
                       }
        
        },
        overalls = { left: {x: 95, y: 500},
                     cp1: {x: 150, y: 515},
                     bottomLeft: {x: 165, y: 560},
                     right: {x: 305, y: 500},
                     cp2: {x: 250, y: 515},
                     bottomRight: {x: 235, y: 560},
                     side: { left: {x: 130, y: 560},
                             cp1: {x: 210, y: 420},
                             right: {x: 270, y: 560}
                     },
                     color: "blue"
        },
        legs = { corner: {x: 150, y:580},
                 width: 40,
                 height: 31,
                 color: "blue"
        },
        shoes = {
                  bottom: { start: {x: 149, y: 620},
                            cp1: {x: 170, y: 650},
                            end: {x: 191, y: 620}
                          },
                  boot: { corner: {x: 150, y: 610},
                          width: 40,
                          height: 11
                        },
                  color: "black"
        },
        
        minionLeftVertices = { body: { start: {x: 200, y: 300},
                                      cp1: {x: 50, y: 300},
                                      cp2: {x: 50, y: 600},
                                      bottom: {x: 200, y: 600},
                                      cp3: {x: 350, y: 600},
                                      cp4: {x: 350, y: 300},
                                      color1: {color: "#FFFF80", stop: 0.1, x: 0, y: 450, r: 200},
                                      color2: {color: "#FFFF4D", stop: 0.2, x: 200, y: 450, r: 400}
                                    },
                              eyes: { start: {x: 95, y: 360},
                                      end: {x: 85, y: 430},
                                      width: 20,
                                      color: "gray"
                                    },
                              mouth: { start: {x: 86, y: 460},
                                       cp1: {x: 90, y: 470},
                                       end: {x: 100, y: 465},
                                       width: 4,
                                       color: "gray"
                                     },
                              legDown: { corner: {x: 170, y:580},
                                      width: 60,
                                      height: 36,
                                      color: "blue"
                                    },
                              shoeDown: { corner: {x: 170, y: 615},
                                          width: 60,
                                          height: 16,
                                          color: "black"
                                     },
                              legUp: { start: {x: 170, y:580},
                                       bottomLeft: {x: 150, y:610},
                                       bottomRight: {x: 190, y:630},
                                       topRight: {x: 210, y:580},
                                       color: "blue",
                                       separationColor: "black"
                                    },
                              shoeUp: {
                                       bottom: { start: {x: 151, y: 610},
                                                 cp1: {x: 120, y: 590},
                                                 cp2: {x: 100, y: 610},
                                                 end: {x: 149, y: 628}
                                               },
                                       boot: { start: {x: 150, y: 610},
                                               bottomLeft: {x: 148, y: 628},
                                               bottomRight: {x: 184, y: 640},
                                               topRight: {x: 195, y: 620}
                                             },
                                       color: "black"
                                     },
                              arms: {
                                      left: { shoulder: {x: 0, y: 0},
                                               cp1: {x: 30, y: 80},
                                               end: {x: 10, y: 110},
                                               width: 20,
                                               hand: { radius: 20,
                                                       center: {x: 5, y: 120},
                                                       color: "black"
                                                      
                                              }
                                      
                                      }
                              }
        
        },

        minionRightVertices = { legDown: { corner: {x: 170, y: 580},
                                           width: 60,
                                           height: 36,
                                           color: "blue"
                                         },
                                shoeDown: { start: {x: 175, y: 615},
                                            cp1: {x: 140, y: 605},
                                            cp2: {x: 120, y: 625},
                                            end: {x: 174, y: 631},
                                            corner: {x: 170, y: 615},
                                            width: 60,
                                            height: 16,
                                            color: "black"
                                          },
                                legUp: { start: {x: 170, y:580},
                                         bottomLeft: {x: 150, y:595},
                                         bottomRight: {x: 190, y:615},
                                         topRight: {x: 210, y:580},
                                         color: "blue"
                                       },
                                shoeUp: {
                                          bottom: { start: {x: 151, y: 595},
                                                    cp1: {x: 120, y: 570},
                                                    cp2: {x: 100, y: 595},
                                                    end: {x: 149, y: 613}
                                                  },
                                          boot: { start: {x: 150, y: 595},
                                                  bottomLeft: {x: 148, y: 613},
                                                  bottomRight: {x: 164, y: 630},
                                                  topRight: {x: 170, y: 605}
                                                },
                                          color: "black"
                                         }
        
        },
        
        cupcakeVertices = { candle: { corner: {x: 77, y:520},
                                      width: 6,
                                      height: 30,
                                      color: "#FF0066"
                                     
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
                                   colorLight: "turquoise",
                                   colorDark: "#207068"
                                  },
                            fire: {
                                   bottom: {x: 80, y: 520},
                                   left: {x: 70, y:510},
                                   top: {x: 80, y: 480},
                                   right: {x: 90, y: 510},
                                   colorYellow: "yellow",
                                   colorOrange: "orange",
                                   colorStop: 0.4
                                  }
        },

        // First, a selection of "drawing functions" from which we
        // can choose.
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
            bodyGradient.addColorStop(minionVertices.color2.stop, minionVertices.color2.color);
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
            // Goggles Strap
            renderingContext.strokeStyle = goggles.color;
            renderingContext.lineWidth = 14;
            renderingContext.beginPath();
            renderingContext.moveTo(goggles.left.x, goggles.left.y);
            renderingContext.quadraticCurveTo(goggles.cp1.x, goggles.cp1.y, goggles.right.x, goggles.right.y);
            renderingContext.stroke();
            // Overalls
            var overallGradient = renderingContext.createRadialGradient(minionVertices.start.x, minionVertices.start.y,
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
            renderingContext.quadraticCurveTo(overalls.cp1.x, overalls.cp1.y, overalls.bottomLeft.x, overalls.bottomLeft.y);
            renderingContext.stroke();
            
            renderingContext.beginPath();
            renderingContext.moveTo(overalls.right.x, overalls.right.y);
            renderingContext.quadraticCurveTo(overalls.cp2.x, overalls.cp2.y, overalls.bottomRight.x, overalls.bottomRight.y);
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
              minionLeftVertices.arms.left.hand.radius, 0, Math.PI*2);
            renderingContext.fill();
            renderingContext.beginPath();
            renderingContext.arc(arms.hand.right.x, arms.hand.right.y,
              minionLeftVertices.arms.left.hand.radius, 0, Math.PI*2);
            renderingContext.fill();
            
            // Legs
            renderingContext.fillStyle = legs.color;
            renderingContext.fillRect(legs.corner.x, legs.corner.y, legs.width, legs.height);
            renderingContext.fillRect(legs.corner.x + legs.width + 20, legs.corner.y, legs.width, legs.height);
            // Shoes
            renderingContext.fillStyle = shoes.color;
            for(var i = 0; i <= 60; i += 60){
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
        
        eyeOpen = function (renderingContext) {
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
        },
        
        eyeBlinking = function (renderingContext) {
            renderingContext.fillStyle = minionVertices.color1.color;
            renderingContext.beginPath();
            renderingContext.arc(eyes.ball.x, eyes.ball.y, eyes.ballRadius, 0, Math.PI*2);
            renderingContext.fill();
            renderingContext.strokeStyle = eyes.goggleColor;
            renderingContext.lineWidth = 10;
            renderingContext.beginPath();
            renderingContext.arc(eyes.ball.x, eyes.ball.y, eyes.goggleRadius, 0, Math.PI*2);
            renderingContext.stroke();
        },
        
        minionSide = function (renderingContext) {
            // Body
            var bodyGradient = renderingContext.createRadialGradient(minionVertices.color1.x,
                                   minionVertices.color1.y, minionVertices.color1.r,
                                   minionVertices.color2.x, minionVertices.color2.y, minionVertices.color2.r);
            bodyGradient.addColorStop(minionVertices.color1.stop, minionVertices.color1.color);
            bodyGradient.addColorStop(minionVertices.color2.stop, minionVertices.color2.color);
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
            // Goggles Strap
            renderingContext.strokeStyle = goggles.color;
            renderingContext.lineWidth = 14;
            renderingContext.beginPath();
            renderingContext.moveTo(goggles.left.x, goggles.left.y + 10);
            renderingContext.quadraticCurveTo(goggles.cp1.x, goggles.cp1.y + 10, goggles.right.x, goggles.right.y + 10);
            renderingContext.stroke();
            // Eye 
            renderingContext.strokeStyle = minionLeftVertices.eyes.color;
            renderingContext.lineWidth = minionLeftVertices.eyes.width;
            renderingContext.beginPath();
            renderingContext.moveTo(minionLeftVertices.eyes.start.x, minionLeftVertices.eyes.start.y);
            renderingContext.lineTo(minionLeftVertices.eyes.end.x, minionLeftVertices.eyes.end.y);
            renderingContext.stroke();
            // Mouth
            renderingContext.strokeStyle = minionLeftVertices.mouth.color;
            renderingContext.lineWidth = minionLeftVertices.mouth.width;
            renderingContext.beginPath();
            renderingContext.moveTo(minionLeftVertices.mouth.start.x, minionLeftVertices.mouth.start.y);
            renderingContext.quadraticCurveTo(minionLeftVertices.mouth.cp1.x, minionLeftVertices.mouth.cp1.y,
                                              minionLeftVertices.mouth.end.x, minionLeftVertices.mouth.end.y);
            renderingContext.stroke();
            
            // Overalls
            var overallGradient = renderingContext.createRadialGradient(minionVertices.start.x, minionVertices.start.y,
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
            renderingContext.moveTo(overalls.side.left.x, overalls.side.left.y);
            renderingContext.quadraticCurveTo(overalls.side.cp1.x, overalls.side.cp1.y,
              overalls.side.right.x, overalls.side.right.y);
            renderingContext.stroke();
        },
        
        minionSideUp = function (renderingContext) {
            // Body
            var bodyGradient = renderingContext.createRadialGradient(minionVertices.color1.x,
                                   minionVertices.color1.y - 10, minionVertices.color1.r,
                                   minionVertices.color2.x, minionVertices.color2.y - 10, minionVertices.color2.r);
            bodyGradient.addColorStop(minionVertices.color1.stop, minionVertices.color1.color);
            bodyGradient.addColorStop(minionVertices.color2.stop, minionVertices.color2.color);
            renderingContext.fillStyle = bodyGradient;
            renderingContext.beginPath();
            renderingContext.moveTo(minionVertices.start.x, minionVertices.start.y - 10);
            renderingContext.bezierCurveTo(minionVertices.cp1.x, minionVertices.cp1.y - 10,
                minionVertices.cp2.x, minionVertices.cp2.y - 10, minionVertices.bottom.x,
                minionVertices.bottom.y);
            renderingContext.bezierCurveTo(minionVertices.cp3.x, minionVertices.cp3.y - 10,
                minionVertices.cp4.x, minionVertices.cp4.y - 10, minionVertices.start.x,
                minionVertices.start.y - 10);
            renderingContext.fill();
            // Goggles Strap
            renderingContext.strokeStyle = goggles.color;
            renderingContext.lineWidth = 14;
            renderingContext.beginPath();
            renderingContext.moveTo(goggles.left.x, goggles.left.y);
            renderingContext.quadraticCurveTo(goggles.cp1.x, goggles.cp1.y, goggles.right.x, goggles.right.y);
            renderingContext.stroke();
            // Eye 
            renderingContext.strokeStyle = minionLeftVertices.eyes.color;
            renderingContext.lineWidth = minionLeftVertices.eyes.width;
            renderingContext.beginPath();
            renderingContext.moveTo(minionLeftVertices.eyes.start.x, minionLeftVertices.eyes.start.y - 10);
            renderingContext.lineTo(minionLeftVertices.eyes.end.x, minionLeftVertices.eyes.end.y - 10);
            renderingContext.stroke();
            // Mouth
            renderingContext.strokeStyle = minionLeftVertices.mouth.color;
            renderingContext.lineWidth = minionLeftVertices.mouth.width;
            renderingContext.beginPath();
            renderingContext.moveTo(minionLeftVertices.mouth.start.x, minionLeftVertices.mouth.start.y - 10);
            renderingContext.quadraticCurveTo(minionLeftVertices.mouth.cp1.x, minionLeftVertices.mouth.cp1.y - 10,
                                              minionLeftVertices.mouth.end.x, minionLeftVertices.mouth.end.y - 10);
            renderingContext.stroke();
            // Overalls
            var overallGradient = renderingContext.createRadialGradient(minionVertices.start.x, minionVertices.start.y - 10,
              40, minionVertices.start.x, minionVertices.start.y - 10, 470);
            overallGradient.addColorStop(0, "transparent");
            overallGradient.addColorStop(0.5, "transparent");
            overallGradient.addColorStop(0.51, overalls.color);
            renderingContext.fillStyle = overallGradient;
            renderingContext.beginPath();
            renderingContext.moveTo(minionVertices.start.x, minionVertices.start.y - 10);
            renderingContext.bezierCurveTo(minionVertices.cp1.x, minionVertices.cp1.y - 10,
                minionVertices.cp2.x, minionVertices.cp2.y - 10, minionVertices.bottom.x,
                minionVertices.bottom.y);
            renderingContext.bezierCurveTo(minionVertices.cp3.x, minionVertices.cp3.y - 10,
                minionVertices.cp4.x, minionVertices.cp4.y - 10, minionVertices.start.x,
                minionVertices.start.y - 10);
            renderingContext.fill();
            // Overalls shoulders
            renderingContext.strokeStyle = overalls.color;
            renderingContext.lineWidth = 10;
            renderingContext.beginPath();
            renderingContext.moveTo(overalls.side.left.x, overalls.side.left.y - 10);
            renderingContext.quadraticCurveTo(overalls.side.cp1.x, overalls.side.cp1.y - 10,
              overalls.side.right.x, overalls.side.right.y - 10);
            renderingContext.stroke();
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
            renderingContext.moveTo(minionLeftVertices.shoeUp.bottom.start.x, minionLeftVertices.shoeUp.bottom.start.y);
            renderingContext.bezierCurveTo(minionLeftVertices.shoeUp.bottom.cp1.x, minionLeftVertices.shoeUp.bottom.cp1.y,
                                              minionLeftVertices.shoeUp.bottom.cp2.x, minionLeftVertices.shoeUp.bottom.cp2.y,
                                              minionLeftVertices.shoeUp.bottom.end.x, minionLeftVertices.shoeUp.bottom.end.y);
            renderingContext.closePath();
            renderingContext.fill();
            renderingContext.moveTo(minionLeftVertices.shoeUp.boot.start.x, minionLeftVertices.shoeUp.boot.start.y);
            renderingContext.lineTo(minionLeftVertices.shoeUp.boot.bottomLeft.x, minionLeftVertices.shoeUp.boot.bottomLeft.y);
            renderingContext.lineTo(minionLeftVertices.shoeUp.boot.bottomRight.x, minionLeftVertices.shoeUp.boot.bottomRight.y);
            renderingContext.lineTo(minionLeftVertices.shoeUp.boot.topRight.x, minionLeftVertices.shoeUp.boot.topRight.y);
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
            renderingContext.moveTo(minionRightVertices.shoeUp.bottom.start.x, minionRightVertices.shoeUp.bottom.start.y);
            renderingContext.bezierCurveTo(minionRightVertices.shoeUp.bottom.cp1.x, minionRightVertices.shoeUp.bottom.cp1.y,
                                              minionRightVertices.shoeUp.bottom.cp2.x, minionRightVertices.shoeUp.bottom.cp2.y,
                                              minionRightVertices.shoeUp.bottom.end.x, minionRightVertices.shoeUp.bottom.end.y);
            renderingContext.closePath();
            renderingContext.fill();
            renderingContext.moveTo(minionRightVertices.shoeUp.boot.start.x, minionRightVertices.shoeUp.boot.start.y);
            renderingContext.lineTo(minionRightVertices.shoeUp.boot.bottomLeft.x, minionRightVertices.shoeUp.boot.bottomLeft.y);
            renderingContext.lineTo(minionRightVertices.shoeUp.boot.bottomRight.x, minionRightVertices.shoeUp.boot.bottomRight.y);
            renderingContext.lineTo(minionRightVertices.shoeUp.boot.topRight.x, minionRightVertices.shoeUp.boot.topRight.y);
            renderingContext.lineTo(minionRightVertices.shoeUp.boot.start.x, minionRightVertices.shoeUp.boot.start.y);
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
            renderingContext.arc(minionLeftVertices.arms.left.hand.center.x, minionLeftVertices.arms.left.hand.center.y,
              minionLeftVertices.arms.left.hand.radius, 0, Math.PI*2);
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
            renderingContext.arc(mouth.cp2.x, mouth.right.y, mouth.blowRadius, 0, Math.PI*2);
            renderingContext.fill();
        },
        
        mouthSmiling = function (renderingContext) {
            renderingContext.strokeStyle = mouth.smile.color;
            renderingContext.lineWidth = minionLeftVertices.mouth.width;
            renderingContext.beginPath();
            renderingContext.moveTo(mouth.smile.start.x, mouth.smile.start.y);
            renderingContext.quadraticCurveTo(mouth.smile.cp1.x, mouth.smile.cp1.y,
              mouth.smile.end.x, mouth.smile.end.y);
            renderingContext.stroke();
        },
        
        mouthMad = function (renderingContext) {
            renderingContext.strokeStyle = mouth.smile.color;
            renderingContext.lineWidth = minionLeftVertices.mouth.width;
            renderingContext.beginPath();
            renderingContext.moveTo(mouth.smile.start.x, mouth.smile.start.y);
            renderingContext.lineTo(mouth.smile.end.x, mouth.smile.end.y);
            renderingContext.stroke();
        },
              
        cupcake = function (renderingContext) {
            // Frosting
            var frostingGradient = renderingContext.createRadialGradient(cupcakeVertices.frosting.cp4.x,
              cupcakeVertices.frosting.cp4.y, 2, cupcakeVertices.frosting.cp4.x, cupcakeVertices.frosting.cp4.y, 50);
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
            var cakeGradient = renderingContext.createLinearGradient(cupcakeVertices.cake.topLeft.x,
              cupcakeVertices.cake.topLeft.y, cupcakeVertices.cake.topRight.x,
              cupcakeVertices.cake.topRight.y);
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
        
        fire = function (renderingContext) {
            var linearGradientFire = renderingContext.createLinearGradient(cupcakeVertices.fire.left.x,
              cupcakeVertices.fire.bottom.y, cupcakeVertices.fire.right.x, cupcakeVertices.fire.top.y);
            linearGradientFire.addColorStop(0, cupcakeVertices.fire.colorOrange);
            linearGradientFire.addColorStop(1, cupcakeVertices.fire.colorYellow);
            renderingContext.fillStyle = linearGradientFire;
            renderingContext.beginPath();
            renderingContext.moveTo(cupcakeVertices.fire.bottom.x, cupcakeVertices.fire.bottom.y);
            renderingContext.quadraticCurveTo(cupcakeVertices.fire.left.x, cupcakeVertices.fire.left.y,
                cupcakeVertices.fire.top.x, cupcakeVertices.fire.top.y);
            renderingContext.quadraticCurveTo(cupcakeVertices.fire.right.x, cupcakeVertices.fire.right.y,
                cupcakeVertices.fire.bottom.x, cupcakeVertices.fire.bottom.y);
            renderingContext.fill();
        },
        
        fireBlowing = function (renderingContext) {
            var linearGradientFire = renderingContext.createLinearGradient(cupcakeVertices.fire.left.x,
              cupcakeVertices.fire.bottom.y, cupcakeVertices.fire.right.x, cupcakeVertices.fire.top.y);
            linearGradientFire.addColorStop(0, cupcakeVertices.fire.colorOrange);
            linearGradientFire.addColorStop(1, cupcakeVertices.fire.colorYellow);
            renderingContext.fillStyle = linearGradientFire;
            renderingContext.beginPath();
            renderingContext.moveTo(cupcakeVertices.fire.bottom.x, cupcakeVertices.fire.bottom.y);
            renderingContext.quadraticCurveTo(cupcakeVertices.fire.left.x, cupcakeVertices.fire.left.y,
                cupcakeVertices.fire.top.x + 20, cupcakeVertices.fire.top.y - 5);
            renderingContext.quadraticCurveTo(cupcakeVertices.fire.right.x + 20, cupcakeVertices.fire.right.y,
                cupcakeVertices.fire.bottom.x, cupcakeVertices.fire.bottom.y);
            renderingContext.fill();
        },

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: [minionSide, minionSideUp],
                keyframes: [
                    {
                        frame: 0,
                        tx: 1000,
                        ty: 0,
                        ease: KeyframeTweener.runToAbruptStop
                    },

                    {
                        frame: 100,
                        tx: 100,
                        ty: 50
                    }
                ],
                frameRate: 5
            },
            
            {
                draw: [minionSide],
                keyframes: [
                    {
                        frame: 100,
                        tx: 100,
                        ty: 50
                    },

                    {
                        frame: 180,
                        tx: 100,
                        ty: 50
                    }
                ]
            },
            {
                draw: [minionLeft, minionRight],
                keyframes: [
                    {
                        frame: 0,
                        tx: 1000,
                        ty: 0,
                        ease: KeyframeTweener.runToAbruptStop
                    },

                    {
                        frame: 100,
                        tx: 100,
                        ty: 50
                    }
                ],
                frameRate: 5
            },
            {
                draw: [minionLeft],
                keyframes: [
                    {
                        frame: 100,
                        tx: 100,
                        ty: 50,
                        ease: KeyframeTweener.runToAbruptStop
                    },

                    {
                        frame: 180,
                        tx: 100,
                        ty: 50
                    }
                ]
            },
            
            {
                draw: [minionSideArms],
                keyframes: [
                    {
                        frame: 0,
                        tx: 1200,
                        ty: 510,
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
                        rotate: 90
                    },
                    
                ]
            },

            {
                draw: [minion],
                keyframes: [
                    {
                        frame: 180,
                        tx: 100,
                        ty: 50,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame: 600,
                        tx: 100,
                        ty: 50
                    }
                ]
            },
            
            {
                draw: [eyeOpen],
                keyframes: [
                    {
                        frame: 180,
                        tx: 100,
                        ty: 50,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },
                    
                    {
                        frame: 340,
                        tx: 100,
                        ty: 50
                    }
                ]
            },
            
            {
                draw: [mouthOpen],
                keyframes: [
                    {
                        frame: 180,
                        tx: 100,
                        ty: 50,
                        ease: KeyframeTweener.quadEaseInOut
                    },

                    {
                        frame: 200,
                        tx: 100,
                        ty: 50
                    }
                ]
            },
            {
                draw: [mouthBlowing],
                keyframes: [
                    {
                        frame: 200,
                        tx: 110,
                        ty: 55,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame:240,
                        tx: 220,
                        ty: 280,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.quadEaseInAndOut
                    }
                ]
            },
            
            {
                draw: [mouthSmiling],
                keyframes: [
                    {
                        frame: 240,
                        tx: 100,
                        ty: 50
                    },
                    
                    {
                        frame: 315,
                        tx: 100,
                        ty: 50
                    }
                ]
            },
            
            {
                draw: [mouthMad],
                keyframes: [
                    {
                        frame: 315,
                        tx: 100,
                        ty: 50
                    },
                    
                    {
                        frame: 450,
                        tx: 100,
                        ty: 50
                    }
                ]
            },
            
            {
                draw: [eyeOpen, eyeBlinking],
                keyframes: [
                    {
                        frame: 340,
                        tx: 100,
                        ty: 50
                    },
                    
                    {
                        frame: 356,
                        tx: 100,
                        ty: 50
                    }
                ],
                frameRate: 4
            },
            
            {
                draw: [eyeOpen],
                keyframes: [
                    {
                        frame: 356,
                        tx: 100,
                        ty: 50,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },
                    
                    {
                        frame: 600,
                        tx: 100,
                        ty: 50
                    }
                ]
            },
            
            {
                draw: [fire],
                keyframes: [
                    {
                        frame: 0,
                        tx: 0,
                        ty: 0
                    },
                    
                    {
                        frame: 180,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },
                    {
                        frame: 181,
                        tx: 250,
                        ty: 0
                    },
                    {
                        frame: 210,
                        tx: 250,
                        ty: 0
                    }
                ]
            },
            
            // The candle magically relights
            {
                draw: [fire],
                keyframes: [
                    {
                        frame: 280,
                        tx: 250,
                        ty: 50,
                        ease: KeyframeTweener.fireFlickering
                    },
                    
                    {
                        frame: 300,
                        tx: 250,
                        ty: 0
                    },
                    
                    {
                        frame: 600,
                        tx: 250,
                        ty: 0
                    }
                ]
            },
            {
                draw: [fireBlowing],
                keyframes: [
                    {
                        frame: 210,
                        tx: 250,
                        ty: 0,
                        ease: KeyframeTweener.quadEaseIn
                    },
                    
                    {
                        frame: 220,
                        tx: 250,
                        ty: 0
                    }
                ]
            },
            {
                draw: [cupcake],
                keyframes: [
                    {
                        frame: 0,
                        tx: 0,
                        ty: 0,
                        
                    },
                    
                    {
                        frame: 180,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },
                    {
                        frame: 181,
                        tx: 250,
                        ty: 0,
                        ease: KeyframeTweener.quadEeaseInOut
                    },
                    {
                        frame: 1100,
                        tx: 250,
                        ty: 0
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

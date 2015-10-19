'use strict';

crop.factory('cropCanvas', [function() {
  // Shape = Array of [x,y]; [0, 0] - center
  var shapeArrowNW = [
    [-0.5, -2],
    [-3, -4.5],
    [-0.5, -7],
    [-7, -7],
    [-7, -0.5],
    [-4.5, -3],
    [-2, -0.5]
  ];
  var shapeArrowNE = [
    [0.5, -2],
    [3, -4.5],
    [0.5, -7],
    [7, -7],
    [7, -0.5],
    [4.5, -3],
    [2, -0.5]
  ];
  var shapeArrowSW = [
    [-0.5, 2],
    [-3, 4.5],
    [-0.5, 7],
    [-7, 7],
    [-7, 0.5],
    [-4.5, 3],
    [-2, 0.5]
  ];
  var shapeArrowSE = [
    [0.5, 2],
    [3, 4.5],
    [0.5, 7],
    [7, 7],
    [7, 0.5],
    [4.5, 3],
    [2, 0.5]
  ];
  var shapeArrowN = [
    [-1.5, -2.5],
    [-1.5, -6],
    [-5, -6],
    [0, -11],
    [5, -6],
    [1.5, -6],
    [1.5, -2.5]
  ];
  var shapeArrowW = [
    [-2.5, -1.5],
    [-6, -1.5],
    [-6, -5],
    [-11, 0],
    [-6, 5],
    [-6, 1.5],
    [-2.5, 1.5]
  ];
  var shapeArrowS = [
    [-1.5, 2.5],
    [-1.5, 6],
    [-5, 6],
    [0, 11],
    [5, 6],
    [1.5, 6],
    [1.5, 2.5]
  ];
  var shapeArrowE = [
    [2.5, -1.5],
    [6, -1.5],
    [6, -5],
    [11, 0],
    [6, 5],
    [6, 1.5],
    [2.5, 1.5]
  ];

  var icons = {
    _reset: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzQ5REQ4M0I3NjI4MTFFNTkxRDg5NDA3MERFREZFNkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzQ5REQ4M0E3NjI4MTFFNTkxRDg5NDA3MERFREZFNkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDpEQTYxMjM2MjI3NzZFNTExOUI2M0MzOUExN0I3NzgzNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQTYxMjM2MjI3NzZFNTExOUI2M0MzOUExN0I3NzgzNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Puj+pLkAAAKzSURBVHja7Ji/axRBFMdvk0uMngYhiVGsokgQDeSXGg3aiYU2IVgEIiha+AdoZWEpCYiFglXAX4idFiIWCqJCPA0IgimECPEXaBKLi/FijKyfgbewLLNzu3MbssU++BQ3czvzHebNvPfGcV03l2aryaXcMoGZwNW2vKHPkQX8C+mvhbXQBPtgO9RL3xJMQRHm5PeSlUJ1zYTQD0OwMdBeB1thGCbcylaE89AOawzzaTF1zskEd6BF2prhDHxy49tPOAutSQn0213ogJtu9XYfesCJItAxRJJl8TPPZqFZ8z/lozPwAxalrQE2QUtgDM8+whC8ruSCcQTq+j/IJC/glSwiJwvpg0PQCbs0B3IcTshhsjoky4ZtmofbcCDCNnXBGPzWjHMDCrY+aBL4GfbGcPYaGIEFzVgDKyFwER5BdwyRtTAK5cBY45Cv9hSH2UvojSGyIIKCtj/sG1Oom5WDEIY6vf0wECMuLMAt+BVoP2oT6s7BHkO/OuEleBozeN2DC7De19Zrc80oa6wQq8uWMfYd7JYxlM2HzZWvMFBphZIUdXfu9M2/IW3pVuRCaLUE9gWi1EyaBLZKDun42ibSJHBY43Nv0yJQJRGnAleMsodJCRyES1CwEKd87iK0B9qfwxubbCaISv+nJZZel+w66rfr4HJIsnDQNlnwqJc0f9o36B94AMcjfH9YMvKyRtwVyXSsMmrPVOV2FU5r7rIvsj1FcXQvxiof64Ie6IY2TfL7BE7CV9uM2u+nHTACR0Iu3ZIkF3+lrU4ORGPgOvHsscT699WUnX7UQrbBtQSKJlV47UiiqtOhauRBmLQQNinfNsWZ07F4H1S+tFleE1TRc8yQdKgtfwZjUlh9N7xUWPugyTcbhDbx0y3S901Kyynxz3JcYUkIzF63MoGZwDTYfwEGACYXMRyTxxVAAAAAAElFTkSuQmCC",
    _rotateLeft: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3woTBxIX2cgHGwAAAhNJREFUWMPtlz1rFEEYgJ+Jl5gvNebIaUAQFBGCxCgWWogEiZ2lYGFr5Q+wsrCxEmwUCwtRwUIQ/EAbISCKCAqCYEQICYpwBx4xJJGAH/dYuCfH5qLncbd34D7NLjvLzLPvzLzvLKSkpKSkpCSO2pnUWB11yO0BJtT+dozcWvWaOqmeUwfbSW63elNd8hd59WxbSKpb1Puu5EPLJdXN6mV10eq0TlIdUx/5d8qS2STlutTr1k5BvaD2JCV4wn9nRh1vpEdmFbkAfANuA2PAe+A7cCT26lfgAbAMjADvgIWkItih7lUPqwPqUXU+FrFJtVsdVSfUnJpp1W7Oqa/jgqtEvyWl7lM01ZWMRqXvNyEEWyIYDfwi9rgfON5O5e5ALGGX1Cl1V7sI9qg3Yuvwh3pLHWoHwaAeVGdjkl/UK+pwjf1kminZq55Rl2OS8+pjdVzdX/FBmVhd3xelrr4qfa9ZsfbrlNwEXAUOAb2x5rfANHAv2kRPgA3ATmAHkAOGgGfApRBCsVmR3K7eUReqlLzymXFafakWowNFvqLto3pe3djM6d4WbZAp62NWPdnQf5JYbpwBTgMXgYdArUm6FF1fAfk/jtGgSGaBPuAUMAgcAwrAMLAeKAKLQCewBDwFngN3gbkQQqmpguXDRQihpI4AW4HuaBMVgM9AFpiLovYmhLDU6py5Tu2K7gcSPW2npPxP/AQYE9s1MvpOBAAAAABJRU5ErkJggg==",
    _rotateRight: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3woTBxModrUbZwAAAg5JREFUWMPtl71rFEEYh585Y/Q0gXwZIgiK2ogSjVhEMYVIKlFbCxsLK/8GCxsrwUosrKJgoY0gElAQrlVBsTgQxRARzq+IxkSF4D0WTrGsJ7nL5e5W2KcaZmd3f7zzvr93BnJycnJycv4L1LUrea/QJnE9wKQ6lsXIDagX1YfqlLoua+IuqBX/sKDeVPdmSdwb/+auuiWr4lS/qVfVkU6IG1xGXJIH6r52iiuql9V31s91tbtdAo+or22c0//6Ztcqa5wHHgFfgTJQBI4B6Qjdj//eCjwDltQQQrDVEexSh9VJdVRdH/0vyRf1uNqnHlX3q4V2bXGoMZcW+Fwd7kirS29RbG2jqWWzwMes9OJTQE9q7nHLc63O7d6jltVqyqAPZkHcJvWW+iuVfzfUYssqtM51m9Vr6mJK3Iw6UauQGhWypsbcxmgJB5L9M9pKiOPxaNSlaCVJfqjn1Q0NF14dgoeAc8ChWH0fgJfAi2jIE8ACcALYCexKfeI7UALOhBDer/a29quX1LeJ81wlHgQ+qU/UV4lnaebVO+qOVuXd2Zg7K6EcC2V7MxqWS/wK8BTYBlTr9E2BaeAeMB1CmGnK/JeJYAEYAE4C48DhaLxLQC8wFA8IFWAEuA18Bq4AiyGEuaa7U4M3s93AWBQ9B/RHYSXgJzAbQiirhRBCtZNGPKj2xXG32pvf/HNyOsRvAS3brWG4sIQAAAAASUVORK5CYII="
  };

  icons.reset = new Image();
  icons.reset.src = icons._reset;
  icons.rotateRight = new Image();
  icons.rotateRight.src = icons._rotateRight;
  icons.rotateLeft = new Image();
  icons.rotateLeft.src = icons._rotateLeft;

  // Colors
  var colors = {
    areaOutline: '#fff',
    resizeBoxStroke: '#fff',
    resizeBoxFill: '#444',
    resizeBoxArrowFill: '#fff',
    resizeCircleStroke: '#fff',
    resizeCircleFill: '#444',
    moveIconFill: '#fff'
  };

  return function(ctx, theArea) {

    /* Base functions */

    // Calculate Point
    var calcPoint = function(point, offset, scale) {
      return [scale * point[0] + offset[0], scale * point[1] + offset[1]];
    };

    // Draw Filled Polygon
    var drawFilledPolygon = function(shape, fillStyle, centerCoords, scale) {
      ctx.save();
      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      var pc, pc0 = calcPoint(shape[0], centerCoords, scale);
      ctx.moveTo(pc0[0], pc0[1]);

      for (var p in shape) {
        if (p > 0) {
          pc = calcPoint(shape[p], centerCoords, scale);
          ctx.lineTo(pc[0], pc[1]);
        }
      }

      ctx.lineTo(pc0[0], pc0[1]);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };


    /* Icons */

    this.drawIconMove = function(centerCoords, scale) {
      drawFilledPolygon(shapeArrowN, colors.moveIconFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowW, colors.moveIconFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowS, colors.moveIconFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowE, colors.moveIconFill, centerCoords, scale);
    };

    this.drawIconResizeCircle = function(centerCoords, circleRadius, scale) {
      var scaledCircleRadius = circleRadius * scale;
      ctx.save();
      ctx.strokeStyle = colors.resizeCircleStroke;
      ctx.lineWidth = 2;
      ctx.fillStyle = colors.resizeCircleFill;
      ctx.beginPath();
      ctx.arc(centerCoords[0], centerCoords[1], scaledCircleRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };

    this.drawIconResizeBoxBase = function(centerCoords, boxSize, scale) {
      var scaledBoxSize = boxSize * scale;
      ctx.save();
      ctx.strokeStyle = colors.resizeBoxStroke;
      ctx.lineWidth = 2;
      ctx.fillStyle = colors.resizeBoxFill;
      ctx.fillRect(centerCoords[0] - scaledBoxSize / 2, centerCoords[1] - scaledBoxSize / 2, scaledBoxSize, scaledBoxSize);
      ctx.strokeRect(centerCoords[0] - scaledBoxSize / 2, centerCoords[1] - scaledBoxSize / 2, scaledBoxSize, scaledBoxSize);
      ctx.restore();
    };

    this.drawIconBoxBase = function(centerCoords, boxSize, scale, icon) {
      var scaledBoxSize = boxSize * scale;
      ctx.save();
      ctx.strokeStyle = colors.resizeBoxStroke;
      ctx.lineWidth = 2;
      ctx.fillStyle = colors.resizeBoxFill;
      ctx.fillRect(centerCoords[0] - scaledBoxSize / 2, centerCoords[1] - scaledBoxSize / 2, scaledBoxSize, scaledBoxSize);
      ctx.strokeRect(centerCoords[0] - scaledBoxSize / 2, centerCoords[1] - scaledBoxSize / 2, scaledBoxSize, scaledBoxSize);
      ctx.restore();
      ctx.drawImage(icons[icon], centerCoords[0] - scaledBoxSize / 2, centerCoords[1] - scaledBoxSize / 2, scaledBoxSize, scaledBoxSize);

    };

    this.drawIconResizeBoxNESW = function(centerCoords, boxSize, scale) {
      this.drawIconResizeBoxBase(centerCoords, boxSize, scale);
      drawFilledPolygon(shapeArrowNE, colors.resizeBoxArrowFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowSW, colors.resizeBoxArrowFill, centerCoords, scale);
    };
    this.drawIconResizeBoxNWSE = function(centerCoords, boxSize, scale) {
      this.drawIconResizeBoxBase(centerCoords, boxSize, scale);
      drawFilledPolygon(shapeArrowNW, colors.resizeBoxArrowFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowSE, colors.resizeBoxArrowFill, centerCoords, scale);
    };

    /* Crop Area */

    this.drawCropArea = function(image, centerCoords, size, fnDrawClipPath) {

      var xRatio = image.width / ctx.canvas.width,
        yRatio = image.height / ctx.canvas.height,
        xLeft = centerCoords[0] - size / 2,
        yTop = centerCoords[1] - size / 2;

      ctx.save();
      ctx.strokeStyle = colors.areaOutline;
      ctx.lineWidth = 2;
      ctx.beginPath();
      fnDrawClipPath(ctx, centerCoords, size);
      ctx.stroke();
      ctx.clip();

      // draw part of original image
      if (size > 0) {
        if (theArea.getRotation) {
          ctx.save();
          ctx.translate(theArea._currentCenter[0], theArea._currentCenter[1]);
          ctx.rotate(theArea.getRotation() * Math.PI / 180);
          ctx.translate(-theArea._currentCenter[0], -theArea._currentCenter[1]);
        }
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
        if (theArea.getRotation) {
          ctx.restore();
        };
      }

      ctx.beginPath();
      fnDrawClipPath(ctx, centerCoords, size);
      ctx.stroke();
      ctx.clip();

      ctx.restore();
    };

  };
}]);

'use strict';

crop.factory('cropAreaFace', ['cropAreaCircle', function(CropAreaCircle) {
  var CropAreaFace = function() {
    CropAreaCircle.apply(this, arguments);
    this._boxResizeBaseSize = 40;

    this._boxResizeBaseSize = 30;
    this._boxResizeNormalRatio = 1;
    this._boxResizeHoverRatio = 1.3;

    this._boxRotateRightBaseSize = this._boxResizeBaseSize;
    this._boxRotateRightNormalRatio = this._boxResizeNormalRatio;
    this._boxRotateRightHoverRatio = this._boxResizeHoverRatio;
    this._boxRotateRightHoverSize = this._boxRotateRightBaseSize * this._boxRotateRightNormalRatio;
    this._boxRotateRightIsHover = false;

    this._boxRotateLeftBaseSize = this._boxResizeBaseSize;
    this._boxRotateLeftNormalRatio = this._boxResizeNormalRatio;
    this._boxRotateLeftHoverRatio = this._boxResizeHoverRatio;
    this._boxRotateLeftHoverSize = this._boxRotateRightBaseSize * this._boxRotateRightNormalRatio;
    this._boxRotateLeftIsHover = false;
  };
  CropAreaFace.prototype = new CropAreaCircle();

  if (CanvasRenderingContext2D.prototype.ellipse == undefined) {
    CanvasRenderingContext2D.prototype.ellipse = function(x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
      this.save();
      this.translate(x, y);
      this.rotate(rotation);
      this.scale(radiusX, radiusY);
      this.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
      this.restore();
    }
  }

  CropAreaFace.prototype._drawArea = function(ctx, centerCoords, size) {
    ctx.ellipse(centerCoords[0], centerCoords[1], 0.75 * (size / 2), (size / 2), 0, 0, 2 * Math.PI);
  };

  CropAreaFace.prototype._calcRotateRightIconCenterCoords = function() {
    return this._calcCirclePerimeterCoords(45);
  };

  CropAreaFace.prototype._calcRotateLeftIconCenterCoords = function() {
    return this._calcCirclePerimeterCoords(135);
  };

  CropAreaFace.prototype.draw = function() {
    CropAreaCircle.prototype.draw.apply(this, arguments);
    // draw resize cubes
    this._cropCanvas.drawIconResizeBoxBase(this._calcRotateRightIconCenterCoords(), this._boxResizeBaseSize, this._boxRotateRightIsHover ? this._boxResizeHoverRatio : this._boxResizeNormalRatio);
    this._cropCanvas.drawIconResizeBoxBase(this._calcRotateLeftIconCenterCoords(), this._boxResizeBaseSize, this._boxRotateLeftIsHover ? this._boxResizeHoverRatio : this._boxResizeNormalRatio);
  }

  CropAreaFace.prototype.processMouseMove = function(mouseCurX, mouseCurY) {
    this._boxRotateRightIsHover = false;
    this._boxRotateLeftIsHover = false;
    var res = CropAreaCircle.prototype.processMouseMove.apply(this, arguments);
    var cursor = angular.element(this._ctx.canvas).css('cursor');;
    if (this._isCoordWithinBoxRotateRight([mouseCurX, mouseCurY])) {
      cursor = 'crosshair';
      this._areaIsHover = false;
      this._boxResizeIsHover = false;
      this._boxRotateRightIsHover = true;
      res = true;
    } else if (this._isCoordWithinBoxRotateLeft([mouseCurX, mouseCurY])) {
      cursor = 'crosshair';
      this._areaIsHover = false;
      this._boxResizeIsHover = false;
      this._boxRotateLeftIsHover = true;
      res = true;
    }
    angular.element(this._ctx.canvas).css({
      'cursor': cursor
    });
    return res;
  };

  CropAreaFace.prototype.processMouseDown = function(mouseDownX, mouseDownY) {
    CropAreaCircle.prototype.processMouseDown.apply(this, arguments);
    if (this._isCoordWithinBoxRotateRight([mouseDownX, mouseDownY])) {
      this.setRotation(this.getRotation() + 10);
    } else if (this._isCoordWithinBoxRotateLeft([mouseDownX, mouseDownY])) {
      this.setRotation(this.getRotation() - 10);
    }
  }

  CropAreaFace.prototype._isCoordWithinBoxRotateRight = function(coord) {
    var resizeIconCenterCoords = this._calcRotateRightIconCenterCoords();
    var hSize = this._boxRotateRightHoverSize / 2;
    return (coord[0] > resizeIconCenterCoords[0] - hSize && coord[0] < resizeIconCenterCoords[0] + hSize &&
      coord[1] > resizeIconCenterCoords[1] - hSize && coord[1] < resizeIconCenterCoords[1] + hSize);
  };

  CropAreaFace.prototype._isCoordWithinBoxRotateLeft = function(coord) {
    var resizeIconCenterCoords = this._calcRotateLeftIconCenterCoords();
    var hSize = this._boxRotateLeftHoverSize / 2;
    return (coord[0] > resizeIconCenterCoords[0] - hSize && coord[0] < resizeIconCenterCoords[0] + hSize &&
      coord[1] > resizeIconCenterCoords[1] - hSize && coord[1] < resizeIconCenterCoords[1] + hSize);
  };
  return CropAreaFace;
}]);

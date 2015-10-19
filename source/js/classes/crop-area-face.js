'use strict';

crop.factory('cropAreaFace', ['cropAreaCircle', 'cropArea', function(CropAreaCircle, CropArea) {

  var CropAreaFace = function() {
    CropAreaCircle.apply(this, arguments);
    init.apply(this, arguments);
  };

  function init() {
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

    this._boxResetBaseSize = this._boxResizeBaseSize;
    this._boxResetNormalRatio = this._boxResizeNormalRatio;
    this._boxResetHoverRatio = this._boxResizeHoverRatio;
    this._boxResetHoverSize = this._boxResetBaseSize * this._boxResetNormalRatio;
    this._boxResetIsHover = false;

    this.rotated = false;

    this._x = this._ctx.canvas.width/2;
    this._y = this._ctx.canvas.height/2;
    this._currentCenter = [this._x,this._y];
    this._size = 200;

    this._boxResizeNormalSize = this._boxResizeBaseSize*this._boxResizeNormalRatio;
    this._boxResizeHoverSize = this._boxResizeBaseSize*this._boxResizeHoverRatio;

    this._posDragStartX=0;
    this._posDragStartY=0;
    this._posResizeStartX=0;
    this._posResizeStartY=0;
    this._posResizeStartSize=0;

    this._boxResizeIsHover = false;
    this._areaIsHover = false;
    this._boxResizeIsDragging = false;
    this._areaIsDragging = false;

    this.setRotation(0);
  }

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

  CropAreaFace.prototype._calcResetIconCenterCoords = function(){
    return this._calcCirclePerimeterCoords(225);
  }

  CropAreaFace.prototype.draw = function() {
    CropArea.prototype.draw.apply(this, arguments);
    // draw move icon
    if (!this.rotated)
      this._cropCanvas.drawIconMove([this._x, this._y], this._areaIsHover ? this._iconMoveHoverRatio : this._iconMoveNormalRatio);

    // draw resize cubes
    this._cropCanvas.drawIconResizeBoxNESW(this._calcResizeIconCenterCoords(), this._boxResizeBaseSize, this._boxResizeIsHover ? this._boxResizeHoverRatio : this._boxResizeNormalRatio);

    // draw resize cubes
    //this._cropCanvas.drawIconResizeBoxBase(this._calcRotateRightIconCenterCoords(), this._boxResizeBaseSize, this._boxRotateRightIsHover ? this._boxResizeHoverRatio : this._boxResizeNormalRatio);
    this._cropCanvas.drawIconBoxBase(this._calcRotateRightIconCenterCoords(), this._boxResetBaseSize, this._boxRotateRightIsHover ? this._boxResizeHoverRatio : this._boxResizeNormalRatio,'rotateRight');
    //this._cropCanvas.drawIconResizeBoxBase(this._calcRotateLeftIconCenterCoords(), this._boxResizeBaseSize, this._boxRotateLeftIsHover ? this._boxResizeHoverRatio : this._boxResizeNormalRatio);
    this._cropCanvas.drawIconBoxBase(this._calcRotateLeftIconCenterCoords(), this._boxResetBaseSize, this._boxRotateLeftIsHover ? this._boxResizeHoverRatio : this._boxResizeNormalRatio,'rotateLeft');
    this._cropCanvas.drawIconBoxBase(this._calcResetIconCenterCoords(), this._boxResetBaseSize, this._boxResetIsHover ? this._boxResetHoverRatio : this._boxResetNormalRatio,'reset');
  }

  CropAreaFace.prototype.processMouseMove = function(mouseCurX, mouseCurY) {
    this._boxRotateRightIsHover = false;
    this._boxRotateLeftIsHover = false;
    this._boxResetIsHover = false;
    if (this._isCoordWithinArea([mouseCurX, mouseCurY]) && this.rotated)
      return;
    var res = CropAreaCircle.prototype.processMouseMove.apply(this, arguments);
    var cursor = angular.element(this._ctx.canvas).css('cursor');
    if (this._isCoordWithinBoxRotateRight([mouseCurX, mouseCurY])) {
      cursor = 'crosshair';
      this._boxRotateRightIsHover = true;
      res = true;
    } else if (this._isCoordWithinBoxRotateLeft([mouseCurX, mouseCurY])) {
      cursor = 'crosshair';
      this._boxRotateLeftIsHover = true;
      res = true;
    } else if (this._isCoordWithinBoxReset([mouseCurX, mouseCurY])) {
      cursor = 'pointer';
      this._boxResetIsHover = true;
      res = true;
    }
    angular.element(this._ctx.canvas).css({
      'cursor': cursor
    });
    return res;
  };

  CropAreaFace.prototype.processMouseDown = function(mouseDownX, mouseDownY) {
    if (this._isCoordWithinArea([mouseDownX, mouseDownY]) && this.rotated) {
      return;
    }
    CropAreaCircle.prototype.processMouseDown.apply(this, arguments);
    if (this._isCoordWithinBoxRotateRight([mouseDownX, mouseDownY])) {
      this.rotated = true;
      this.setRotation(this.getRotation() - 10);
    } else if (this._isCoordWithinBoxRotateLeft([mouseDownX, mouseDownY])) {
      this.rotated = true;
      this.setRotation(this.getRotation() + 10);
    } else if(this._isCoordWithinBoxReset([mouseDownX, mouseDownY])){
      init.apply(this, arguments);
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

  CropAreaFace.prototype._isCoordWithinBoxReset = function(coord) {
    var resizeIconCenterCoords = this._calcResetIconCenterCoords();
    var hSize = this._boxResetHoverSize / 2;
    return (coord[0] > resizeIconCenterCoords[0] - hSize && coord[0] < resizeIconCenterCoords[0] + hSize &&
      coord[1] > resizeIconCenterCoords[1] - hSize && coord[1] < resizeIconCenterCoords[1] + hSize);
  };
  return CropAreaFace;
}]);

'use strict';

crop.factory('cropAreaFace', ['cropAreaCircle', function(CropAreaCircle) {
  var CropAreaFace = function() {
    CropAreaCircle.apply(this, arguments);
    this._boxResizeBaseSize = 50;
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
  return CropAreaFace;
}]);

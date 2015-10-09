'use strict';

crop.factory('cropAreaFace', ['cropAreaCircle', function(CropAreaCircle) {
  var CropAreaFace = function() {
    CropAreaCircle.apply(this, arguments);
    this._boxResizeBaseSize = 45;
  };
  CropAreaFace.prototype = new CropAreaCircle();
  CropAreaFace.prototype._drawArea = function(ctx, centerCoords, size) {
    ctx.ellipse(centerCoords[0], centerCoords[1], 0.75 * (size / 2), (size / 2), 0, 0, 2 * Math.PI);
  };
  return CropAreaFace;
}]);

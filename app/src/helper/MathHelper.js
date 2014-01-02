define('helper/MathHelper', ['goo/math/Matrix3x3'], function(Matrix3x3) {

  var matrix = new Matrix3x3();

  return {
    rotateVectorByYRad: function(vector, yrad) {
      var m = new Matrix3x3();
      matrix.rotateY(yrad, m);
      return m.applyPre(vector);
    }
  };

});
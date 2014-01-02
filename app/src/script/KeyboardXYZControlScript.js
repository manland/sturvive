define('script/KeyboardXYZControlScript', 
  ['helper/KeyboardHelper', 'helper/DebuggerHelper', 'goo/math/Vector3', 'helper/MathHelper'], 
  function(KeyboardHelper, DebuggerHelper, Vector3, MathHelper) {

  function KeyboardXYZControlScript() {
    this.x = 0;
    this.yRotation = 0;
    this.yRotationAcc = 0;
    this.z = 0;

    KeyboardHelper.listen(
      38,//UP
      function() { this.z = 0.1; },
      function() { this.z = 0; },
      this
    );

    KeyboardHelper.listen(
      40,//DOWN
      function() { this.z = -0.1; },
      function() { this.z = 0; },
      this
    );

    KeyboardHelper.listen(
      39,//RIGHT
      function() { this.x = 0.1; },
      function() { this.x = 0; },
      this
    );

    KeyboardHelper.listen(
      37,//LEFT
      function() { this.x = -0.1; },
      function() { this.x = 0; },
      this
    );

    KeyboardHelper.listen(
      67,//TOUCH C
      function() { this.yRotation = 0.05; },
      function() { this.yRotation = 0; },
      this
    );

    KeyboardHelper.listen(
      86,//TOUCH V
      function() { this.yRotation = -0.05; },
      function() { this.yRotation = 0; },
      this
    );
  }

  KeyboardXYZControlScript.prototype.run = function(camera) {
    this.yRotationAcc = this.yRotationAcc + this.yRotation;
    var v = MathHelper.rotateVectorByYRad(new Vector3(this.x, 0, this.z), this.yRotationAcc);
    camera.transformComponent.addTranslation(v.x, 0, -v.z);
    camera.transformComponent.setRotation(0, this.yRotationAcc, 0);
  };

  return KeyboardXYZControlScript;

});
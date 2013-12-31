define('script/KeyboardXYZControlScript', 
  ['helper/KeyboardHelper', 'helper/DebuggerHelper'], 
  function(KeyboardHelper, DebuggerHelper) {

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
    var x = this.x;
    var z = this.z;
    if(this.yRotationAcc !== 0) {
      x = x * Math.cos(this.yRotationAcc) - z * Math.sin(this.yRotationAcc);
      z = x * Math.sin(this.yRotationAcc) + z * Math.cos(this.yRotationAcc);
    }
    camera.transformComponent.addTranslation(x, 0, -z);
    camera.transformComponent.setRotation(0, this.yRotationAcc, 0);
  };

  return KeyboardXYZControlScript;

});
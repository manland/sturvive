define('script/KeyboardXYZControlScript', 
  ['helper/KeyboardHelper', 'helper/DebuggerHelper', 'script/AbstractXYZControlScript'], 
  function(KeyboardHelper, DebuggerHelper, AbstractXYZControlScript) {

  function KeyboardXYZControlScript() {
    AbstractXYZControlScript.prototype.constructor.apply(this);
    KeyboardHelper.listen(
      38,//UP
      function() { this.z = 0.5; },
      function() { this.z = 0; },
      this
    );

    KeyboardHelper.listen(
      40,//DOWN
      function() { this.z = -0.5; },
      function() { this.z = 0; },
      this
    );

    KeyboardHelper.listen(
      39,//RIGHT
      function() { this.x = 0.5; },
      function() { this.x = 0; },
      this
    );

    KeyboardHelper.listen(
      37,//LEFT
      function() { this.x = -0.5; },
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

  KeyboardXYZControlScript.prototype = Object.create(AbstractXYZControlScript.prototype);

  return KeyboardXYZControlScript;

});
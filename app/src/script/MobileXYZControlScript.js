define('script/MobileXYZControlScript', 
  ['helper/TouchButton', 'helper/DebuggerHelper', 'goo/math/Vector3', 'helper/MathHelper'], 
  function(TouchButton, DebuggerHelper, Vector3, MathHelper) {

  function MobileXYZControlScript(afterRunCallback, afterRunCtx) {
    this.afterRunCallback = afterRunCallback;
    this.afterRunCtx = afterRunCtx;
    this.x = 0;
    this.yRotation = 0;
    this.yRotationAcc = 0;
    this.z = 0;
    var xzButton = TouchButton.build('xzButton', this.handleXZStart, this.handleXZStop, this);
    document.getElementsByTagName('body')[0].appendChild(xzButton);
    var yButton = TouchButton.build('yButton', this.handleYStart, this.handleYStop, this);
    document.getElementsByTagName('body')[0].appendChild(yButton);
  }

  MobileXYZControlScript.prototype.handleXZStart = function(e) {
    var middleWidth = e.width/2;
    var middleHeight = e.height/2;
    //QUART ROUND BUTTON
    this.x = e.insideX > middleWidth ? 0.1 : -0.1;
    this.z = e.insideY > middleHeight ? -0.1 : 0.1;
    //MIDDLE ROUND BUTTON
    this.x = e.insideX > e.width/3 && e.insideX < 2*(e.width/3) ? 0 : this.x;
    this.z = e.insideY > e.height/3 && e.insideY < 2*(e.height/3) ? 0 : this.z;
    DebuggerHelper.updateDebug('x', this.x, 'z', this.z, 'yRotation', this.yRotation);
  };

  MobileXYZControlScript.prototype.handleXZStop = function(e) {
    this.x = 0;
    this.z = 0;
    //DebuggerHelper.updateDebug('stop', '\'(', 'by', e.type);
  };

  MobileXYZControlScript.prototype.handleYStart = function(e) {
    var middleWidth = e.width/2;
    this.yRotation = e.insideX > middleWidth ? -0.01 : 0.01;
    DebuggerHelper.updateDebug('x', this.x, 'z', this.z, 'yRotation', this.yRotation);
  };

  MobileXYZControlScript.prototype.handleYStop = function(e) {
    this.yRotation = 0;
  };

  MobileXYZControlScript.prototype.run = function(camera) {
    this.yRotationAcc = this.yRotationAcc + this.yRotation;
    var v = MathHelper.rotateVectorByYRad(new Vector3(this.x, 0, this.z), this.yRotationAcc);
    camera.transformComponent.addTranslation(v.x, 0, -v.z);
    camera.transformComponent.setRotation(0, this.yRotationAcc, 0);
    if(this.afterRunCallback) {
      var isMoving = this.yRotation !== 0 || this.x !== 0 || this.z !== 0;
      this.afterRunCallback.call(this.afterRunCtx, isMoving);
    }
  };

  return MobileXYZControlScript;

});
define('script/mobileXYZControlScript', 
  ['helper/TouchButton', 'DebuggerHelper'], 
  function(TouchButton, DebuggerHelper) {

  function MobileXYZControlScript() {
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
    e.preventDefault();
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
    e.preventDefault();
    var middleWidth = e.width/2;
    this.yRotation = e.insideX > middleWidth ? -0.01 : 0.01;
    DebuggerHelper.updateDebug('x', this.x, 'z', this.z, 'yRotation', this.yRotation);
  };

  MobileXYZControlScript.prototype.handleYStop = function(e) {
    this.yRotation = 0;
  };

  MobileXYZControlScript.prototype.run = function(camera) {
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

  return MobileXYZControlScript;

});
define('script/AbstractXYZControlScript', 
  ['goo/math/Vector3', 'helper/MathHelper'], 
  function(Vector3, MathHelper) {

    function AbstractXYZControlScript() {
      this.x = 0;
      this.yRotation = 0;
      this.yRotationAcc = 0;
      this.z = 0;
      this.afterRunCallback = [];
    }

    AbstractXYZControlScript.prototype.onRun = function(callback, ctx) {
      this.afterRunCallback.push({f:callback, ctx: ctx});
    };

    AbstractXYZControlScript.prototype.run = function(camera) {
      this.yRotationAcc = this.yRotationAcc + this.yRotation;
      var v = MathHelper.rotateVectorByYRad(new Vector3(this.x, 0, this.z), this.yRotationAcc);
      camera.transformComponent.addTranslation(v.x, 0, -v.z);
      camera.transformComponent.setRotation(0, this.yRotationAcc, 0);
      var isMoving = this.yRotation !== 0 || this.x !== 0 || this.z !== 0;
      for(var i=0, len=this.afterRunCallback.length; i<len; i++) {
        var callback = this.afterRunCallback[i];
        if(callback.ctx) {
          callback.f.call(callback.ctx, isMoving);
        } else {
          callback.f(isMoving);
        }
      }
    };

    return AbstractXYZControlScript;

  }
);
define('script/RunEntityScript', 
  ['goo/math/Vector3', 'manager/EntityManager', 'helper/MathHelper'], 
  function (Vector3, EntityManager, MathHelper) {
  
  'use strict';

  var speed = 1;
  var maxLifeTime = 100;

  function RunEntityScript(yRotation) {
    this.lifeTime = 0;

    var v = MathHelper.rotateVectorByYRad(new Vector3(0, 0, speed), yRotation);
    this.xBy = v.x;
    this.zBy = v.z;
  }

  RunEntityScript.prototype.run = function(entity) {
    this.lifeTime = this.lifeTime + 1;
    if(this.lifeTime > maxLifeTime) {
      entity.removeFromWorld();
      return;
    }
    entity.transformComponent.addTranslation(this.xBy, 0, -this.zBy);

    EntityManager.checkCollision(entity);
  };

  return RunEntityScript;

});
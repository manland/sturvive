define('script/RunEntityScript', 
  ['goo/math/Vector3', 'helper/EntityHelper', 'helper/MathHelper'], 
  function (Vector3, EntityHelper, MathHelper) {
  
  'use strict';

  var speed = 1;

  function RunEntityScript(yRotation, allEntities) {
    this.allEntities = allEntities;

    var v = MathHelper.rotateVectorByYRad(new Vector3(0, 0, speed), yRotation);
    this.xBy = v.x;
    this.zBy = v.z;
  }

  RunEntityScript.prototype.run = function(entity) {
    entity.transformComponent.addTranslation(this.xBy, 0, -this.zBy);

    for(var i=0, len=this.allEntities.length; i<len; i++) {
      if(EntityHelper.getDistance(entity, this.allEntities[i]) < 0) {
        this.allEntities[i].removeFromWorld();
        this.allEntities.splice(i, 1);
        entity.removeFromWorld();
        return;
      }
    }
  };

  return RunEntityScript;

});
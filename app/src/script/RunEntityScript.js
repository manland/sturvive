define('script/RunEntityScript', 
  ['goo/math/Vector3'], 
  function (Vector3) {
  
  'use strict';

  var speed = 1;

  function RunEntityScript(to) {
    this.to = to;
  }

  RunEntityScript.prototype.run = function(entity) {
    var toX = 0, toY = 0, toZ = 0;
    var toPosition = this.to;

    var myX = entity.transformComponent.transform.translation.x;
    var myY = entity.transformComponent.transform.translation.y;
    var myZ = entity.transformComponent.transform.translation.z;

    if(myX === toPosition.x && myY === toPosition.y && myZ === toPosition.z) {
      return;
    }

    if(myX < toPosition.x) {
      toX = myX + speed;
    } else if(myX > toPosition.x) {
      toX = myX - speed;
    }
    if(myY < toPosition.y) {
      toY = myY + speed;
    } else if(myY > toPosition.y) {
      toY = myY - speed;
    }
    if(myZ < toPosition.z) {
      toZ = myZ + speed;
    } else if(myZ > toPosition.z) {
      toZ = myZ - speed;
    }

    console.log(Vector3.toString());

    entity.transformComponent.lookAt( new Vector3(toPosition.x, toPosition.y, toPosition.z), Vector3.UNIT_Y );
    entity.transformComponent.setTranslation( toX, toY, toZ );
  };

  return RunEntityScript;

});
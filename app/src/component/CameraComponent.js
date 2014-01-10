define('component/CameraComponent', [
  'goo/entities/components/Component',
  'goo/renderer/Camera',
  'goo/scripts/OrbitCamControlScript',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',

  'script/MobileXYZControlScript',
  'script/KeyboardXYZControlScript',

  'helper/MobileHelper',
  'helper/EntityHelper',
  'helper/InputHelper',

  'manager/PlayerManager'
], function (
  Component,
  Camera,
  OrbitCamControlScript,
  ShapeCreator,
  EntityUtils,

  MobileXYZControlScript,
  KeyboardXYZControlScript,
  
  MobileHelper,
  EntityHelper,
  InputHelper,

  PlayerManager
  ) {
  
  'use strict';

  function CameraComponent(world, fuelZone, showHelper) {
    this.type = 'CameraComponent';
    this.amountFuel = 100;

    this.camera = new Camera(35, 1, 0.1, 1000);

    var afterRun = function afterRun(isMoving) {
      if(EntityHelper.getDistance(this.entity, fuelZone.entity) < 0) {
        if(this.amountFuel < 100) {
          this.amountFuel = this.amountFuel + 1;
          fuelZone.update(this.amountFuel);
        }
      } else if(isMoving) {
        this.amountFuel = this.amountFuel - PlayerManager.get('fuelLoss');
        fuelZone.update(this.amountFuel);
      }
    };

    if(MobileHelper.isMobile()) {
      this.script = new MobileXYZControlScript();
    } else {
      this.script = new KeyboardXYZControlScript();
    }
    this.script.onRun(afterRun, this);

    this.entity =  EntityUtils.createTypicalEntity(
      world, 
      this.camera, 
      this.script
    );
    this.entity.addToWorld();

    if(showHelper) {
      this.showHelper();
    }
  }

  CameraComponent.prototype = Object.create(Component.prototype);

  CameraComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('camera', this.entity);
  };

  CameraComponent.prototype.getBulletPosition = function() {
    var pos = EntityHelper.getPosition(this.entity);
    pos.z = pos.z - 10;
    if(this.script.yRotationAcc !== 0) {
      var angle = this.script.yRotationAcc;
      var x = pos.x * Math.cos(angle) - pos.z * Math.sin(angle);
      var z = pos.x * Math.sin(angle) + pos.z * Math.cos(angle);
      pos.x = x;
      pos.z = z;
    }
    return pos;
  };

  CameraComponent.prototype.updateFuelAmount = function(fuel) {
    this.amountFuel = fuel;
  };

  return CameraComponent;

});
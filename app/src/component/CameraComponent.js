define('component/CameraComponent', [
  'goo/entities/components/Component',
  'goo/renderer/Camera',
  'goo/scripts/OrbitCamControlScript',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',

  'script/MobileXYZControlScript',
  'script/KeyboardXYZControlScript',

  'helper/MobileHelper',
  'helper/InputHelper'
], function (
  Component,
  Camera,
  OrbitCamControlScript,
  ShapeCreator,
  EntityUtils,

  MobileXYZControlScript,
  KeyboardXYZControlScript,
  
  MobileHelper,
  InputHelper
  ) {
  
  'use strict';

  function CameraComponent(world, showHelper) {
    this.type = 'CameraComponent';

    this.camera = new Camera(35, 1, 0.1, 1000);

    var script;
    if(MobileHelper.isMobile()) {
      script = new MobileXYZControlScript();
    } else {
      script = new KeyboardXYZControlScript();
    }

    this.entity =  EntityUtils.createTypicalEntity(
      world, 
      this.camera, 
      [0,0,7], 
      script
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

  return CameraComponent;

});
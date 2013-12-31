define('component/Camera', [
  'goo/entities/components/Component',
  'goo/renderer/Camera',
  'goo/scripts/OrbitCamControlScript',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',
  'InputHelper'
], function (
  Component,
  Camera,
  OrbitCamControlScript,
  ShapeCreator,
  EntityUtils,
  InputHelper
  ) {
  
  'use strict';

  function CameraComponent(world, optScript, showHelper) {
    this.type = 'CameraComponent';

    this.camera = new Camera(35, 1, 0.1, 1000);
    this.entity =  EntityUtils.createTypicalEntity(
      world, 
      this.camera, 
      [0,0,7], 
      optScript ? optScript : new OrbitCamControlScript()
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

  CameraComponent.prototype.getPickRay = function(x, y, w, h, ray) {
    return this.camera.getPickRay(x, y, w, h, ray);
  };

  return CameraComponent;

});
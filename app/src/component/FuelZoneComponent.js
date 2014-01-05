define('component/FuelZoneComponent', [
  'goo/entities/components/Component',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',
  'material/ColoredMaterial',
  'helper/InputHelper'
], function (
  Component,
  ShapeCreator,
  EntityUtils,
  ColoredMaterial,
  InputHelper
  ) {
  
  'use strict';

  function SunComponent(world, showHelper) {
    this.type = 'FuelZoneComponent';

    this.shape = ShapeCreator.createSphere( 10, 10, 0.5);
    this.material = new ColoredMaterial.buildFuelZone();
    this.material.wireframe = true;

    this.entity = EntityUtils.createTypicalEntity( 
      world, 
      this.shape, 
      this.material
    );
    this.entity.beeDataComponent = this;
    this.entity.addToWorld();
    if(showHelper) {
      this.showHelper();
    }
  }

  SunComponent.prototype = Object.create(Component.prototype);

  SunComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('FuelZone', this.entity);
    InputHelper.coloredMaterial('color', this.material, div);
  };

  return SunComponent;

});
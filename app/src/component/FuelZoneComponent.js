define('component/FuelZoneComponent', [
  'goo/entities/components/Component',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',
  'material/ColoredMaterial',
  'helper/InputHelper',
  'helper/DomHelper',
  'util/OptionsUtil',
  'util/ScreenUtil'
], function (
  Component,
  ShapeCreator,
  EntityUtils,
  ColoredMaterial,
  InputHelper,
  DomHelper,
  OptionsUtil,
  ScreenUtil
  ) {
  
  'use strict';

  var fuelDiv;

  function SunComponent(world, showHelper) {
    this.type = 'FuelZoneComponent';
    
    var meshDetails = OptionsUtil.get('meshDetails');
    this.shape = ShapeCreator.createSphere( 5*meshDetails, 5*meshDetails, 0.8);
    this.material = new ColoredMaterial.buildFuelZone();
    this.material.wireframe = true;

    this.entity = EntityUtils.createTypicalEntity( 
      world, 
      this.shape, 
      this.material
    );
    this.entity.beeDataComponent = this;
    this.entity.addToWorld();

    fuelDiv = DomHelper.addFuelAmount(ScreenUtil.getHeight() - (ScreenUtil.getHeight() * 0.5));
    fuelDiv.update(100);

    if(showHelper) {
      this.showHelper();
    }
  }

  SunComponent.prototype = Object.create(Component.prototype);

  SunComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('FuelZone', this.entity);
    InputHelper.coloredMaterial('color', this.material, div);
  };

  SunComponent.prototype.update = function(fuelAmount) {
    fuelDiv.update(fuelAmount);
  };

  return SunComponent;

});
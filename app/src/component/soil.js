define('component/Soil', [
  'goo/entities/components/Component',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',
  'material/Colored',
  'InputHelper'
], function (
  Component,
  ShapeCreator,
  EntityUtils,
  ColoredMaterial,
  InputHelper
  ) {
  
  'use strict';

  function SoilComponent(world, showHelper) {
    this.type = 'SoilComponent';

    var shape = ShapeCreator.createQuad(100, 100, 1, 1);
    this.material = ColoredMaterial.buildSoil();

    this.entity = EntityUtils.createTypicalEntity( world, shape, this.material );
    this.entity.transformComponent.setTranslation( 0, -4, 0 );
    this.entity.transformComponent.setRotation( Math.PI/2, 0, Math.PI );
    this.entity.beeDataComponent = this;
    this.entity.addToWorld();

    if(showHelper) {
      this.showHelper();
    }
  }

  SoilComponent.prototype = Object.create(Component.prototype);

  SoilComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('soil', this.entity);
    InputHelper.coloredMaterial('color', this.material, div);
  };

  SoilComponent.prototype.select = function() {
    return false;
  };

  return SoilComponent;

});
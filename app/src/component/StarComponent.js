define('component/StarComponent', [
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

  function StarComponent(world, showHelper) {
    this.type = 'StarComponent';

    this.shape = ShapeCreator.createSphere(8, 8, 5);
    this.material = new ColoredMaterial.buildStar();

    this.entity = EntityUtils.createTypicalEntity( world, this.shape, this.material );
    this.entity.transformComponent.setTranslation( 0, 0, 0 );
    this.entity.beeDataComponent = this;
    this.entity.addToWorld();

    if(showHelper) {
      this.showHelper();
    }
  }

  StarComponent.prototype = Object.create(Component.prototype);

  StarComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('Star', this.entity);
    InputHelper.coloredMaterial('color', this.material, div);
  };

  StarComponent.prototype.select = function() {
    return false;
  };

  return StarComponent;

});
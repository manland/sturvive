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

  function StarComponent(world, position, showHelper) {
    this.type = 'StarComponent';

    this.shape = ShapeCreator.createSphere(8, 8, 1);
    this.material = new ColoredMaterial.buildStar();

    this.entity = EntityUtils.createTypicalEntity( world, this.shape, this.material );
    this.entity.transformComponent.setTranslation( position.x, position.y, position.z );
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

  return StarComponent;

});
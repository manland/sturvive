define('component/BulletComponent', [
  'goo/entities/components/Component',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',
  'material/ColoredMaterial',
  'script/RunEntityScript',
  'helper/InputHelper'
], function (
  Component,
  ShapeCreator,
  EntityUtils,
  ColoredMaterial,
  RunEntityScript,
  InputHelper
  ) {
  
  'use strict';

  function BulletComponent(world, from, to, showHelper) {
    this.type = 'BulletComponent';

    this.shape = ShapeCreator.createCylinder( 15, 0.1);
    this.material = new ColoredMaterial.buildStar();

    this.entity = EntityUtils.createTypicalEntity( world, this.shape, this.material, new RunEntityScript(to));
    this.entity.transformComponent.setTranslation( from.x, from.y, from.z );
    this.entity.beeDataComponent = this;
    this.entity.addToWorld();

    if(showHelper) {
      this.showHelper();
    }
  }

  BulletComponent.prototype = Object.create(Component.prototype);

  BulletComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('Bullet', this.entity);
    InputHelper.coloredMaterial('color', this.material, div);
  };

  return BulletComponent;

});
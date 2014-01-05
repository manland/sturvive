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

  function BulletComponent(world, from, to, yRotation, allEntities, callbackAfterRemoveEntities, showHelper) {
    this.type = 'BulletComponent';

    this.shape = ShapeCreator.createCylinder( 15, 0.01);
    this.material = new ColoredMaterial.buildBullet();

    this.entity = EntityUtils.createTypicalEntity( 
      world, 
      this.shape, 
      this.material,
      new RunEntityScript(yRotation, allEntities, callbackAfterRemoveEntities)
    );
    this.entity.transformComponent.setTranslation( from.x, from.y-0.5, from.z );
    this.entity.transformComponent.setRotation( 0.01, yRotation, 0 );
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
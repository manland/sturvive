
define('component/Bee', [
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

  function BeeComponent(world, position, toPosition, showHelper) {
    this.type = 'BeeComponent';

    this.shape = ShapeCreator.createSphere(5, 5, 0.1);
    this.material = new ColoredMaterial.buildBee();

    var speed = 1;

    if(toPosition) {
      this.entity =  EntityUtils.createTypicalEntity(world, this.shape, this.material, {
        run: function (entity) {
          var toX, toY, toZ = 0;
          var myX = entity.transformComponent.transform.translation.x;
          var myY = entity.transformComponent.transform.translation.y;
          var myZ = entity.transformComponent.transform.translation.z;

          if(myX < toPosition.x) {
            toX = myX + speed;
          } else if(myX > toPosition.x) {
            toX = myX - speed;
          } else {
            toX = 0.1;
          }
          if(myY < toPosition.y) {
            toY = myY + speed;
          } else if(myY > toPosition.y) {
            toY = myY - speed;
          } else {
            toY = 0.1;//to move
          }
          if(myZ < toPosition.z) {
            toZ = myZ + speed;
          } else if(myZ > toPosition.z) {
            toZ = myZ - speed;
          } else {
            toZ = 0.1;
          }

          entity.transformComponent.setTranslation( toX, toY, toZ );
          
        }
      });
    } else {
      this.entity =  EntityUtils.createTypicalEntity(world, this.shape, this.material);
    }
    this.entity.transformComponent.setTranslation( position.x, position.y, position.z );
    this.entity.beeDataComponent = this;
    this.entity.addToWorld();

    if(showHelper) {
      this.showHelper();
    }
  }

  BeeComponent.prototype = Object.create(Component.prototype);

  BeeComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('Bee', this.entity);
    InputHelper.coloredMaterial('color', this.material, div);
  };

  BeeComponent.prototype.select = function() {
    return false;
  };

  return BeeComponent;

});
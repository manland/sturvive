define('component/Flower', [
  'goo/entities/components/Component',
  'goo/shapes/Disk',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',
  'material/Colored',
  'InputHelper'
], function (
  Component,
  Disk,
  ShapeCreator,
  EntityUtils,
  ColoredMaterial,
  InputHelper
  ) {
  
  'use strict';

  function FlowerComponent(world, defaultPosition, color, showHelper) {
    this.type = 'FlowerComponent';
    this.originalColor = color;

    var sphere = ShapeCreator.createSphere(10, 10, 0.1);
    var cylinder = ShapeCreator.createCylinder( 30, 0.2);

    this.mat = ColoredMaterial.build(color[0], color[1], color[2], color[3]);

    this.top = EntityUtils.createTypicalEntity( world, sphere, this.mat);
    this.top.beeDataComponent = this;
    this.top.transformComponent.setScale( 4, 4, 4 );
    this.top.addToWorld();

    this.matStem = ColoredMaterial.buildStem();

    this.stem = EntityUtils.createTypicalEntity( world, cylinder, this.matStem);
    this.stem.beeDataComponent = this;
    this.stem.transformComponent.setTranslation( 0, -2, 0 );
    this.stem.transformComponent.setRotation( 1.5708, 0, 0);
    this.stem.transformComponent.setScale( 0.4, 0.4, 4 );
    this.stem.addToWorld();

    this.flower = EntityUtils.createTypicalEntity( world );
    this.flower.beeDataComponent = this;
    this.flower.addToWorld();

    this.flower.transformComponent.attachChild( this.top.transformComponent);
    this.flower.transformComponent.attachChild( this.stem.transformComponent);

    this.flower.transformComponent.setTranslation( defaultPosition );

    this.buildPetals(world, color);

    if(showHelper) {
      this.showHelper();
    }
  }

  FlowerComponent.prototype = Object.create(Component.prototype);

  FlowerComponent.prototype.buildPetals = function(world, color) {
    var shape = new Disk(8, 2, -1);
    var mat = ColoredMaterial.build(color[0], color[2], color[1], color[3]);
    this.petal = EntityUtils.createTypicalEntity( world, shape, mat);
    this.petal.beeDataComponent = this;
    var r = Math.random();
    this.petal.transformComponent.setRotation( 1.5708 + (r/2), 0, 2.5 );
    this.petal.transformComponent.setScale( 0.5, 0.5, 0.5 );
    this.petal.transformComponent.setTranslation( 0, 0.1, 0 );
    this.petal.addToWorld();
    this.flower.transformComponent.attachChild( this.petal.transformComponent);
  };

  FlowerComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('flower', this.flower);
    var sphereDiv = InputHelper.entity('sphere', this.top, div);
    InputHelper.coloredMaterial('color', this.mat, sphereDiv);
    var stemDiv = InputHelper.entity('stem', this.stem, div);
    InputHelper.coloredMaterial('color', this.matStem, stemDiv);
    InputHelper.entity('petal', this.petal, div);
  };

  FlowerComponent.prototype.select = function() {
    ColoredMaterial.update(this.mat, 1, 0, 0, 1);
    return true;
  };

  FlowerComponent.prototype.unselect = function() {
    ColoredMaterial.update(this.mat, this.originalColor[0], this.originalColor[1], this.originalColor[2], this.originalColor[3]);
  };

  return FlowerComponent;

});
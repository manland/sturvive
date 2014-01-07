define('component/StarshipComponent', [
  'goo/entities/components/Component',
  'goo/shapes/Box',
  'goo/entities/EntityUtils',
  'material/ColoredMaterial',
  'script/RunEntityScript',
  'helper/InputHelper'
], function (
  Component,
  Box,
  EntityUtils,
  ColoredMaterial,
  RunEntityScript,
  InputHelper
  ) {
  
  'use strict';

  function StarshipComponent(world, showHelper) {
    this.type = 'StarshipComponent';

    this.shape = new Box(5, 5, 15, 0, 0);

    this.material = new ColoredMaterial.buildBullet();

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

  StarshipComponent.prototype = Object.create(Component.prototype);

  StarshipComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('Starship', this.entity);
    InputHelper.coloredMaterial('color', this.material, div);
  };

  return StarshipComponent;

});
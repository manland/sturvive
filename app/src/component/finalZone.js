define('component/FinalZone', [
  'goo/entities/components/Component',
  'goo/math/Vector3',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',
  'goo/shapes/Disk',
  'material/Colored',
  'InputHelper',
  'goo/particles/ParticleUtils', 'goo/entities/components/ParticleComponent',
  'goo/renderer/TextureCreator', 'goo/renderer/Material', 'goo/renderer/shaders/ShaderLib'
], function (
  Component,
  Vector3,
  ShapeCreator,
  EntityUtils,
  Disk,
  ColoredMaterial,
  InputHelper,
  ParticleUtils, ParticleComponent,
  TextureCreator, Material, ShaderLib
  ) {
  
  'use strict';

  function FinalZoneComponent(world, showHelper) {
    this.type = 'FinalZoneComponent';

    this.shape = new Disk(8, 2, 0);
    this.material = new ColoredMaterial.buildStar();

    this.entity = EntityUtils.createTypicalEntity( world, this.shape, this.material );
    this.entity.transformComponent.setTranslation( 0, 0, 0 );
    this.entity.transformComponent.setRotation( Math.PI/2, 0, Math.PI );
    this.entity.beeDataComponent = this;
    this.entity.addToWorld();

    this.config = {
      //particleCount : 200,
      timeline : [
        {timeOffset: 0.00, color: [0, 0, 1, 1], size: 5.0, spin: 0, mass: 0},
        {timeOffset: 0.5, color: [1, 1, 0, 1], size: 4.0},
        {timeOffset: 1, color: [0, 1, 0, 0.5], size: 2.5},
        {timeOffset: 2, color: [1, 0, 0, 0], size: 0.1,}
      ],
      emitters : [{
        totalParticlesToSpawn : -1,//infinity
        releaseRatePerSecond : 500,
        minLifetime : 1,
        maxLifetime : 2,
        getEmissionVelocity : function (particle/*, particleEntity*/) {
          var vec3 = particle.velocity;
          return ParticleUtils.getRandomVelocityOffY(vec3, 0, Math.PI * 15 / 180, 5);
        }
      }]
    };

    var particleComponent = new ParticleComponent(this.config);
    particleComponent.emitters[0].influences.push(
      ParticleUtils.createConstantForce(
        new Vector3(0, 5, 0)
      )
    );

    var particleTex = new TextureCreator().loadTexture2D('assets/img/flare.png');
    particleTex.generateMipmaps = true;
    
    //texture.wrapS = 'EdgeClamp';
    //texture.wrapT = 'EdgeClamp';

    var material = this.material = Material.createMaterial(ShaderLib.particles);
    material.setTexture('DIFFUSE_MAP', particleTex);
    material.blendState.blending = 'AlphaBlending'; // 'AdditiveBlending';
    material.cullState.enabled = false;
    material.depthState.write = false;
    material.renderQueue = 2001;

    var entity = EntityUtils.createTypicalEntity( world, material, particleComponent.meshData, [0, 0, 0]);
    entity.meshRendererComponent.isPickable = false;
    entity.setComponent(particleComponent);
    entity.addToWorld();

    if(showHelper) {
      this.showHelper();
    }
  }

  FinalZoneComponent.prototype = Object.create(Component.prototype);

  FinalZoneComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('FinalZone', this.entity);
    InputHelper.coloredMaterial('color', this.material, div);
  };

  FinalZoneComponent.prototype.select = function() {
    return false;
  };

  return FinalZoneComponent;

});
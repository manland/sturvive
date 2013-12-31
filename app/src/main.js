require(['goo/entities/GooRunner',
  'goo/entities/systems/PickingSystem',
  'goo/picking/PrimitivePickLogic',
  'goo/math/Ray',
  'component/Camera',
  'component/Flower',
  'component/Soil',
  'component/Bee',
  'component/Sun',
  'component/Star',
  'component/FinalZone',
  'EntityHelper',
  'helper/TouchButton',
  'goo/renderer/bounds/BoundingSphere'
], function ( GooRunner,
  PickingSystem,
  PrimitivePickLogic,
  Ray,
  CameraComponent,
  FlowerComponent,
  SoilComponent,
  BeeComponent,
  SunComponent,
  StarComponent,
  FinalZoneComponent,
  EntityHelper,
  TouchButton,
  BoundingSphere) {
  
  'use strict';

  var goo = new GooRunner();
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  var screenHeight = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
  if(screenWidth > 500) {
    screenWidth = 500;
  }
  if(screenHeight > 350) {
    screenHeight = 350;
  }
  goo.renderer.setSize(screenWidth-5, screenHeight-5);
  goo.renderer.setClearColor(0, 0, 0, 1);
  document.body.appendChild(goo.renderer.domElement);
  
  var sun = new SunComponent(goo.world, true);
  
  var camera = new CameraComponent(goo.world, true);

  var sc = new StarComponent(goo.world, true);

  //new FinalZoneComponent(goo.world, true);

  //new SoilComponent(goo.world, true);

  // for(var i=0; i<100; i++) {
  //   var x = ((Math.random()*100)+1)-50;
  //   var z = ((Math.random()*100)+1)-50;
  //   var color = [0.356, 0.2, 0.5, 1];
  //   color[0] = Math.random();
  //   color[1] = Math.random();
  //   color[2] = Math.random();
  //   color[3] = Math.random();
  //   new FlowerComponent(goo.world, [x, 0, z], color, i === 0);
  // }

  var picking = new PickingSystem({pickLogic: new PrimitivePickLogic()});
  picking.pickRay = new Ray();
  goo.world.setSystem(picking);
  var lastPickedEntity;
  picking.onPick = function(pickedList) {
    if(pickedList && pickedList.length) {
      for(var i=0, len=pickedList.length, found=false; i<len && found === false; i++) {
        if(pickedList[0].entity.beeDataComponent) {
          found = pickedList[0].entity.beeDataComponent.select();
          if(found === true) {
            if(lastPickedEntity) {
              lastPickedEntity.beeDataComponent.unselect();
              lastPickedEntity = undefined;
            }
            lastPickedEntity = pickedList[0].entity;
          }
        }
      }
    }
  };

  document.addEventListener('mousedown', function(event) {
    if(event.target === goo.renderer.domElement) {
      event.preventDefault();
      event.stopPropagation();
      var x = event.pageX;
      var y = event.pageY;
      camera.getPickRay(x, y, goo.renderer.domElement.width, goo.renderer.domElement.height, picking.pickRay);
      picking._process();

      // ------------------------------------------------
      // OTHER METHOD INTERSEPT BY COLOR BUT LESS PERFORMANT
      // ------------------------------------------------
      // goo.renderer.viewportWidth = goo.renderer.viewportHeight = 500;
      // goo.pick(x, y, function (id, depth) {
      //   var entity = goo.world.entityManager.getEntityById(id);
      //   // Do stuff!!!!!!!!!!!!!!!!!!!!!!!!!!
      //   console.log(entity);
      //   if(lastPickedEntity) {
      //     lastPickedEntity.beeDataComponent.unselect();
      //     lastPickedEntity = undefined;
      //   }
      //   if(entity && entity.beeDataComponent) {
      //     entity.beeDataComponent.select();
      //     lastPickedEntity = entity;
      //   }
      // });
    }
  }, false);

  var first = true;
  var lastBee;

  console.log(sc.entity);

  var b = TouchButton.build('shootButton', function() {
    var to;
    if(lastPickedEntity) {
      to = EntityHelper.getPosition(lastPickedEntity.beeDataComponent.flower);
    } else {
      to = {x:0, y:0, z:0};
    }
    //new BeeComponent(goo.world, EntityHelper.getPosition(camera.entity), to, first);
    //first = false;
    var d = EntityHelper.getDistance(camera.entity, sc.entity);
    console.log(d);
  });
  document.getElementsByTagName('body')[0].appendChild(b);
  
});

require(['goo/entities/GooRunner',
  'goo/entities/systems/PickingSystem',
  'goo/picking/PrimitivePickLogic',
  'goo/math/Ray',
  'component/CameraComponent',
  'component/SunComponent',
  'component/StarComponent',
  'component/FinalZoneComponent',
  'helper/EntityHelper',
  'helper/TouchButton',
  'goo/renderer/bounds/BoundingSphere'
], function ( GooRunner,
  PickingSystem,
  PrimitivePickLogic,
  Ray,
  CameraComponent,
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

  console.log(sc.entity);

  var b = TouchButton.build('shootButton', function() {
    var d = EntityHelper.getDistance(camera.entity, sc.entity);
    console.log(d);
  });
  document.getElementsByTagName('body')[0].appendChild(b);
  
});

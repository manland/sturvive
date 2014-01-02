require(['goo/entities/GooRunner',
  'component/CameraComponent',
  'component/SunComponent',
  'component/StarComponent',
  'component/FinalZoneComponent',
  'component/BulletComponent',
  'helper/EntityHelper',
  'helper/TouchButton',
  'helper/KeyboardHelper'
], function ( GooRunner,
  CameraComponent,
  SunComponent,
  StarComponent,
  FinalZoneComponent,
  BulletComponent,
  EntityHelper,
  TouchButton,
  KeyboardHelper) {
  
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

  var entities = [];
  for(var i=0; i<50; i++) {
    entities.push(new StarComponent(goo.world, false).entity);
  }

  //new FinalZoneComponent(goo.world, true);

  KeyboardHelper.listen(32, function() {
    new BulletComponent(
      goo.world, 
      EntityHelper.getPosition(camera.entity), 
      camera.getBulletPosition(), 
      camera.script.yRotationAcc,
      entities,
      false
    );
  }, function() {}, null);

  var b = TouchButton.build('shootButton', function() {
    // var d = EntityHelper.getDistance(camera.entity, sc.entity);
    // console.log(d);
    new BulletComponent(
      goo.world, 
      EntityHelper.getPosition(camera.entity), 
      camera.getBulletPosition(), 
      camera.script.yRotationAcc,
      entities,
      false);
  });
  document.getElementsByTagName('body')[0].appendChild(b);
  
});

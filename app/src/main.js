require(['goo/entities/GooRunner',
  'component/CameraComponent',
  'component/SunComponent',
  'component/StarComponent',
  'component/FinalZoneComponent',
  'helper/EntityHelper',
  'helper/TouchButton'
], function ( GooRunner,
  CameraComponent,
  SunComponent,
  StarComponent,
  FinalZoneComponent,
  EntityHelper,
  TouchButton) {
  
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

  var b = TouchButton.build('shootButton', function() {
    var d = EntityHelper.getDistance(camera.entity, sc.entity);
    console.log(d);
  });
  document.getElementsByTagName('body')[0].appendChild(b);
  
});

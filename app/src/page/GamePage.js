define('page/GamePage', [
  'goo/entities/GooRunner',
  'component/CameraComponent',
  'component/SunComponent',
  'component/StarComponent',
  'component/FinalZoneComponent',
  'component/BulletComponent',
  'helper/EntityHelper',
  'helper/TouchButton',
  'helper/KeyboardHelper',
  'helper/MobileHelper',
  'helper/DomHelper'
], function(
  GooRunner,
  CameraComponent,
  SunComponent,
  StarComponent,
  FinalZoneComponent,
  BulletComponent,
  EntityHelper,
  TouchButton,
  KeyboardHelper,
  MobileHelper,
  DomHelper) {

    var backCallback;

    function build() {
      DomHelper.clearPageContent();
      DomHelper.hidePage();
      startGame();
    }

    var startGame = function startGame() {
      var goo = new GooRunner();
      var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      var screenHeight = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
      if(screenWidth > 500) {
        screenWidth = 500;
      }
      if(screenHeight > 350) {
        screenHeight = 350;
      }
      goo.renderer.domElement.classList.add('canvas');
      goo.renderer.setSize(screenWidth, screenHeight);
      goo.renderer.setClearColor(0, 0, 0, 1);
      document.body.appendChild(goo.renderer.domElement);
      
      var sun = new SunComponent(goo.world, true);
      
      var camera = new CameraComponent(goo.world, true);

      var entities = [];
      for(var i=0; i<50; i++) {
        entities.push(new StarComponent(goo.world, i===0).entity);
      }

      //new FinalZoneComponent(goo.world, true);

      if(MobileHelper.isMobile()) {
        document.getElementsByTagName('body')[0].appendChild(
          TouchButton.build('shootButton', function() {
            new BulletComponent(
              goo.world, 
              EntityHelper.getPosition(camera.entity), 
              camera.getBulletPosition(), 
              camera.script.yRotationAcc,
              entities,
              false);
          })
        );
      } else {
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
      }
    };

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);
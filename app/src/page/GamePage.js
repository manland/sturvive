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
  'helper/DomHelper',
  'page/PausePage'
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
  DomHelper,
  PausePage) {

    var backCallback;
    var canvas;
    var pauseButton;
    var crosschair;

    function build() {
      DomHelper.clearPageContent();
      DomHelper.hidePage();
      var goo = startGame();
      crosschair = DomHelper.addCrosschair();
      var isRunningGame = true;
      pauseButton = DomHelper.buildButton('||', function(e) {
        if(isRunningGame) {
          goo.stopGameLoop();
          isRunningGame = false;
          elementsDomVisible(false);
          PausePage.show(function() {
            DomHelper.clearPageContent();
            DomHelper.hidePage();
            goo.startGameLoop();
            isRunningGame = true;
            elementsDomVisible(true);
          });
          DomHelper.showPage();
        } else {
          goo.startGameLoop();
          isRunningGame = true;
        }
      });
      pauseButton.classList.add('pause');
      document.body.appendChild(pauseButton);
    }

    var elementsDomVisible = function elementsDomVisible(bool) {
      for(var i=0, len=document.body.children.length; i<len; i++) {
        document.body.children[i].style.display = ((bool === false) ? 'none' : 'block');
      }
    };

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
      canvas = goo.renderer.domElement;
      canvas.classList.add('canvas');
      goo.renderer.setSize(screenWidth, screenHeight);
      goo.renderer.setClearColor(0, 0, 0, 1);
      document.body.appendChild(canvas);
      
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
      return goo;
    };

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);
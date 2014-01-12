define('page/GamePage', [
  'goo/entities/GooRunner',
  'component/CameraComponent',
  'component/SunComponent',
  'component/FinalZoneComponent',
  'component/FuelZoneComponent',
  'component/StarshipComponent',
  'helper/DomHelper',
  'helper/ShootHelper',
  'page/PausePage',
  'manager/EntityManager',
  'manager/PlayerManager',
  'manager/LifeManager',
  'util/MapUtil',
  'util/RadarUtil',
  'util/OptionsUtil',
  'util/ScreenUtil',
  'page/BonusPage',
  'page/ChooseNextMapPage'
], function(
  GooRunner,
  CameraComponent,
  SunComponent,
  FinalZoneComponent,
  FuelZoneComponent,
  StarshipComponent,
  DomHelper,
  ShootHelper,
  PausePage,
  EntityManager,
  PlayerManager,
  LifeManager,
  MapUtil,
  RadarUtil,
  OptionsUtil,
  ScreenUtil,
  BonusPage,
  ChooseNextMapPage) {

    var backCallback;
    var canvas;
    var pauseButton;
    var crosschair;

    var fuelZone;
    var camera;

    var isRunningGame = false;
    var currentMap;

    var pause = function pause(goo) {
      goo.stopGameLoop();
      isRunningGame = false;
      elementsDomVisible(false);
      DomHelper.showPage();
    };

    var resume = function resume(goo) {
      DomHelper.clearPageContent();
      DomHelper.hidePage();
      goo.startGameLoop();
      isRunningGame = true;
      elementsDomVisible(true);
      updateSceneSize(goo);
      EntityManager.redrawAllEntities(goo.world);
    };

    function build() {
      DomHelper.clearPageContent();
      DomHelper.hidePage();
      crosschair = DomHelper.addCrosschair();
      var goo = startGame();
      isRunningGame = true;
      pauseButton = DomHelper.buildButton('', function(e) {
        if(isRunningGame) {
          pause(goo);
          PausePage.show(function() {
            resume(goo);
          });
        } else {
          goo.startGameLoop();
          isRunningGame = true;
        }
      });
      PlayerManager.onLooseLife(function() {
        if(PlayerManager.get('nbLife') < 0) {
          window.alert('Loooooser !');
        }
      });
      pauseButton.classList.add('pause');
      document.body.appendChild(pauseButton);
      LifeManager.start();

      ScreenUtil.onResize(function() {
        updateSceneSize(goo);
        fuelZone.refreshHeight();
      });

      startNextMap(goo);
    }

    var elementsDomVisible = function elementsDomVisible(bool) {
      for(var i=0, len=document.body.children.length; i<len; i++) {
        document.body.children[i].style.display = ((bool === false) ? 'none' : 'block');
      }
    };

    var updateSceneSize = function updateSceneSize(goo) {
      var w = ScreenUtil.getWidth() * OptionsUtil.get('screenSize');
      var h = ScreenUtil.getHeight() * OptionsUtil.get('screenSize');
      goo.renderer.setSize(w, h);
    };

    var startGame = function startGame() {
      var goo = new GooRunner();
      canvas = goo.renderer.domElement;
      canvas.classList.add('canvas');
      canvas.addEventListener('touchstart', function(e) {e.preventDefault();}, false);
      canvas.addEventListener('touchmove', function(e) {e.preventDefault();}, false);
      updateSceneSize(goo);
      goo.renderer.setClearColor(0, 0, 0, 1);
      document.body.appendChild(canvas);
      
      var sun = new SunComponent(goo.world, true);

      fuelZone = new FuelZoneComponent(goo.world, true);

      //new StarshipComponent(goo.world, true);
      
      camera = new CameraComponent(
        goo.world, 
        fuelZone, 
        true);

      //new FinalZoneComponent(goo.world, true);

      EntityManager.onRemoveEntity(function callbackAfterRemoveEntities(entity, nbEntityInGame) {
        if(nbEntityInGame === 0) {
          if(currentMap.scoreToWin > 0) {
            pause(goo);
            PlayerManager.update('score', PlayerManager.get('score') + currentMap.scoreToWin);
            BonusPage.show(function() {
              startNextMap(goo);
            });
          } else {
            startNextMap(goo);
          }
        }
      });

      ShootHelper.start(goo.world, camera);

      RadarUtil.draw(camera, fuelZone);
      return goo;
    };

    var startNextMap = function startNextMap(goo) {
      pause(goo);
      if(currentMap !== undefined) {
        MapUtil.increment(currentMap.category);
      }
      ChooseNextMapPage.show(function(map) {
        currentMap = map;
        resume(goo);
        PlayerManager.reinitNbBullet();
        ShootHelper.refresh();
        if(currentMap.fuelZone) {
          fuelZone.entity.transformComponent.setTranslation( 
            currentMap.fuelZone.position.x, 
            currentMap.fuelZone.position.y, 
            currentMap.fuelZone.position.z 
          );
        } else {
          fuelZone.entity.transformComponent.setTranslation( 0, -100, 0 );
        }
        camera.updateFuelAmount(100);
        fuelZone.update(100);
        camera.entity.transformComponent.setTranslation( 
          currentMap.camera.position.x, 
          currentMap.camera.position.y, 
          currentMap.camera.position.z 
        );
        camera.script.yRotationAcc = 0;
        EntityManager.addToWorld(goo.world, currentMap.getEntities());
      });
    };

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);
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
  'util/MapUtil',
  'util/RadarUtil',
  'util/OptionsUtil'
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
  MapUtil,
  RadarUtil,
  OptionsUtil) {

    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    var screenHeight = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;

    var backCallback;
    var canvas;
    var pauseButton;
    var crosschair;
    var fuelDiv;

    var fuelZone;
    var camera;

    function build() {
      DomHelper.clearPageContent();
      DomHelper.hidePage();
      crosschair = DomHelper.addCrosschair();
      fuelDiv = DomHelper.addFuelAmount(screenHeight - (screenHeight * 0.5));
      fuelDiv.update(100);
      var goo = startGame();
      var isRunningGame = true;
      pauseButton = DomHelper.buildButton('', function(e) {
        if(isRunningGame) {
          goo.stopGameLoop();
          isRunningGame = false;
          elementsDomVisible(false);
          PausePage.show(function() {
            DomHelper.clearPageContent();
            DomHelper.hidePage();
            EntityManager.redrawAllEntities(goo.world);
            updateSceneSize(goo);
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

    var updateSceneSize = function updateSceneSize(goo) {
      var w = screenWidth * OptionsUtil.get('screenSize');
      var h = screenHeight * OptionsUtil.get('screenSize');
      goo.renderer.setSize(w, h);
    };

    var startGame = function startGame() {
      var goo = new GooRunner();
      canvas = goo.renderer.domElement;
      canvas.classList.add('canvas');
      updateSceneSize(goo);
      goo.renderer.setClearColor(0, 0, 0, 1);
      document.body.appendChild(canvas);
      
      var sun = new SunComponent(goo.world, true);

      fuelZone = new FuelZoneComponent(goo.world, true);

      //new StarshipComponent(goo.world, true);
      
      camera = new CameraComponent(
        goo.world, 
        fuelZone.entity, 
        function(fuelAmount) {
          fuelDiv.update(fuelAmount);
        },
        true);

      //new FinalZoneComponent(goo.world, true);

      EntityManager.onRemoveEntity(function callbackAfterRemoveEntities(entity, nbEntityInGame) {
        if(nbEntityInGame === 0) {
          startNextMap(goo.world);
        }
      });

      ShootHelper.start(goo.world, camera);

      RadarUtil.draw(camera, fuelZone);
      startNextMap(goo.world);
      return goo;
    };

    var startNextMap = function startNextMap(world) {
      var currentMap = MapUtil.getNextMap();
      if(currentMap) {
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
        fuelDiv.update(100);
        camera.entity.transformComponent.setTranslation( 
          currentMap.camera.position.x, 
          currentMap.camera.position.y, 
          currentMap.camera.position.z 
        );
        camera.script.yRotationAcc = 0;
        EntityManager.addToWorld(world, currentMap.getEntities());
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
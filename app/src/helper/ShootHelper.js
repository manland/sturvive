define('helper/ShootHelper', 
  ['component/BulletComponent', 
  'manager/PlayerManager',
  'helper/MobileHelper', 'helper/KeyboardHelper', 'helper/TouchButton', 'helper/EntityHelper'], 
  function(BulletComponent, 
    PlayerManager,
    MobileHelper, KeyboardHelper, TouchButton, EntityHelper) {

    return {
      start: function(world, camera) {
        if(MobileHelper.isMobile()) {
          document.getElementsByTagName('body')[0].appendChild(
            TouchButton.build('shootButton', function() {
              if(PlayerManager.get('nbBullet') > 0) {
                new BulletComponent(
                  world, 
                  EntityHelper.getPosition(camera.entity), 
                  camera.getBulletPosition(), 
                  camera.script.yRotationAcc,
                  false
                );
                PlayerManager.minusBullet();
              }
            })
          );
        } else {
          KeyboardHelper.listen(32, function() {
            if(PlayerManager.get('nbBullet') > 0) {
              new BulletComponent(
                world, 
                EntityHelper.getPosition(camera.entity), 
                camera.getBulletPosition(), 
                camera.script.yRotationAcc,
                false
              );
              PlayerManager.minusBullet();
            }
          }, function() {}, null);
        }
      }
    };
  }
);
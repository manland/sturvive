define('helper/ShootHelper', 
  ['component/BulletComponent', 
  'helper/MobileHelper', 'helper/KeyboardHelper', 'helper/TouchButton', 'helper/EntityHelper'], 
  function(BulletComponent, 
    MobileHelper, KeyboardHelper, TouchButton, EntityHelper) {

    return {
      start: function(world, camera) {
        if(MobileHelper.isMobile()) {
          document.getElementsByTagName('body')[0].appendChild(
            TouchButton.build('shootButton', function() {
              new BulletComponent(
                world, 
                EntityHelper.getPosition(camera.entity), 
                camera.getBulletPosition(), 
                camera.script.yRotationAcc,
                false
              );
            })
          );
        } else {
          KeyboardHelper.listen(32, function() {
            new BulletComponent(
              world, 
              EntityHelper.getPosition(camera.entity), 
              camera.getBulletPosition(), 
              camera.script.yRotationAcc,
              false
            );
          }, function() {}, null);
        }
      }
    };
  }
);
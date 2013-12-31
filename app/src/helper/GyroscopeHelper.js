define('GyroscopeHelper', function() {

  var lastAlpha, lastBeta, lastGamma;

  function adjustForOrigin(val, adjustment) {
    if(val > 0) {
      val -= adjustment;
      //if(val < 0) val = 0;
    } else if(val < 0) {
      val += adjustment;
      //if(val > 0) val = 0;
    }
    return val;
  }

  if (window.DeviceOrientationEvent) {
    var camLookAtVector = new Vector3(0, 0, 0);
    var sensitivity = 0.9;
    window.addEventListener('deviceorientation', function (event) {

      var x = 0, y = 0, z = 0;

      if(lastAlpha) {
        x = Math.round(lastAlpha - event.alpha) * sensitivity;
        if(x > 1) {
          x = 1;
        } else if(x < -1) {
          x = -1;
        } else {
          x = 0;
        }
      } else {
        lastAlpha = Math.round(event.alpha);
      }

      if(lastBeta) {
        y = Math.round(lastBeta - event.beta) * sensitivity;
        if(y > 1) {
          y = 1;
        } else if(y < -1) {
          y = -1;
        } else {
          y = 0;
        }
      } else {
        lastBeta = Math.round(event.beta);
      }

      if(lastGamma) {
        z = Math.round(lastGamma - event.gamma) * sensitivity;
        if(z > 1) {
          z = 1;
        } else if(z < -1) {
          z = -1;
        } else {
          z = 0;
        }
      } else {
        lastGamma = Math.round(event.gamma);
      }

      // var x = adjustForOrigin(event.alpha, initVectorPosition.data[0]) * sensitivity;
      // var y = adjustForOrigin(event.beta, initVectorPosition.data[1]) * sensitivity;
      // var z = adjustForOrigin(event.gamma, initVectorPosition.data[2]) * sensitivity;
      // if(initVectorPosition === undefined) {
      //   initVectorPosition = new Vector3(event.alpha, event.beta, event.gamma);
      // } else {
      //   //vectorPosition = initVectorPosition.clone();
      //   var newX = Math.round(event.alpha - initVectorPosition.data[0]);
      //   if(lastXYZPosition.x) {
      //     if(lastXYZPosition.x - newX > 0.1 || lastXYZPosition.x - newX < -0.1 ) {
      //       lastXYZPosition.x = newX;
      //     } else {
      //       newX = 0;
      //     }
      //   } else {
      //     lastXYZPosition.x = newX;
      //   }
      //   // var newY = Math.round(event.beta - initVectorPosition.data[1]);
      //   // lastXYZPosition.y = newY;
      //   // var newZ = Math.round(event.gamma - initVectorPosition.data[2]);
      //   // lastXYZPosition.z = newZ;
      //   vectorPosition = new Vector3(newX, 0, 0);
      //   //initVectorPosition.add(vectorPosition);
      // }
      div.innerHTML = 'a : ' + event.alpha + '<br />' + 
        'b : ' + event.beta + '<br />' + 
        'c : ' + event.gamma + '<br />' +
        'vectorPosition : ' + x + ' | ' + y + ' | ' + z + '<br />';
      camLookAtVector.add(x, y, 0);
    }, true);
    window.setInterval(function() {
      cameraEntity.transformComponent.setRotation( camLookAtVector );
    }, 100);
  } else {
    window.addEventListener('MozOrientation', function (event) {
      div.innerHTML = 'x : ' + event.orientation.x + '<br />' + 'y : ' + event.orientation.y + '<br />' + 'z : ' + event.orientation.z;
      camera.lookAt(new Vector3(event.orientation.x * 50, event.orientation.y * 50, event.orientation.z * 50), Vector3.UNIT_Y);
    }, true);
  }

  return {
    
  };

});
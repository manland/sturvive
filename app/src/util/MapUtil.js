define('util/MapUtil', function() {

	'use strict';

  var currentMap = -1;

  var maps = {

    0: {
      camera: {
        position: {x:0, y:0, z:7}
      },
      getEntities: function() {
        return [{position: {x: 0, y:0, z:-7}}];
      }
    },

    1: {
      camera: {
        position: {x:0, y:0, z:7}
      },
      getEntities: function() {
        return [{position: {x: 5, y:0, z:-7}}, {position: {x: 15, y:0, z:7}}];
      }
    },

    2: {
      camera: {
        position: {x:0, y:0, z:0}
      },
      fuelZone: {
        position: {x:0, y:0, z:-50}
      },
      getEntities: function() {
        return [{position: {x: 0, y:0, z:-100}}];
      }
    },

    3: {
      camera: {
        position: {x:0, y:0, z:0}
      },
      fuelZone: {
        position: {x:10, y:0, z:10}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<50; i++) {
          var x = ((Math.random()*100)+1)-50;
          var z = ((Math.random()*100)+1)-50;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      }
    }

  };

  return {

    getNextMap: function() {
      currentMap = currentMap + 1;
      return maps[currentMap];
    }

  };

});
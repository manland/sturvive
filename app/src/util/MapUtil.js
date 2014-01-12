define('util/MapUtil', function() {

	'use strict';

  var currentMap = {
    tutos: -1,
    cleanZone: -1,
    protect: -1,
    race: -1
  };

  var tutos = {

    0: {
      name: 'Shoot',
      category: 'tutos',
      camera: {
        position: {x:0, y:0, z:7}
      },
      getEntities: function() {
        return [{position: {x: 0, y:0, z:-7}}];
      },
      scoreToWin: 0
    },

    1: {
      name: 'Move',
      category: 'tutos',
      camera: {
        position: {x:0, y:0, z:7}
      },
      getEntities: function() {
        return [{position: {x: 5, y:0, z:-7}}, {position: {x: 15, y:0, z:7}}];
      },
      scoreToWin: 0
    },

    2: {
      name: 'Fuel',
      category: 'tutos',
      camera: {
        position: {x:0, y:0, z:0}
      },
      fuelZone: {
        position: {x:0, y:0, z:-50}
      },
      getEntities: function() {
        return [{position: {x: 0, y:0, z:-100}}];
      },
      scoreToWin: 0
    }

  };

  var cleanZone = {

    0: {
      name: '10 in 2\'',
      category: 'cleanZone',
      camera: {
        position: {x:0, y:0, z:0}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<10; i++) {
          var x = ((Math.random()*100)+1)-10;
          var z = ((Math.random()*100)+1)-10;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 1
    },
    1: {
      name: '20 in 2\'',
      category: 'cleanZone',
      camera: {
        position: {x:0, y:0, z:0}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<20; i++) {
          var x = ((Math.random()*100)+1)-50;
          var z = ((Math.random()*100)+1)-50;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 1
    },
    2: {
      name: '30 in 2\'',
      category: 'cleanZone',
      camera: {
        position: {x:0, y:0, z:0}
      },
      fuelZone: {
        position: {x:10, y:0, z:10}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<30; i++) {
          var x = ((Math.random()*100)+1)-100;
          var z = ((Math.random()*100)+1)-100;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 2
    },
    3: {
      name: '50 in 2\'',
      category: 'cleanZone',
      camera: {
        position: {x:0, y:0, z:0}
      },
      fuelZone: {
        position: {x:10, y:0, z:10}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<50; i++) {
          var x = ((Math.random()*100)+1)-100;
          var z = ((Math.random()*100)+1)-100;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 5
    }

  };

  var protect = {

    0: {
      name: '10',
      category: 'protect',
      camera: {
        position: {x:0, y:0, z:0}
      },
      starship: {
        position: {x:0, y:0, z:7}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<10; i++) {
          var x = ((Math.random()*100)+1)-50;
          var z = ((Math.random()*100)+1)-50;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 1
    }

  };

  var race = {

    0: {
      name: '1',
      category: 'race',
      camera: {
        position: {x:0, y:0, z:0}
      },
      starship: {
        position: {x:0, y:0, z:7}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<10; i++) {
          var x = ((Math.random()*100)+1)-50;
          var z = ((Math.random()*100)+1)-50;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 1
    }

  };

  var maps = {
    tutos: tutos,
    cleanZone: cleanZone,
    protect: protect,
    race: race
  };

  return {

    getAll: function() {
      return maps;
    },
    getLevels: function() {
      return currentMap;
    },
    increment: function(category) {
      currentMap[category] = currentMap[category] + 1;
    }

  };

});
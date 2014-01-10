define('manager/PlayerManager', function() {

  var initNbLife = 3;
  var initNbBullet = 50;

  var onLooseLifeCallback;
  var onWinLifeCallback;

  var defaultOptions = {
    nbLife: initNbLife,//IN PROGRESS, cabler win and loose life
    nbBullet: initNbBullet,
    nbBulletAtStart: initNbBullet,
    nbBulletPerShoot: 1,//TODO
    bulletPower: 1,
    bulletLife: 1,
    fuelLoss: 0.5,
    speed: 1,
    starLife: 1
  };

  var options = defaultOptions;
  if(localStorage.optionsPlayer) {
    try {
      options = JSON.parse(localStorage.optionsPlayer);
    } catch(e) {}
  }

  options.nbLife = initNbLife;//At begin we have always 3 lifes
  options.nbBullet = options.nbBulletAtStart;

  return {

    maxNbLife: initNbLife,
    get: function(key) {
      return options[key];
    },
    update: function(key, value) {
      options[key] = value;
      localStorage.optionsPlayer = JSON.stringify(options);
    },
    minusBullet: function() {
      options.nbBullet = options.nbBullet - options.nbBulletPerShoot;
    },
    reinitNbBullet: function() {
      options.nbBullet = options.nbBulletAtStart;
    },
    looseLife: function() {
      options.nbLife = options.nbLife - 1;
      if(onLooseLifeCallback) {
        onLooseLifeCallback();
      }
    },
    onLooseLife: function(callback) {
      onLooseLifeCallback = callback;
    },
    winLife: function() {
      options.nbLife = options.nbLife + 1;
      if(onWinLifeCallback) {
        onWinLifeCallback();
      }
    },
    onWinLife: function(callback) {
      onWinLifeCallback = callback;
    }

  };

});
define('util/ScreenUtil', function() {

  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  var screenHeight = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;

  return {
    getWidth: function() {
      return screenWidth;
    },
    getHeight: function() {
      return screenHeight;
    }
  };

});
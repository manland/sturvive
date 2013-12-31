define('helper/UrlHelper', function() {

  var isDev = 
    document.URL.indexOf('localhost') !== -1 || 
    document.URL.indexOf('debug') !== -1;

  console.log(document.URL, isDev);

  return {
    isDev: function() {
      return isDev;
    }
  };

});
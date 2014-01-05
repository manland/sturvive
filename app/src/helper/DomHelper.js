define('helper/DomHelper', 
  ['helper/TouchButton'],
  function(TouchButton) {

  var buildContainer = function buildContainer(classname) {
    var div = document.createElement('div');
    if(classname) {
      div.classList.add(classname);
    }
    return div;
  };

  var pageContainer = buildContainer('pageContainer');
  pageContainer.style.display = 'none';
  document.body.appendChild(pageContainer);

  return {
    showPage: function() {
      pageContainer.style.display = 'block';
    },
    hidePage: function() {
      pageContainer.style.display = 'none';
    },
    addContainer: function(classname) {
      var c = buildContainer(classname);
      pageContainer.appendChild(c);
      return c;
    },
    buildButton: function(label, callback, ctx) {
      var b = TouchButton.build('button', callback, null, ctx);
      b.innerHTML = label;
      return b;
    },
    clearPageContent: function() {
      pageContainer.innerHTML = '';
    },
    addPageTitle: function(label) {
      var t = buildContainer('title');
      t.innerHTML = label;
      pageContainer.appendChild(t);
      return t;
    },
    addPageButton: function(label, callback, ctx) {
      var b = TouchButton.build('button', callback, null, ctx);
      b.innerHTML = label;
      pageContainer.appendChild(b);
      return b;
    },
    addPageBackButton: function(label, callback, ctx) {
      var b = TouchButton.build('button', callback, null, ctx);
      b.classList.add('back');
      b.innerHTML = label;
      pageContainer.appendChild(b);
    },
    addPageSmallButton: function(label, callback, ctx) {
      var b = TouchButton.build('button', callback, null, ctx);
      b.classList.add('small');
      b.innerHTML = label;
      pageContainer.appendChild(b);
    },
    addPageImg: function(src, title) {
      var img = document.createElement('img');
      img.src = src;
      img.title = title;
      pageContainer.appendChild(img);
      return img;
    },
    addPageSentence: function(sentence) {
      var d = buildContainer('sentence');
      d.innerHTML = sentence;
      pageContainer.appendChild(d);
      return d;
    },
    addCrosschair: function() {
      var d = buildContainer('crosschair');
      d.innerHTML = '+';
      document.body.appendChild(d);
      return d;
    },
    addFuelAmount: function(height) {
      var d = buildContainer('gauge');
      d.style.height = height + 'px';
      var percent = buildContainer();
      d.appendChild(percent);
      document.body.appendChild(d);
      return {
        update: function(p) {
          percent.style.height = p + '%';
          if(p > 60) {
            percent.classList.add('relax');
            percent.classList.remove('nervous');
            percent.classList.remove('dead');
          } else if(p > 30) {
            percent.classList.add('nervous');
            percent.classList.remove('relax');
            percent.classList.remove('dead');
          } else {
            percent.classList.add('dead');
            percent.classList.remove('nervous');
            percent.classList.remove('relax');
          }
        }
      };
    }
  };

});
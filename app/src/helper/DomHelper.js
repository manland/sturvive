define('helper/DomHelper', 
  ['helper/TouchButton'],
  function(TouchButton) {

  var buildContainer = function buildContainer(classname) {
    var div = document.createElement('div');
    div.classList.add(classname);
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
    }
  };

});
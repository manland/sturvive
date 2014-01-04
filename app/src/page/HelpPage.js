define('page/HelpPage',
  ['helper/DomHelper', 'helper/LangHelper', 'helper/MobileHelper'],
  function(DomHelper, LangHelper, MobileHelper) {

    var backCallback;

    var help = ['blabla', 'blibli'];
    var currentHelp = 0;

    var title;
    var img;
    var sentence;

    var buildTitle = function buildTitle() {
      return LangHelper.get('helpTitle') + ' ' +
        (currentHelp+1) + '/' + help.length;
    };

    var buildUrlImg = function buildTitle() {
      var urlImg = 'assets/img/help/';
      if(MobileHelper.isMobile()) {
        urlImg = urlImg + 'mobile/';
      } else {
        urlImg = urlImg + 'pc/';
      }
      urlImg = urlImg + currentHelp + '.png';
      return urlImg;
    };

    function build() {
      DomHelper.clearPageContent();
      title = DomHelper.addPageTitle(buildTitle());
      img = DomHelper.addPageImg(buildUrlImg(), help[currentHelp]);
      sentence = DomHelper.addPageSentence(help[currentHelp]);
      DomHelper.addPageSmallButton(
        LangHelper.get('prev'),
        function(e) {
          if(currentHelp > 0) {
            currentHelp = currentHelp - 1;
            buildContent();
          }
        }
      );
      DomHelper.addPageSmallButton(
        LangHelper.get('next'),
        function(e) {
          if(currentHelp < help.length - 1) {
            currentHelp = currentHelp + 1;
            buildContent();
          }
        }
      );
      DomHelper.addPageBackButton(
        LangHelper.get('back'),
        backCallback
      );
    }

    var buildContent = function buildContent() {
      title.innerHTML = buildTitle();
      img.src = buildUrlImg();
      img.title = help[currentHelp];
      sentence.innerHTML = help[currentHelp];
    };

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);
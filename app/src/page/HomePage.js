define('page/HomePage',
  ['helper/DomHelper', 
  'helper/LangHelper', 
  'page/GamePage',
  'page/HelpPage', 
  'page/OptionsPage', 
  'page/CompatibilityPage',
  'util/CompatibilityUtil'],
  function(DomHelper, LangHelper, 
    GamePage, HelpPage, OptionsPage, CompatibilityPage, CompatibilityUtil) {

    var build = function build() {
      DomHelper.clearPageContent();

      var langs = DomHelper.addContainer('langs');
      var enButton = DomHelper.buildButton('', function(e) { location.hash = '#en'; location.reload(); });
      enButton.classList.remove('button');
      enButton.classList.add('lang');
      enButton.classList.add('en');
      if(LangHelper.getCurrentLang() === 'en') {
        enButton.classList.add('active');
      }
      langs.appendChild(enButton);
      var frButton = DomHelper.buildButton('', function(e) { location.hash = '#fr'; location.reload(); });
      frButton.classList.remove('button');
      frButton.classList.add('lang');
      frButton.classList.add('fr');
      if(LangHelper.getCurrentLang() === 'fr') {
        frButton.classList.add('active');
      }
      langs.appendChild(frButton);

      DomHelper.addPageTitle(LangHelper.get('title'));
      DomHelper.addPageButton(
        LangHelper.get('homeStart'),
        function(e) { GamePage.show(build); }
      );
      DomHelper.addPageButton(
        LangHelper.get('homeHelp'),
        function(e) { HelpPage.show(build); }
      );
      DomHelper.addPageButton(
        LangHelper.get('homeOptions'),
        function(e) { OptionsPage.show(build); }
      );
      DomHelper.addPageButton(
        LangHelper.get('homeCompatibility') + ' ' + CompatibilityUtil.nbItemCompatible() + '/' + CompatibilityUtil.nbItem(),
        function(e) { CompatibilityPage.show(build); }
      );
    };

    return {
      show: function() {
        build();
      }
    };

  }
);
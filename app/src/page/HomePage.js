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
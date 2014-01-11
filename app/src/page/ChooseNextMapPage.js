define('page/ChooseNextMapPage',
  ['helper/DomHelper', 'helper/LangHelper', 'manager/PlayerManager'],
  function(DomHelper, LangHelper, PlayerManager) {

    var backCallback;

    function build() {
      DomHelper.clearPageContent();
      scoreDiv = DomHelper.addPageTitle(LangHelper.get('chooseNextMapTitle'));

      var mainDiv = DomHelper.addContainer('chooseNextMap');
      mainDiv.appendChild(buildExplanation());

      DomHelper.addPageBackButton(
        LangHelper.get('backChooseNextMap'),
        backCallback
      );
    }

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);
define('page/BonusPage',
  ['helper/DomHelper', 'helper/LangHelper', 'manager/PlayerManager'],
  function(DomHelper, LangHelper, PlayerManager) {

    var backCallback;
    var scoreDiv;

    function build() {
      DomHelper.clearPageContent();
      DomHelper.addPageTitle(LangHelper.get('bonusTitle'));

      var mainDiv = DomHelper.addContainer('options');
      mainDiv.appendChild(buildScore());
      mainDiv.appendChild(buildBonus('speed'));

      DomHelper.addPageBackButton(
        LangHelper.get('back'),
        backCallback
      );
    }

    var buildScore = function buildScore() {
      scoreDiv = DomHelper.addContainer('bonusScore');
      refreshScore();
      return scoreDiv;
    };

    var refreshScore = function refreshScore() {
      scoreDiv.innerHTML = PlayerManager.get('score') + ' ';
    };

    var buildBonus = function buildBonus(key) {
      var label = LangHelper.get(key+'Bonus') + ' ' + PlayerManager.get(key) + '/10';
      return DomHelper.buildButton(label, function() {
        PlayerManager.update(key, PlayerManager.get(key) + 1);
        PlayerManager.update('score', PlayerManager.get('score') - 1);
        refreshScore();
        if(PlayerManager.get('score') <= 0) {
          backCallback();
        }
      });
    };

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);
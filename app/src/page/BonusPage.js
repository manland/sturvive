define('page/BonusPage',
  ['helper/DomHelper', 'helper/LangHelper', 'manager/PlayerManager'],
  function(DomHelper, LangHelper, PlayerManager) {

    var backCallback;
    var scoreDiv;

    function build() {
      DomHelper.clearPageContent();
      scoreDiv = DomHelper.addPageTitle(LangHelper.get('bonusTitle'));
      refreshScore();

      var mainDiv = DomHelper.addContainer('bonus');
      mainDiv.appendChild(buildExplanation());
      mainDiv.appendChild(buildBonus('speed'));
      mainDiv.appendChild(buildBonus('nbLife'));
      mainDiv.appendChild(buildBonus('nbBulletAtStart'));
      mainDiv.appendChild(buildBonus('bulletPower'));
      mainDiv.appendChild(buildBonus('bulletLife'));
      mainDiv.appendChild(buildBonus('fuelLoss'));

      DomHelper.addPageBackButton(
        LangHelper.get('back'),
        backCallback
      );
    }

    var buildExplanation = function buildExplanation() {
      var div = DomHelper.addContainer('bonusExplanation');
      div.innerHTML = 'TODO';//LangHelper.get('');
      return div;
    };

    var refreshScore = function refreshScore() {
      scoreDiv.innerHTML = LangHelper.get('bonusTitle') + ' : ' + PlayerManager.get('score') + ' ';
      var span = document.createElement('span');
      span.classList.add('bonusSymbol');
      span.innerHTML = '';
      scoreDiv.appendChild(span);
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
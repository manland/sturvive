define('page/OptionsPage',
  ['helper/DomHelper', 'helper/LangHelper', 'util/OptionsUtil'],
  function(DomHelper, LangHelper, OptionsUtil) {

    var backCallback;

    function build() {
      DomHelper.clearPageContent();
      DomHelper.addPageTitle(LangHelper.get('optionsTitle'));
      DomHelper.addPageBackButton(
        LangHelper.get('back'),
        backCallback
      );
      var mainDiv = DomHelper.addContainer('options');
      var sizeScreenDiv = DomHelper.buildDiv('sizeScreenContainer');
      var sizeScreenViewContainer = DomHelper.buildDiv('sizeScreenViewContainer');
      var sizeScreenView = DomHelper.buildDiv('sizeScreenView');
      var buttonsDiv = DomHelper.buildDiv('buttonContainer');
      sizeScreenViewContainer.appendChild(sizeScreenView);
      buttonsDiv.appendChild(DomHelper.buildButton('30%', function() {
        sizeScreenView.style.width = '30%';
        sizeScreenView.style.height = '30%';
        OptionsUtil.update('screenSize', 0.3);
      }));
      buttonsDiv.appendChild(DomHelper.buildButton('50%', function() {
        sizeScreenView.style.width = '50%';
        sizeScreenView.style.height = '50%';
        OptionsUtil.update('screenSize', 0.5);
      }));
      buttonsDiv.appendChild(DomHelper.buildButton('100%', function() {
        sizeScreenView.style.width = '99%';
        sizeScreenView.style.height = '99%';
        OptionsUtil.update('screenSize', 1);
      }));
      if(OptionsUtil.get('screenSize') === 0.3) {
        sizeScreenView.style.width = '30%';
        sizeScreenView.style.height = '30%';
      } else if(OptionsUtil.get('screenSize') === 0.5) {
        sizeScreenView.style.width = '50%';
        sizeScreenView.style.height = '50%';
      } else {
        sizeScreenView.style.width = '99%';
        sizeScreenView.style.height = '99%';
      }
      sizeScreenDiv.appendChild(DomHelper.buildTitle('ScreenSize'));
      sizeScreenDiv.appendChild(buttonsDiv);
      sizeScreenDiv.appendChild(sizeScreenViewContainer);
      mainDiv.appendChild(sizeScreenDiv);

    }

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);